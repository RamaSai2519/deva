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

        // Keep a pure monochrome starfield (no colored accents).
        const STAR_RGB = "rgb(255, 255, 255)";

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            t: 0,
            dt: 1 / 60,
            stars: [],
            centerAvoidR: 0,
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

            // Keep density/depth matched to the viewport.
            init();
            draw();
        };

        const init = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const area = w * h;

            // Dense, “sky-like” distribution.
            const starCount = clamp(Math.floor(area / 420), 1800, 7000);

            // Keep a bit of space for the center logo.
            state.centerAvoidR = Math.min(w, h) * 0.18;

            const makeStar = () => {
                // Prefer corners by lightly avoiding the very center.
                let x = Math.random() * w;
                let y = Math.random() * h;
                const cx = w * 0.5;
                const cy = h * 0.5;
                for (let tries = 0; tries < 6; tries++) {
                    const dx = x - cx;
                    const dy = y - cy;
                    if (dx * dx + dy * dy >= state.centerAvoidR * state.centerAvoidR) break;
                    x = Math.random() * w;
                    y = Math.random() * h;
                }

                // Many tiny points + a few brighter “hero” stars.
                const brightRoll = Math.random();
                const radius = brightRoll < 0.012 ? 1.9 + Math.random() * 1.3 : brightRoll < 0.06 ? 1.2 + Math.random() * 0.9 : 0.35 + Math.random() * 0.85;
                const baseAlpha = brightRoll < 0.02 ? 0.9 : brightRoll < 0.08 ? 0.55 : 0.20 + Math.random() * 0.25;
                const twSpeed = 0.35 + Math.random() * 1.2;
                const twPhase = Math.random() * Math.PI * 2;
                const drift = 0.15 + Math.random() * 0.55;
                const driftDir = Math.random() * Math.PI * 2;

                return {
                    x,
                    y,
                    r: radius,
                    a: baseAlpha,
                    twSpeed,
                    twPhase,
                    vx: Math.cos(driftDir) * drift,
                    vy: Math.sin(driftDir) * drift,
                };
            };

            state.stars = new Array(starCount).fill(null).map(makeStar);
        };

        const draw = () => {
            const w = state.width;
            const h = state.height;

            // Pure black background.
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0, 0, w, h);

            const dt = state.dt || 1 / 60;

            ctx.save();
            ctx.globalCompositeOperation = "source-over";

            for (let i = 0; i < state.stars.length; i++) {
                const s = state.stars[i];

                if (!paused) {
                    s.x += s.vx * dt;
                    s.y += s.vy * dt;

                    // Wrap around edges to keep corners populated.
                    if (s.x < -5) s.x = w + 5;
                    if (s.x > w + 5) s.x = -5;
                    if (s.y < -5) s.y = h + 5;
                    if (s.y > h + 5) s.y = -5;
                }

                // Gentle twinkle, but keep it subtle like a real sky.
                const tw = 0.85 + 0.15 * Math.sin(state.t * s.twSpeed + s.twPhase);
                const alpha = clamp(s.a * tw, 0.05, 1);

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(STAR_RGB, alpha);
                ctx.fill();
            }

            ctx.restore();
        };

        let rafId = 0;
        let lastTime = 0;

        const tick = (ts) => {
            if (!lastTime) lastTime = ts;
            const dt = clamp((ts - lastTime) / 1000, 0, 0.05);
            lastTime = ts;

            state.dt = dt;
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
        </div>
    );
}
