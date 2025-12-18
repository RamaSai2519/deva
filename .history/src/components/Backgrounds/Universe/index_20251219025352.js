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
            depth: 1400,
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
            const area = window.innerWidth * window.innerHeight;
            const starCount = clamp(Math.floor(area / 1400), 700, 2200);

            // Camera depth scales with viewport.
            state.depth = clamp(Math.min(window.innerWidth, window.innerHeight) * 2.4, 900, 2200);

            state.stars = new Array(starCount).fill(null).map(() => {
                // x/y are in camera space [-1,1]
                const x = (Math.random() * 2 - 1) * 1.05;
                const y = (Math.random() * 2 - 1) * 1.05;
                const z = Math.random() * state.depth;
                const huePick = Math.random();
                const size = 0.35 + Math.random() * 1.25;
                const speed = 220 + Math.random() * 520;
                return {
                    x,
                    y,
                    z,
                    size,
                    speed,
                    huePick,
                };
            });
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

            // Particles (3D starfield flying toward the camera)
            const cx = w * 0.5;
            const cy = h * 0.5;
            const mx = (mouse.x - 0.5) * 0.24;
            const my = (mouse.y - 0.5) * 0.18;

            const focal = clamp(Math.min(w, h) * 0.85, 380, 980);
            const dt = 1 / 60; // approximate; tick controls time

            ctx.save();
            ctx.globalCompositeOperation = "lighter";

            for (let i = 0; i < state.stars.length; i++) {
                const s = state.stars[i];

                // Move toward camera
                s.z -= s.speed * dt;
                if (s.z <= 1) {
                    s.z = state.depth;
                    s.x = (Math.random() * 2 - 1) * 1.05;
                    s.y = (Math.random() * 2 - 1) * 1.05;
                    s.size = 0.35 + Math.random() * 1.25;
                    s.speed = 220 + Math.random() * 520;
                    s.huePick = Math.random();
                }

                const z = s.z;
                const inv = focal / (z + focal);
                const px = cx + (s.x + mx) * inv * focal;
                const py = cy + (s.y + my) * inv * focal;

                if (px < -50 || px > w + 50 || py < -50 || py > h + 50) continue;

                // Trail: sample a slightly farther point in z.
                const z2 = z + clamp(s.speed * dt * 3.2, 10, 42);
                const inv2 = focal / (z2 + focal);
                const px2 = cx + (s.x + mx) * inv2 * focal;
                const py2 = cy + (s.y + my) * inv2 * focal;

                const r = clamp(s.size * (1.0 + (1 - inv) * 1.6), 0.35, 2.6);
                const a = clamp(0.12 + (1 - z / state.depth) * 0.6, 0.12, 0.85);
                const col = s.huePick < 0.22 ? accentColor : s.huePick < 0.58 ? baseColor : "rgb(255, 255, 255)";

                ctx.beginPath();
                ctx.moveTo(px2, py2);
                ctx.lineTo(px, py);
                ctx.strokeStyle = rgbaFromRgb(col, a * 0.45);
                ctx.lineWidth = clamp(r * 1.1, 0.7, 2.4);
                ctx.lineCap = "round";
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(px, py, r, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(col, a);
                ctx.fill();
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
