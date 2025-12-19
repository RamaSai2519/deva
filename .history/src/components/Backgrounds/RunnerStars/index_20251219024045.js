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
    const lineProbeRef = useRef(null);

    const prefs = useMemo(
        () => ({
            fadeAlpha: 0.12,
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
            star: getProbeColor(starProbeRef.current, "rgb(255,255,255)"),
            line: getProbeColor(lineProbeRef.current, "rgb(255,255,255)"),
        };

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            t: 0,
            stars: [],
            runnerX: 0,
        };

        const buildStars = () => {
            const w = state.width;
            const h = state.height;
            const area = w * h;

            // Density tuned to look like the reference without being heavy.
            const count = clamp(Math.floor(area / 2600), 220, 900);
            const stars = new Array(count);

            for (let i = 0; i < count; i++) {
                const depth = 0.25 + Math.random() * 0.75; // 0..1
                const size = clamp(0.6 + Math.random() * 1.8, 0.6, 2.6);
                const speed = (0.08 + depth * 0.35) * (0.8 + Math.random() * 0.6);
                stars[i] = {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size,
                    speed,
                    a: clamp(0.18 + depth * 0.55, 0.18, 0.85),
                    tw: 0.6 + Math.random() * 1.6,
                    ph: Math.random() * Math.PI * 2,
                };
            }

            state.stars = stars;
            state.runnerX = -w * 0.2;
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

            buildStars();
        };

        const drawStars = () => {
            const w = state.width;
            const h = state.height;

            // Fade (keeps trails subtle)
            ctx.fillStyle = `rgba(0,0,0,${prefs.fadeAlpha})`;
            ctx.fillRect(0, 0, w, h);

            // Slight vignette to keep hero text readable
            const vg = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
            vg.addColorStop(0, "rgba(0,0,0,0.00)");
            vg.addColorStop(1, "rgba(0,0,0,0.88)");
            ctx.fillStyle = vg;
            ctx.fillRect(0, 0, w, h);

            for (let i = 0; i < state.stars.length; i++) {
                const s = state.stars[i];
                // gentle diagonal drift
                s.y += s.speed;
                s.x += s.speed * 0.25;

                if (s.y > h + 2) {
                    s.y = -2;
                    s.x = Math.random() * w;
                }
                if (s.x > w + 2) {
                    s.x = -2;
                }

                const twinkle = 0.65 + 0.35 * Math.sin(state.t * s.tw + s.ph);
                const alpha = clamp(s.a * twinkle, 0.08, 0.95);

                drawCircle(ctx, s.x, s.y, s.size);
                ctx.fillStyle = rgbaFromRgb(colors.star, alpha);
                ctx.fill();
            }
        };

        const drawRunner = () => {
            const w = state.width;
            const h = state.height;

            const groundY = h * 0.74;
            const lineW = clamp(Math.min(w, h) * 0.0036, 1.5, 3);

            // Ground line
            ctx.save();
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = rgbaFromRgb(colors.line, 0.7);
            ctx.lineWidth = lineW;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(w * 0.12, groundY);
            ctx.lineTo(w * 0.88, groundY);
            ctx.stroke();

            // Runner position
            const speedPx = clamp(w * 0.12, 70, 180);
            state.runnerX += speedPx * 0.016; // ~60fps step
            if (state.runnerX > w * 0.92) state.runnerX = -w * 0.2;

            const x = state.runnerX;
            const y = groundY;
            const scale = clamp(Math.min(w, h) * 0.0019, 0.9, 1.4);

            // Stick-figure pose via sine wave
            const t = state.t;
            const step = Math.sin(t * 6.2);
            const step2 = Math.sin(t * 6.2 + Math.PI);

            const headR = 14 * scale;
            const bodyLen = 46 * scale;
            const limbLen = 34 * scale;
            const armLen = 30 * scale;

            const hip = { x, y: y - 6 * scale };
            const neck = { x, y: y - bodyLen };
            const head = { x, y: neck.y - headR - 6 * scale };

            const legA = { x: hip.x + step * 10 * scale, y: hip.y + limbLen * 0.9 };
            const legB = { x: hip.x + step2 * 10 * scale, y: hip.y + limbLen * 0.9 };

            const kneeA = { x: (hip.x + legA.x) / 2 + step * 6 * scale, y: (hip.y + legA.y) / 2 - Math.abs(step) * 8 * scale };
            const kneeB = { x: (hip.x + legB.x) / 2 + step2 * 6 * scale, y: (hip.y + legB.y) / 2 - Math.abs(step2) * 8 * scale };

            const shoulder = { x: neck.x, y: neck.y + 10 * scale };
            const handA = { x: shoulder.x + step2 * 18 * scale, y: shoulder.y + armLen * 0.65 };
            const handB = { x: shoulder.x + step * 18 * scale, y: shoulder.y + armLen * 0.65 };

            ctx.strokeStyle = rgbaFromRgb(colors.line, 0.85);
            ctx.lineWidth = clamp(3 * scale, 2, 4);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // Head
            drawCircle(ctx, head.x, head.y, headR);
            ctx.stroke();

            // Body
            ctx.beginPath();
            ctx.moveTo(neck.x, neck.y);
            ctx.lineTo(hip.x, hip.y);
            ctx.stroke();

            // Arms
            ctx.beginPath();
            ctx.moveTo(shoulder.x, shoulder.y);
            ctx.lineTo(handA.x, handA.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(shoulder.x, shoulder.y);
            ctx.lineTo(handB.x, handB.y);
            ctx.stroke();

            // Legs
            ctx.beginPath();
            ctx.moveTo(hip.x, hip.y);
            ctx.lineTo(kneeA.x, kneeA.y);
            ctx.lineTo(legA.x, legA.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(hip.x, hip.y);
            ctx.lineTo(kneeB.x, kneeB.y);
            ctx.lineTo(legB.x, legB.y);
            ctx.stroke();

            // Subtle glow
            ctx.globalCompositeOperation = "lighter";
            ctx.strokeStyle = rgbaFromRgb(colors.line, 0.12);
            ctx.lineWidth = clamp(10 * scale, 7, 14);
            drawCircle(ctx, head.x, head.y, headR);
            ctx.stroke();

            ctx.restore();
        };

        const render = () => {
            drawStars();
            drawRunner();

            // Top fade for readability over hero content
            const h = state.height;
            const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.36);
            topFade.addColorStop(0, "rgba(0,0,0,0.78)");
            topFade.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = topFade;
            ctx.fillRect(0, 0, state.width, h * 0.36);
        };

        let rafId = 0;
        let last = 0;

        const tick = (ts) => {
            if (!last) last = ts;
            const dt = clamp((ts - last) / 1000, 0, 0.05);
            last = ts;

            state.t += dt;
            render();
            rafId = window.requestAnimationFrame(tick);
        };

        resize();
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
            <span ref={starProbeRef} className="hidden text-white" />
            <span ref={lineProbeRef} className="hidden text-white" />
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
        </div>
    );
}
