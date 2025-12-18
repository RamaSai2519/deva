import { useEffect, useMemo, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function rgbaFromRgb(rgb, alpha) {
    if (!rgb) return `rgba(255,255,255,${alpha})`;
    if (rgb.startsWith("rgba")) return rgb;
    if (!rgb.startsWith("rgb")) return `rgba(255,255,255,${alpha})`;
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

function drawCircle(ctx, x, y, r) {
    const rr = Math.max(0.1, r);
    ctx.beginPath();
    ctx.arc(x, y, rr, 0, Math.PI * 2);
}

export default function RunnerStarsBG({ paused = false }) {
    const rootRef = useRef(null);
    const canvasRef = useRef(null);

    const starProbeRef = useRef(null);
    const prefs = useMemo(() => ({}), []);

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
            star: getProbeColor(starProbeRef.current, "rgb(255,255,255)"),
        };

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            staticCanvas: null,
        };

        const renderStarfieldTo = (dstCtx, w, h) => {
            // Base fill
            dstCtx.clearRect(0, 0, w, h);
            dstCtx.fillStyle = "rgb(0,0,0)";
            dstCtx.fillRect(0, 0, w, h);

            const area = w * h;
            // High-density tiny stars like the reference image.
            const dustCount = clamp(Math.floor(area / 180), 2600, 14000);
            const midCount = clamp(Math.floor(area / 2200), 260, 1400);
            const brightCount = clamp(Math.floor(area / 26000), 26, 140);

            // Tiny dust (single pixels)
            for (let i = 0; i < dustCount; i++) {
                const x = Math.floor(Math.random() * w);
                const y = Math.floor(Math.random() * h);
                const a = clamp(0.12 + Math.random() * 0.38, 0.12, 0.5);
                dstCtx.fillStyle = rgbaFromRgb(colors.star, a);
                dstCtx.fillRect(x, y, 1, 1);
            }

            // Medium stars (small circles)
            for (let i = 0; i < midCount; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                const r = 0.6 + Math.pow(Math.random(), 2.2) * 1.4;
                const a = clamp(0.18 + Math.random() * 0.6, 0.18, 0.78);
                drawCircle(dstCtx, x, y, r);
                dstCtx.fillStyle = rgbaFromRgb(colors.star, a);
                dstCtx.fill();
            }

            // Brighter stars (tiny glow)
            for (let i = 0; i < brightCount; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                const r = 1.2 + Math.pow(Math.random(), 1.6) * 2.0;
                const a = clamp(0.45 + Math.random() * 0.45, 0.45, 0.9);

                dstCtx.save();
                dstCtx.globalCompositeOperation = "lighter";
                dstCtx.shadowColor = rgbaFromRgb(colors.star, 0.65);
                dstCtx.shadowBlur = 8;
                drawCircle(dstCtx, x, y, r);
                dstCtx.fillStyle = rgbaFromRgb(colors.star, a);
                dstCtx.fill();
                dstCtx.restore();
            }

            // Subtle grain so it feels like the photo texture
            dstCtx.save();
            dstCtx.globalAlpha = 0.06;
            for (let i = 0; i < 3; i++) {
                dstCtx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.02})`;
                const rx = Math.random() * w;
                const ry = Math.random() * h;
                dstCtx.fillRect(rx, ry, Math.max(1, Math.random() * 2), Math.max(1, Math.random() * 2));
            }
            dstCtx.restore();
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

            // Pre-render into an offscreen canvas so the look stays consistent and static.
            const staticCanvas = document.createElement("canvas");
            staticCanvas.width = width;
            staticCanvas.height = height;
            const sctx = staticCanvas.getContext("2d", { alpha: false });
            if (sctx) {
                renderStarfieldTo(sctx, width, height);
                state.staticCanvas = staticCanvas;
            }
        };

        const render = () => {
            // Draw pre-rendered static starfield.
            if (state.staticCanvas) {
                ctx.drawImage(state.staticCanvas, 0, 0, state.width, state.height);
            } else {
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(0, 0, state.width, state.height);
            }

            // Top fade for readability over hero content
            const h = state.height;
            const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.36);
            topFade.addColorStop(0, "rgba(0,0,0,0.78)");
            topFade.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = topFade;
            ctx.fillRect(0, 0, state.width, h * 0.36);
        };

        resize();
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, state.width, state.height);
        render();

        const ro = new ResizeObserver(() => resize());
        ro.observe(root);
        window.addEventListener("resize", resize);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", resize);
        };
    }, [paused, prefs]);

    return (
        <div ref={rootRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <span ref={starProbeRef} className="hidden text-white" />
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
        </div>
    );
}
