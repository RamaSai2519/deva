import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function GridWarpBG({ paused = false }) {
    const canvasRef = useRef(null);
    const baseColorProbeRef = useRef(null);
    const accentColorProbeRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let rafId = 0;
        let lastTime = 0;

        const mouse = { x: 0.5, y: 0.5 };

        const getProbeColor = (element, fallback) => {
            if (!element) return fallback;
            const color = window.getComputedStyle(element).color;
            return color && color !== "" ? color : fallback;
        };

        const baseColor = getProbeColor(baseColorProbeRef.current, "rgb(59, 130, 246)");
        const accentColor = getProbeColor(accentColorProbeRef.current, "rgb(168, 85, 247)");

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            t: 0,
        };

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

        const rgbaFromRgb = (rgb, alpha) => rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);

        const drawBackground = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
            ctx.fillRect(0, 0, state.width, state.height);

            // Soft vignette for readability.
            ctx.fillStyle = "rgba(0,0,0,0.35)";
            ctx.fillRect(0, 0, state.width, state.height);
        };

        const drawStarDust = () => {
            const count = Math.floor((state.width * state.height) / 30000);
            const cx = state.width * 0.5;
            const cy = state.height * 0.35;
            const spread = Math.max(state.width, state.height) * 0.55;
            const drift = state.t * 0.28;

            for (let i = 0; i < count; i++) {
                const seed = i * 999.91;
                const x = (Math.sin(seed + drift) * 0.5 + 0.5) * state.width;
                const y = (Math.cos(seed * 1.3 + drift * 1.2) * 0.5 + 0.5) * state.height;
                const dx = (x - cx) / spread;
                const dy = (y - cy) / spread;
                const r = Math.sqrt(dx * dx + dy * dy);
                const a = clamp(1 - r, 0, 1) * 0.25;

                ctx.beginPath();
                ctx.arc(x, y, 1.1, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(i % 3 === 0 ? accentColor : baseColor, a);
                ctx.fill();
            }
        };

        const drawGrid = () => {
            const width = state.width;
            const height = state.height;

            const horizon = height * 0.42;
            const centerX = width * (0.5 + (mouse.x - 0.5) * 0.08);

            const time = state.t;
            const speed = 1.25;

            // Perspective grid parameters.
            const lines = 16;
            const depthLines = 26;
            const gridHalfWidth = width * 0.55;
            const waveAmp = 22;

            // Vertical perspective lines
            for (let i = -lines; i <= lines; i++) {
                const t = i / lines;
                const x0 = centerX + t * gridHalfWidth;
                const x1 = centerX + t * gridHalfWidth * 0.05;

                const alpha = clamp(0.55 - Math.abs(t) * 0.55, 0.08, 0.42);
                ctx.beginPath();
                ctx.moveTo(x0, height);
                ctx.lineTo(x1, horizon);
                ctx.strokeStyle = rgbaFromRgb(baseColor, alpha);
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Horizontal depth lines
            for (let j = 0; j < depthLines; j++) {
                const z = (j / depthLines) ** 1.8;
                const y = horizon + (height - horizon) * z;
                const wobble = Math.sin(time * speed + j * 0.55) * waveAmp * (1 - z);

                const left = centerX - gridHalfWidth * (1 - z) + wobble;
                const right = centerX + gridHalfWidth * (1 - z) - wobble;

                const alpha = clamp(0.45 - z * 0.4, 0.05, 0.32);
                ctx.beginPath();
                ctx.moveTo(left, y);
                ctx.lineTo(right, y);
                ctx.strokeStyle = rgbaFromRgb(j % 4 === 0 ? accentColor : baseColor, alpha);
                ctx.lineWidth = j % 4 === 0 ? 1.25 : 0.8;
                ctx.stroke();
            }

            // Glow at horizon
            ctx.fillStyle = "rgba(0,0,0,0)";
            const glowHeight = height * 0.22;
            const gradient = ctx.createLinearGradient(0, horizon - glowHeight * 0.2, 0, horizon + glowHeight);
            gradient.addColorStop(0, "rgba(0,0,0,0)");
            gradient.addColorStop(0.25, rgbaFromRgb(accentColor, 0.16));
            gradient.addColorStop(0.65, rgbaFromRgb(baseColor, 0.11));
            gradient.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, horizon - glowHeight * 0.2, width, glowHeight * 1.2);
        };

        const render = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const dt = clamp((timestamp - lastTime) / 1000, 0, 0.05);
            lastTime = timestamp;

            state.t += dt;

            drawBackground();
            drawStarDust();
            drawGrid();

            rafId = window.requestAnimationFrame(render);
        };

        const onMouseMove = (event) => {
            mouse.x = clamp(event.clientX / Math.max(1, window.innerWidth), 0, 1);
            mouse.y = clamp(event.clientY / Math.max(1, window.innerHeight), 0, 1);
        };

        resize();

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMouseMove);

        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, state.width, state.height);

        if (!paused) {
            rafId = window.requestAnimationFrame(render);
        } else {
            state.t = 0;
            drawBackground();
            drawStarDust();
            drawGrid();
        }

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.cancelAnimationFrame(rafId);
        };
    }, [paused]);

    return (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <span ref={baseColorProbeRef} className="hidden text-blue-400" />
            <span ref={accentColorProbeRef} className="hidden text-purple-400" />
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
        </div>
    );
}
