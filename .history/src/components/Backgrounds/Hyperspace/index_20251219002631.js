import { useEffect, useMemo, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function HyperspaceBG({ paused = false }) {
    const canvasRef = useRef(null);
    const baseColorProbeRef = useRef(null);
    const accentColorProbeRef = useRef(null);

    const motionPrefs = useMemo(
        () => ({
            starCount: 1800,
            depth: 1400,
            baseSpeed: 1750,
            maxSpeed: 3600,
            fadeAlpha: 0.08,
        }),
        []
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let rafId = 0;
        let lastTime = 0;

        const getProbeColor = (element, fallback) => {
            if (!element) return fallback;
            const color = window.getComputedStyle(element).color;
            return color && color !== "" ? color : fallback;
        };

        const baseColor = getProbeColor(baseColorProbeRef.current, "rgb(255, 255, 255)");
        const accentColor = getProbeColor(accentColorProbeRef.current, baseColor);

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            centerX: 0,
            centerY: 0,
            stars: [],
        };

        const resize = () => {
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            const width = window.innerWidth;
            const height = window.innerHeight;

            state.width = width;
            state.height = height;
            state.dpr = dpr;
            state.centerX = width / 2;
            state.centerY = height / 2;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const createStars = () => {
            const { starCount, depth } = motionPrefs;
            state.stars = new Array(starCount).fill(null).map(() => {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.pow(Math.random(), 0.55);

                return {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    z: Math.random() * depth + 1,
                    size: Math.random() * 1.3 + 0.35,
                    tint: Math.random(),
                };
            });
        };

        const project = (star, z) => {
            const perspective = 440;
            const scale = perspective / z;
            const spread = Math.max(state.width, state.height) * 0.62;
            return {
                px: star.x * spread * scale + state.centerX,
                py: star.y * spread * scale + state.centerY,
                scale,
            };
        };

        const drawFrame = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const dt = clamp((timestamp - lastTime) / 1000, 0, 0.05);
            lastTime = timestamp;

            ctx.fillStyle = `rgba(0, 0, 0, ${motionPrefs.fadeAlpha})`;
            ctx.fillRect(0, 0, state.width, state.height);

            const speed = clamp(motionPrefs.baseSpeed, motionPrefs.baseSpeed, motionPrefs.maxSpeed);
            const zTravel = speed * dt;

            for (let i = 0; i < state.stars.length; i++) {
                const star = state.stars[i];
                const prevZ = star.z;
                star.z -= zTravel;

                if (star.z <= 1) {
                    star.z = motionPrefs.depth;
                    const angle = Math.random() * Math.PI * 2;
                    const radius = Math.pow(Math.random(), 0.55);
                    star.x = Math.cos(angle) * radius;
                    star.y = Math.sin(angle) * radius;
                    star.size = Math.random() * 1.3 + 0.35;
                    star.tint = Math.random();
                    continue;
                }

                const cur = project(star, star.z);

                const dx = cur.px - state.centerX;
                const dy = cur.py - state.centerY;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const dirX = dx / dist;
                const dirY = dy / dist;

                const depthFactor = clamp(1 - star.z / motionPrefs.depth, 0, 1);
                const trail = clamp(10 + depthFactor * 120, 14, 140);
                const startX = cur.px - dirX * trail;
                const startY = cur.py - dirY * trail;

                if (
                    cur.px < -50 ||
                    cur.px > state.width + 50 ||
                    cur.py < -50 ||
                    cur.py > state.height + 50
                ) {
                    continue;
                }

                const alpha = depthFactor;
                const lineWidth = clamp(cur.scale * star.size * 3.0, 0.5, 5.2);
                const useAccent = star.tint < 0.45;

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(cur.px, cur.py);
                ctx.strokeStyle = useAccent
                    ? accentColor.replace("rgb(", "rgba(").replace(")", `, ${alpha * 0.9})`)
                    : baseColor.replace("rgb(", "rgba(").replace(")", `, ${alpha * 0.85})`);
                ctx.lineWidth = lineWidth;
                ctx.lineCap = "round";
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(cur.px, cur.py, lineWidth * 0.65, 0, Math.PI * 2);
                ctx.fillStyle = useAccent
                    ? accentColor.replace("rgb(", "rgba(").replace(")", `, ${alpha})`)
                    : baseColor.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
                ctx.fill();
            }

            rafId = window.requestAnimationFrame(drawFrame);
        };

        resize();
        createStars();

        window.addEventListener("resize", resize);

        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, state.width, state.height);

        if (!paused) {
            rafId = window.requestAnimationFrame(drawFrame);
        } else {
            // Render a single static frame.
            drawFrame(performance.now());
            window.cancelAnimationFrame(rafId);
        }

        return () => {
            window.removeEventListener("resize", resize);
            window.cancelAnimationFrame(rafId);
        };
    }, [paused, motionPrefs]);

    return (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <span ref={baseColorProbeRef} className="hidden text-blue-400" />
            <span ref={accentColorProbeRef} className="hidden text-purple-400" />
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
        </div>
    );
}
