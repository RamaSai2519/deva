import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function rgbaFromRgb(rgb, alpha) {
    if (!rgb) return `rgba(255,255,255,${alpha})`;
    if (rgb.startsWith("rgba")) return rgb;
    if (!rgb.startsWith("rgb")) return `rgba(255,255,255,${alpha})`;
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

export default function WarpTunnelBG({ paused = false }) {
    const canvasRef = useRef(null);
    const baseColorProbeRef = useRef(null);
    const accentColorProbeRef = useRef(null);
    const glowColorProbeRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const getProbeColor = (element, fallback) => {
            if (!element) return fallback;
            const color = window.getComputedStyle(element).color;
            return color && color !== "" ? color : fallback;
        };

        const baseColor = getProbeColor(baseColorProbeRef.current, "rgb(56, 189, 248)");
        const accentColor = getProbeColor(accentColorProbeRef.current, "rgb(168, 85, 247)");
        const glowColor = getProbeColor(glowColorProbeRef.current, "rgb(59, 130, 246)");

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            t: 0,
            stars: [],
            streaks: [],
            maxZ: 1400,
            fov: 520,
        };

        const mouse = { x: 0.5, y: 0.45 };

        const resize = () => {
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            const width = window.innerWidth;
            const height = window.innerHeight;

            state.width = width;
            state.height = height;
            state.dpr = dpr;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            state.fov = clamp(Math.min(width, height) * 0.78, 420, 760);
            state.maxZ = clamp(Math.max(width, height) * 1.6, 1100, 2200);
        };

        const randSigned = () => (Math.random() - 0.5) * 2;

        const makeStar = () => {
            // Radial distribution that favors the tunnel edge slightly.
            const rPow = 0.55 + Math.random() * 0.45;
            const r = Math.pow(Math.random(), rPow);
            const a = Math.random() * Math.PI * 2;

            // Tunnel radius in world units
            const radius = 260 + Math.random() * 520;

            return {
                x: Math.cos(a) * radius * r,
                y: Math.sin(a) * radius * r,
                z: Math.random() * state.maxZ + 60,
                // speed is per-star for depth variety
                v: 520 + Math.random() * 980,
                size: 0.6 + Math.random() * 1.8,
                huePick: Math.random(),
                tw: 0.4 + Math.random() * 1.3,
            };
        };

        const init = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const count = clamp(Math.floor((w * h) / 5200), 260, 760);
            state.stars = new Array(count).fill(null).map(() => makeStar());

            // A few bright streaks closer to camera for punch
            const streakCount = clamp(Math.floor(w / 240), 5, 10);
            state.streaks = new Array(streakCount).fill(null).map(() => ({
                x: randSigned() * 220,
                y: randSigned() * 140,
                z: Math.random() * state.maxZ * 0.35 + 40,
                v: 1200 + Math.random() * 900,
                w: 1.6 + Math.random() * 2.8,
                huePick: Math.random(),
            }));
        };

        const project = (x, y, z, cx, cy) => {
            const k = state.fov / Math.max(1, z);
            return { x: cx + x * k, y: cy + y * k, k };
        };

        const draw = () => {
            const w = state.width;
            const h = state.height;

            // Fade (keeps trails)
            ctx.fillStyle = "rgba(0,0,0,0.18)";
            ctx.fillRect(0, 0, w, h);

            // Vignette
            const vignette = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
            vignette.addColorStop(0, "rgba(0,0,0,0.04)");
            vignette.addColorStop(1, "rgba(0,0,0,0.90)");
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, w, h);

            const mx = (mouse.x - 0.5) * 60;
            const my = (mouse.y - 0.5) * 40;
            const cx = w * 0.52 + mx * 0.25;
            const cy = h * 0.40 + my * 0.25;

            // Twist the whole tunnel slightly over time.
            const twist = 0.35 * Math.sin(state.t * 0.55) + 0.18 * Math.sin(state.t * 0.19);
            const cosT = Math.cos(twist);
            const sinT = Math.sin(twist);

            ctx.save();
            ctx.globalCompositeOperation = "lighter";

            // Core glow in the vanishing point
            const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.35);
            core.addColorStop(0, rgbaFromRgb(glowColor, 0.12));
            core.addColorStop(0.25, rgbaFromRgb(baseColor, 0.08));
            core.addColorStop(0.55, rgbaFromRgb(accentColor, 0.05));
            core.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = core;
            ctx.fillRect(cx - w * 0.4, cy - h * 0.4, w * 0.8, h * 0.8);

            // Stars (streaked)
            for (let i = 0; i < state.stars.length; i++) {
                const s = state.stars[i];

                // Twinkle + depth fade
                const twinkle = 0.55 + 0.45 * Math.sin(state.t * s.tw + s.x * 0.01 + s.y * 0.01);
                const depth = 1 - clamp(s.z / state.maxZ, 0, 1);

                // apply twist to x/y
                const tx = s.x * cosT - s.y * sinT;
                const ty = s.x * sinT + s.y * cosT;

                const p1 = project(tx, ty, s.z, cx, cy);
                const p0 = project(tx, ty, s.z + 140, cx, cy); // previous position for streak

                if (p1.x < -40 || p1.x > w + 40 || p1.y < -40 || p1.y > h + 40) continue;

                const c = s.huePick < 0.18 ? accentColor : s.huePick < 0.6 ? baseColor : "rgb(255,255,255)";
                const a = clamp(0.04 + depth * 0.22 + twinkle * 0.08, 0.04, 0.34);

                ctx.beginPath();
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.strokeStyle = rgbaFromRgb(c, a);
                ctx.lineWidth = clamp(s.size * (0.8 + depth * 1.4) * p1.k, 0.5, 2.4);
                ctx.lineCap = "round";
                ctx.stroke();

                // tiny head dot
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, clamp(0.6 + s.size * 0.35, 0.6, 2.0), 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(c, clamp(a + 0.1, 0, 1));
                ctx.fill();
            }

            // Bright streaks
            for (let i = 0; i < state.streaks.length; i++) {
                const s = state.streaks[i];

                const tx = s.x * cosT - s.y * sinT;
                const ty = s.x * sinT + s.y * cosT;

                const p1 = project(tx, ty, s.z, cx, cy);
                const p0 = project(tx, ty, s.z + 240, cx, cy);

                const depth = 1 - clamp(s.z / (state.maxZ * 0.6), 0, 1);
                const c = s.huePick < 0.5 ? baseColor : accentColor;

                ctx.beginPath();
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.strokeStyle = rgbaFromRgb(c, clamp(0.10 + depth * 0.26, 0.10, 0.40));
                ctx.lineWidth = clamp(s.w * p1.k, 1.1, 3.2);
                ctx.lineCap = "round";
                ctx.stroke();
            }

            ctx.restore();

            // Top fade for Hero readability
            const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.36);
            topFade.addColorStop(0, "rgba(0,0,0,0.74)");
            topFade.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = topFade;
            ctx.fillRect(0, 0, w, h * 0.36);
        };

        let rafId = 0;
        let lastTime = 0;

        const tick = (ts) => {
            if (!lastTime) lastTime = ts;
            const dt = clamp((ts - lastTime) / 1000, 0, 0.05);
            lastTime = ts;

            state.t += dt;

            // Move stars toward camera
            for (let i = 0; i < state.stars.length; i++) {
                const s = state.stars[i];
                s.z -= s.v * dt;
                if (s.z < 26) {
                    // respawn far
                    const ns = makeStar();
                    s.x = ns.x;
                    s.y = ns.y;
                    s.z = state.maxZ;
                    s.v = ns.v;
                    s.size = ns.size;
                    s.huePick = ns.huePick;
                    s.tw = ns.tw;
                }
            }

            // Move bright streaks
            for (let i = 0; i < state.streaks.length; i++) {
                const s = state.streaks[i];
                s.z -= s.v * dt;
                if (s.z < 40) {
                    s.x = randSigned() * 260;
                    s.y = randSigned() * 160;
                    s.z = state.maxZ * 0.45 + Math.random() * state.maxZ * 0.25;
                    s.v = 1200 + Math.random() * 900;
                    s.w = 1.6 + Math.random() * 2.8;
                    s.huePick = Math.random();
                }
            }

            draw();
            rafId = window.requestAnimationFrame(tick);
        };

        const onMouseMove = (event) => {
            mouse.x = clamp(event.clientX / Math.max(1, window.innerWidth), 0, 1);
            mouse.y = clamp(event.clientY / Math.max(1, window.innerHeight), 0, 1);
        };

        resize();
        init();

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMouseMove);

        // first paint
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, state.width, state.height);
        draw();

        if (!paused) {
            rafId = window.requestAnimationFrame(tick);
        }

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.cancelAnimationFrame(rafId);
        };
    }, [paused]);

    return (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <span ref={baseColorProbeRef} className="hidden text-sky-300" />
            <span ref={accentColorProbeRef} className="hidden text-purple-400" />
            <span ref={glowColorProbeRef} className="hidden text-blue-400" />
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] mix-blend-overlay" />
        </div>
    );
}
