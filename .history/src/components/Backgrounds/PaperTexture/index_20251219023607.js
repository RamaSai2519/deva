import { useEffect, useMemo, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function rgbaFromRgb(rgb, alpha) {
    if (!rgb) return `rgba(255,255,255,${alpha})`;
    if (rgb.startsWith("rgba")) return rgb;
    if (!rgb.startsWith("rgb")) return `rgba(255,255,255,${alpha})`;
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

function makeNoiseTile(size = 256) {
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    const img = ctx.createImageData(size, size);
    const data = img.data;

    for (let i = 0; i < data.length; i += 4) {
        const v = Math.floor(Math.random() * 255);
        // Slightly biased noise; alpha kept low.
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = Math.floor(18 + Math.random() * 28);
    }

    ctx.putImageData(img, 0, 0);
    return c;
}

function buildFibers(count, width, height) {
    const fibers = [];
    for (let i = 0; i < count; i++) {
        const angle = (Math.random() * Math.PI) / 2 + Math.random() * 0.06; // mostly vertical-ish
        const len = clamp(Math.min(width, height) * (0.18 + Math.random() * 0.55), 80, 520);
        fibers.push({
            x: Math.random() * width,
            y: Math.random() * height,
            angle,
            len,
            w: 0.6 + Math.random() * 1.1,
            a: 0.03 + Math.random() * 0.05,
            drift: 0.2 + Math.random() * 0.45,
            phase: Math.random() * Math.PI * 2,
        });
    }
    return fibers;
}

export default function PaperTextureBG({ paused = false }) {
    const rootRef = useRef(null);
    const canvasRef = useRef(null);

    const grainProbeRef = useRef(null);
    const fiberProbeRef = useRef(null);

    const prefs = useMemo(
        () => ({
            fadeAlpha: 0.2,
        }),
        []
    );

    useEffect(() => {
        const root = rootRef.current;
        const canvas = canvasRef.current;
        if (!root || !canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const getProbeColor = (element, fallback) => {
            if (!element) return fallback;
            const color = window.getComputedStyle(element).color;
            return color && color !== "" ? color : fallback;
        };

        const colors = {
            grain: getProbeColor(grainProbeRef.current, "rgb(226,232,240)"),
            fiber: getProbeColor(fiberProbeRef.current, "rgb(203,213,225)"),
        };

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            t: 0,
            ox: 0,
            oy: 0,
            noise: null,
            pattern: null,
            fibers: [],
        };

        const rebuildPattern = () => {
            state.noise = makeNoiseTile(256);
            state.pattern = state.noise ? ctx.createPattern(state.noise, "repeat") : null;
        };

        const resize = () => {
            const rect = root.getBoundingClientRect();
            const width = Math.max(1, Math.floor(rect.width));
            const height = Math.max(1, Math.floor(rect.height));
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

            state.width = width;
            state.height = height;
            state.dpr = dpr;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            rebuildPattern();
            state.fibers = buildFibers(clamp(Math.floor((width * height) / 38000), 16, 42), width, height);
        };

        const render = () => {
            const w = state.width;
            const h = state.height;

            // Fade
            ctx.fillStyle = `rgba(0,0,0,${prefs.fadeAlpha})`;
            ctx.fillRect(0, 0, w, h);

            // Grain layer
            if (state.pattern) {
                ctx.save();
                ctx.globalCompositeOperation = "screen";
                ctx.globalAlpha = 0.08;
                ctx.translate(state.ox, state.oy);
                ctx.fillStyle = state.pattern;
                ctx.fillRect(-state.ox, -state.oy, w, h);
                ctx.restore();

                // Second pass: slightly stronger grain to feel like paper
                ctx.save();
                ctx.globalCompositeOperation = "overlay";
                ctx.globalAlpha = 0.06;
                ctx.translate(-state.ox * 0.6, -state.oy * 0.35);
                ctx.fillStyle = state.pattern;
                ctx.fillRect(state.ox * 0.6, state.oy * 0.35, w, h);
                ctx.restore();
            }

            // Fibers
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.strokeStyle = rgbaFromRgb(colors.fiber, 1);

            for (let i = 0; i < state.fibers.length; i++) {
                const f = state.fibers[i];
                const drift = Math.sin(state.t * f.drift + f.phase) * 10;
                const x = f.x + drift;
                const y = f.y - drift * 0.35;

                const dx = Math.cos(f.angle) * f.len;
                const dy = Math.sin(f.angle) * f.len;

                ctx.globalAlpha = f.a;
                ctx.lineWidth = f.w;
                ctx.beginPath();
                ctx.moveTo(x - dx * 0.5, y - dy * 0.5);
                ctx.lineTo(x + dx * 0.5, y + dy * 0.5);
                ctx.stroke();
            }
            ctx.restore();

            // Paper vignette + top fade for readability
            const vg = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.76);
            vg.addColorStop(0, "rgba(0,0,0,0.06)");
            vg.addColorStop(1, "rgba(0,0,0,0.88)");
            ctx.fillStyle = vg;
            ctx.fillRect(0, 0, w, h);

            const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.36);
            topFade.addColorStop(0, "rgba(0,0,0,0.78)");
            topFade.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = topFade;
            ctx.fillRect(0, 0, w, h * 0.36);
        };

        let rafId = 0;
        let last = 0;

        const tick = (ts) => {
            if (!last) last = ts;
            const dt = clamp((ts - last) / 1000, 0, 0.05);
            last = ts;

            state.t += dt;
            // tiny drift so the grain feels alive
            state.ox = (state.ox + dt * 8) % 256;
            state.oy = (state.oy + dt * 6) % 256;

            render();
            rafId = window.requestAnimationFrame(tick);
        };

        resize();

        // first paint
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, state.width, state.height);
        render();

        const ro = new ResizeObserver(() => resize());
        ro.observe(root);
        window.addEventListener("resize", resize);

        if (!paused) {
            rafId = window.requestAnimationFrame(tick);
        }

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", resize);
            window.cancelAnimationFrame(rafId);
        };
    }, [paused, prefs]);

    return (
        <div ref={rootRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <span ref={grainProbeRef} className="hidden text-slate-200" />
            <span ref={fiberProbeRef} className="hidden text-slate-300" />
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
        </div>
    );
}
