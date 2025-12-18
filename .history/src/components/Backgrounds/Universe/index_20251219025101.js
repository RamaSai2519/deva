import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function rgbaFromRgb(rgb, alpha) {
    if (!rgb) return `rgba(255,255,255,${alpha})`;
    if (rgb.startsWith("rgba")) return rgb;
    if (!rgb.startsWith("rgb")) return `rgba(255,255,255,${alpha})`;
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

export default function UniverseBG({ paused = false }) {
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
            arcs: [],
        };

        const mouse = { x: 0.5, y: 0.5 };

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
        };

        const init = () => {
            const w = Math.max(1, window.innerWidth);
            const h = Math.max(1, window.innerHeight);
            const starCount = clamp(Math.floor((w * h) / 1800), 650, 1800);
            // 3D starfield moving towards the camera.
            state.stars = new Array(starCount).fill(null).map(() => {
                const depthLayer = Math.random() < 0.18 ? 2 : Math.random() < 0.52 ? 1 : 0;
                return {
                    // normalized screen space around center (-1..1)
                    x: (Math.random() * 2 - 1) * (0.7 + Math.random() * 0.55),
                    y: (Math.random() * 2 - 1) * (0.7 + Math.random() * 0.55),
                    z: Math.random() * 0.98 + 0.02,
                    size: 0.55 + Math.random() * 1.8,
                    speed: (0.55 + depthLayer * 0.55) * (0.65 + Math.random() * 0.55),
                    layer: depthLayer,
                    huePick: Math.random(),
                    tw: Math.random() * 1.4 + 0.25,
                };
            });

            state.arcs = [
                {
                    radius: 0.34,
                    width: 1.8,
                    speed: 0.16,
                    alpha: 0.22,
                    phase: Math.random() * Math.PI * 2,
                    color: accentColor,
                },
                {
                    radius: 0.44,
                    width: 1.3,
                    speed: -0.11,
                    alpha: 0.18,
                    phase: Math.random() * Math.PI * 2,
                    color: baseColor,
                },
                {
                    radius: 0.56,
                    width: 0.95,
                    speed: 0.07,
                    alpha: 0.12,
                    phase: Math.random() * Math.PI * 2,
                    color: glowColor,
                },
            ];
        };

        const resetStar = (s) => {
            s.x = (Math.random() * 2 - 1) * (0.7 + Math.random() * 0.55);
            s.y = (Math.random() * 2 - 1) * (0.7 + Math.random() * 0.55);
            s.z = 0.98;
        };

        const draw = () => {
            const w = state.width;
            const h = state.height;

            // Clear with very soft fade to keep motion smooth.
            ctx.fillStyle = "rgba(0,0,0,0.18)";
            ctx.fillRect(0, 0, w, h);

            // Subtle vignette for readability.
            const vignette = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
            vignette.addColorStop(0, "rgba(0,0,0,0.10)");
            vignette.addColorStop(1, "rgba(0,0,0,0.85)");
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, w, h);

            // Stars (towards camera)
            const mx = (mouse.x - 0.5) * 34;
            const my = (mouse.y - 0.5) * 22;
            const cx0 = w * 0.5 + mx * 0.25;
            const cy0 = h * 0.46 + my * 0.25;
            const focal = Math.max(260, Math.min(900, Math.min(w, h) * 0.9));

            for (let i = 0; i < state.stars.length; i++) {
                const s = state.stars[i];

                // Move towards viewer
                s.z -= (0.34 + s.layer * 0.18) * s.speed * 0.018;
                if (s.z <= 0.035) resetStar(s);

                const invZ = 1 / s.z;
                const px = cx0 + s.x * focal * invZ;
                const py = cy0 + s.y * focal * invZ;

                if (px < -60 || px > w + 60 || py < -60 || py > h + 60) {
                    // keep density stable
                    resetStar(s);
                    continue;
                }

                const twinkle = 0.65 + 0.35 * Math.sin(state.t * s.tw + i * 0.03);
                const alpha = clamp((0.06 + twinkle * 0.22) * (0.55 + invZ * 0.08), 0.04, 0.7);
                const radius = clamp(s.size * (0.42 + invZ * 0.06), 0.25, 3.2);

                const color = s.huePick < 0.18 ? accentColor : s.huePick < 0.55 ? baseColor : "rgb(255, 255, 255)";

                ctx.beginPath();
                ctx.arc(px, py, radius, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(color, alpha);
                ctx.fill();

                // tiny motion streak for depth
                const tail = clamp(invZ * 2.8, 1.2, 10);
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(px - s.x * tail, py - s.y * tail);
                ctx.strokeStyle = rgbaFromRgb(color, alpha * 0.45);
                ctx.lineWidth = clamp(radius * 0.7, 0.6, 2.2);
                ctx.lineCap = "round";
                ctx.stroke();
            }

            // Orbit arcs (Universe-style glow lines)
            const cx = w * 0.52 + mx * 0.2;
            const cy = h * 0.40 + my * 0.25;
            const baseR = Math.min(w, h);

            ctx.save();
            ctx.globalCompositeOperation = "lighter";

            for (let i = 0; i < state.arcs.length; i++) {
                const arc = state.arcs[i];
                const r = baseR * arc.radius;
                const angle = arc.phase + state.t * arc.speed;

                const start = angle;
                const end = angle + Math.PI * 1.15;

                const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
                grad.addColorStop(0, rgbaFromRgb(arc.color, 0));
                grad.addColorStop(0.65, rgbaFromRgb(arc.color, arc.alpha));
                grad.addColorStop(1, rgbaFromRgb(arc.color, 0));

                ctx.beginPath();
                ctx.arc(cx, cy, r, start, end);
                ctx.strokeStyle = grad;
                ctx.lineWidth = arc.width;
                ctx.lineCap = "round";
                ctx.stroke();
            }

            // Central helical lines
            const helixR = baseR * 0.18;
            const helixAmp = baseR * 0.06;
            const helixTurns = 2.6;
            const helixLen = baseR * 0.42;
            const helixWidth = clamp(baseR * 0.0026, 1.25, 2.8);

            const drawHelix = (color, phase, alpha) => {
                ctx.beginPath();
                const steps = 220;
                for (let k = 0; k <= steps; k++) {
                    const p = k / steps; // 0..1
                    const z = (p - 0.5) * helixLen;
                    const angle = phase + state.t * 0.9 + p * Math.PI * 2 * helixTurns;
                    const x = cx + Math.cos(angle) * (helixR + Math.sin(state.t * 0.55 + p * 7.0) * helixAmp * 0.25);
                    const y = cy + z * 0.55 + Math.sin(angle) * (helixR * 0.16);
                    if (k === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                ctx.strokeStyle = rgbaFromRgb(color, alpha);
                ctx.lineWidth = helixWidth;
                ctx.lineCap = "round";
                ctx.stroke();

                // soft glow pass
                ctx.strokeStyle = rgbaFromRgb(color, alpha * 0.18);
                ctx.lineWidth = helixWidth * 6;
                ctx.stroke();
            };

            drawHelix(accentColor, 0.0, 0.22);
            drawHelix(baseColor, Math.PI * 0.65, 0.18);

            // Small accent dashes near horizon
            for (let j = 0; j < 24; j++) {
                const p = j / 24;
                const y = h * (0.22 + p * 0.22);
                const x = w * (0.12 + (Math.sin(state.t * 0.35 + p * 6.2) * 0.04 + 0.5) * 0.76);
                const a = 0.04 + 0.08 * (1 - p);

                ctx.beginPath();
                ctx.moveTo(x - 10, y);
                ctx.lineTo(x + 10, y);
                ctx.strokeStyle = rgbaFromRgb(p % 0.5 < 0.25 ? baseColor : accentColor, a);
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            ctx.restore();

            // Top fade to keep header readable.
            const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.35);
            topFade.addColorStop(0, "rgba(0,0,0,0.70)");
            topFade.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = topFade;
            ctx.fillRect(0, 0, w, h * 0.35);
        };

        let rafId = 0;
        let lastTime = 0;

        const tick = (ts) => {
            if (!lastTime) lastTime = ts;
            const dt = clamp((ts - lastTime) / 1000, 0, 0.05);
            lastTime = ts;

            state.t += dt;
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

        // First paint
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
