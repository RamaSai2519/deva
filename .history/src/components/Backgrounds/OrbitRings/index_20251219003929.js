import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function rgbaFromRgb(rgb, alpha) {
    if (!rgb) return `rgba(255,255,255,${alpha})`;
    if (rgb.startsWith("rgba")) return rgb;
    if (!rgb.startsWith("rgb")) return `rgba(255,255,255,${alpha})`;
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

export default function OrbitRingsBG({ paused = false }) {
    const canvasRef = useRef(null);
    const baseColorProbeRef = useRef(null);
    const accentColorProbeRef = useRef(null);

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

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            t: 0,
            stars: [],
            rings: [],
            orbiters: [],
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
        };

        const init = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const starCount = clamp(Math.floor((w * h) / 2800), 320, 1000);

            state.stars = new Array(starCount).fill(null).map(() => ({
                x: Math.random(),
                y: Math.random(),
                r: Math.random() * 1.4 + 0.15,
                tw: Math.random() * 1.6 + 0.3,
                c: Math.random() < 0.25 ? accentColor : Math.random() < 0.65 ? baseColor : "rgb(255,255,255)",
            }));

            state.rings = [
                { r: 0.22, tilt: 0.18, speed: 0.22, width: 1.25, alpha: 0.16, c: baseColor },
                { r: 0.30, tilt: -0.12, speed: -0.16, width: 1.75, alpha: 0.22, c: accentColor },
                { r: 0.40, tilt: 0.06, speed: 0.10, width: 1.05, alpha: 0.12, c: baseColor },
                { r: 0.52, tilt: -0.05, speed: -0.07, width: 0.9, alpha: 0.10, c: accentColor },
            ];

            const orbiterCount = 14;
            state.orbiters = new Array(orbiterCount).fill(null).map((_, i) => {
                const ringIndex = i % state.rings.length;
                const phase = Math.random() * Math.PI * 2;
                return {
                    ringIndex,
                    phase,
                    size: Math.random() * 1.9 + 1.1,
                    speed: (Math.random() * 0.45 + 0.25) * (Math.random() < 0.5 ? -1 : 1),
                    alpha: Math.random() * 0.28 + 0.22,
                    c: Math.random() < 0.45 ? accentColor : baseColor,
                };
            });
        };

        const draw = () => {
            const w = state.width;
            const h = state.height;

            // Fade
            ctx.fillStyle = "rgba(0,0,0,0.16)";
            ctx.fillRect(0, 0, w, h);

            // Vignette
            const vignette = ctx.createRadialGradient(w * 0.52, h * 0.42, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
            vignette.addColorStop(0, "rgba(0,0,0,0.05)");
            vignette.addColorStop(1, "rgba(0,0,0,0.85)");
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, w, h);

            // Stars
            const mx = (mouse.x - 0.5) * 22;
            const my = (mouse.y - 0.5) * 14;

            for (let i = 0; i < state.stars.length; i++) {
                const s = state.stars[i];
                const tw = 0.55 + 0.45 * Math.sin(state.t * s.tw + s.x * 10 + s.y * 6);
                const alpha = clamp(0.06 + tw * 0.22, 0.06, 0.26);

                const x = s.x * w + mx * 0.25;
                const y = s.y * h + my * 0.25;

                ctx.beginPath();
                ctx.arc(x, y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(s.c, alpha);
                ctx.fill();
            }

            // Scene center
            const cx = w * 0.52 + mx * 0.2;
            const cy = h * 0.40 + my * 0.22;
            const baseR = Math.min(w, h);

            // Central glow
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 0.22);
            core.addColorStop(0, rgbaFromRgb(accentColor, 0.18));
            core.addColorStop(0.35, rgbaFromRgb(baseColor, 0.10));
            core.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = core;
            ctx.fillRect(cx - baseR * 0.25, cy - baseR * 0.25, baseR * 0.5, baseR * 0.5);

            // Rings
            for (let i = 0; i < state.rings.length; i++) {
                const ring = state.rings[i];
                const r = baseR * ring.r;
                const rot = state.t * ring.speed;

                // Ellipse-ish ring via scaling
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(rot);
                ctx.scale(1, 1 - ring.tilt);

                const grad = ctx.createRadialGradient(0, 0, r * 0.35, 0, 0, r);
                grad.addColorStop(0, rgbaFromRgb(ring.c, 0));
                grad.addColorStop(0.75, rgbaFromRgb(ring.c, ring.alpha));
                grad.addColorStop(1, rgbaFromRgb(ring.c, 0));

                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.strokeStyle = grad;
                ctx.lineWidth = ring.width;
                ctx.stroke();

                // subtle dashed highlight
                ctx.setLineDash([10, 14]);
                ctx.lineDashOffset = -state.t * 120;
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.strokeStyle = rgbaFromRgb(ring.c, ring.alpha * 0.35);
                ctx.lineWidth = ring.width;
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.restore();
            }

            // Orbiting particles
            for (let i = 0; i < state.orbiters.length; i++) {
                const o = state.orbiters[i];
                const ring = state.rings[o.ringIndex];
                const r = baseR * ring.r;
                const angle = o.phase + state.t * o.speed;

                // Match ring transform
                const rot = state.t * ring.speed;
                const a = angle + rot;

                const x = cx + Math.cos(a) * r;
                const y = cy + Math.sin(a) * r * (1 - ring.tilt);

                const glow = ctx.createRadialGradient(x, y, 0, x, y, o.size * 6);
                glow.addColorStop(0, rgbaFromRgb(o.c, o.alpha));
                glow.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(x, y, o.size * 6, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, y, o.size, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(o.c, clamp(o.alpha + 0.15, 0, 1));
                ctx.fill();
            }

            ctx.restore();

            // Top fade for Hero readability
            const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.35);
            topFade.addColorStop(0, "rgba(0,0,0,0.72)");
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
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
        </div>
    );
}
