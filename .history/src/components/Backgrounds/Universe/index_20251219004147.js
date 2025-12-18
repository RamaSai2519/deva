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
            const starCount = clamp(Math.floor((window.innerWidth * window.innerHeight) / 2200), 450, 1200);
            state.stars = new Array(starCount).fill(null).map(() => {
                const layer = Math.random() < 0.25 ? 2 : Math.random() < 0.55 ? 1 : 0;
                return {
                    x: Math.random(),
                    y: Math.random(),
                    r: Math.random() * 1.2 + 0.2,
                    tw: Math.random() * 1.5 + 0.25,
                    layer,
                    huePick: Math.random(),
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

            // Stars
            const mx = (mouse.x - 0.5) * 30;
            const my = (mouse.y - 0.5) * 18;

            for (let i = 0; i < state.stars.length; i++) {
                const s = state.stars[i];
                const layerSpeed = s.layer === 2 ? 0.22 : s.layer === 1 ? 0.14 : 0.09;

                const driftX = Math.sin(state.t * layerSpeed + s.x * 8) * 0.006;
                const driftY = Math.cos(state.t * layerSpeed + s.y * 7) * 0.006;

                const x = (s.x + driftX) * w + mx * (s.layer + 1) * 0.4;
                const y = (s.y + driftY) * h + my * (s.layer + 1) * 0.4;

                if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;

                const twinkle = 0.55 + 0.45 * Math.sin(state.t * s.tw + s.x * 10 + s.y * 6);
                const alpha = clamp(0.08 + twinkle * 0.28, 0.06, 0.34);
                const radius = clamp(s.r + (s.layer * 0.25), 0.3, 2.1);

                const color = s.huePick < 0.22 ? accentColor : s.huePick < 0.6 ? baseColor : "rgb(255, 255, 255)";

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(color, alpha);
                ctx.fill();
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
