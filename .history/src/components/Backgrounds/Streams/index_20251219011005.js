import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function rgbaFromRgb(rgb, alpha) {
    if (!rgb) return `rgba(255,255,255,${alpha})`;
    if (rgb.startsWith("rgba")) return rgb;
    if (!rgb.startsWith("rgb")) return `rgba(255,255,255,${alpha})`;
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

export default function StreamsBG({ paused = false }) {
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
            ribbons: [],
            sparks: [],
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

            const starCount = clamp(Math.floor((w * h) / 2400), 420, 1200);
            state.stars = new Array(starCount).fill(null).map(() => {
                const layer = Math.random() < 0.25 ? 2 : Math.random() < 0.55 ? 1 : 0;
                return {
                    x: Math.random(),
                    y: Math.random(),
                    r: Math.random() * 1.15 + 0.2,
                    tw: Math.random() * 1.6 + 0.25,
                    layer,
                    huePick: Math.random(),
                };
            });

            const ribbonCount = clamp(Math.floor(w / 360), 3, 5);
            state.ribbons = new Array(ribbonCount).fill(null).map((_, i) => {
                const y = 0.28 + i * (0.48 / Math.max(1, ribbonCount - 1));
                const amp = clamp(w * 0.04, 18, 42) * (0.9 + Math.random() * 0.4);
                const freq = 0.85 + Math.random() * 0.8;
                const speed = (0.10 + Math.random() * 0.18) * (Math.random() < 0.5 ? -1 : 1);
                const drift = 0.14 + Math.random() * 0.16;
                const widthPx = 1.4 + Math.random() * 1.5;
                const color = i % 2 === 0 ? baseColor : accentColor;
                return { y, amp, freq, speed, drift, widthPx, color };
            });

            state.sparks = [];
        };

        const ribbonY = (r, x01, t, mx, my) => {
            // Smooth, non-orbit “streams”
            const a = r.amp * (0.72 + 0.28 * Math.sin(t * r.drift + r.y * 7));
            const wobble =
                Math.sin((x01 * Math.PI * 2) * r.freq + t * r.speed) * a +
                Math.sin((x01 * Math.PI * 2) * (r.freq * 0.52) - t * (r.speed * 0.7)) * (a * 0.45);

            const parallax = (my - 0.5) * 24 + Math.sin(t * 0.22 + x01 * 5) * 6;
            return r.y + (wobble + parallax) / Math.max(1, state.height);
        };

        const spawnSpark = () => {
            const w = state.width;
            const count = state.ribbons.length;
            if (!count) return;

            const ribbonIndex = Math.floor(Math.random() * count);
            const x = Math.random() < 0.55 ? -Math.random() * w * 0.2 : Math.random() * w;
            const speed = (w * (0.16 + Math.random() * 0.24)) * (Math.random() < 0.88 ? 1 : -1);
            const size = 1.1 + Math.random() * 1.8;
            const life = 0.55 + Math.random() * 0.7;
            const huePick = Math.random();

            state.sparks.push({
                ribbonIndex,
                x,
                speed,
                size,
                life,
                age: 0,
                huePick,
                phase: Math.random() * Math.PI * 2,
                alpha: 0.22 + Math.random() * 0.24,
            });

            // cap
            if (state.sparks.length > 130) state.sparks.splice(0, state.sparks.length - 130);
        };

        const draw = () => {
            const w = state.width;
            const h = state.height;

            // Fade
            ctx.fillStyle = "rgba(0,0,0,0.14)";
            ctx.fillRect(0, 0, w, h);

            // Vignette for readability
            const vignette = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.76);
            vignette.addColorStop(0, "rgba(0,0,0,0.04)");
            vignette.addColorStop(1, "rgba(0,0,0,0.88)");
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

                const x = (s.x + driftX) * w + mx * (s.layer + 1) * 0.42;
                const y = (s.y + driftY) * h + my * (s.layer + 1) * 0.42;

                if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;

                const twinkle = 0.55 + 0.45 * Math.sin(state.t * s.tw + s.x * 10 + s.y * 6);
                const alpha = clamp(0.07 + twinkle * 0.26, 0.06, 0.34);
                const radius = clamp(s.r + s.layer * 0.25, 0.3, 2.1);

                const color = s.huePick < 0.22 ? accentColor : s.huePick < 0.6 ? baseColor : "rgb(255, 255, 255)";

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(color, alpha);
                ctx.fill();
            }

            // Streams + sparks
            ctx.save();
            ctx.globalCompositeOperation = "lighter";

            // Streams
            const step = clamp(Math.floor(w / 85), 12, 22);

            for (let i = 0; i < state.ribbons.length; i++) {
                const r = state.ribbons[i];

                ctx.beginPath();
                for (let x = -24; x <= w + 24; x += step) {
                    const x01 = x / Math.max(1, w);
                    const y01 = ribbonY(r, x01, state.t, mouse.x, mouse.y);
                    const y = y01 * h;
                    if (x === -24) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                const grad = ctx.createLinearGradient(0, h * r.y, w, h * r.y);
                grad.addColorStop(0, rgbaFromRgb(r.color, 0));
                grad.addColorStop(0.2, rgbaFromRgb(r.color, 0.10));
                grad.addColorStop(0.5, rgbaFromRgb(r.color, 0.24));
                grad.addColorStop(0.8, rgbaFromRgb(r.color, 0.10));
                grad.addColorStop(1, rgbaFromRgb(r.color, 0));

                ctx.strokeStyle = grad;
                ctx.lineWidth = r.widthPx;
                ctx.lineCap = "round";
                ctx.stroke();

                // soft glow pass
                ctx.strokeStyle = rgbaFromRgb(r.color, 0.05);
                ctx.lineWidth = r.widthPx * 3.2;
                ctx.stroke();
            }

            // Sparks
            for (let i = state.sparks.length - 1; i >= 0; i--) {
                const s = state.sparks[i];
                const r = state.ribbons[s.ribbonIndex];
                if (!r) {
                    state.sparks.splice(i, 1);
                    continue;
                }

                const x = s.x;
                const x01 = x / Math.max(1, w);
                const y01 = ribbonY(r, x01, state.t, mouse.x, mouse.y);
                const y = y01 * h;

                const fade = clamp(1 - s.age / Math.max(0.001, s.life), 0, 1);
                const pulse = 0.6 + 0.4 * Math.sin(state.t * 3.2 + s.phase);
                const alpha = s.alpha * fade * (0.75 + 0.25 * pulse);

                const c = s.huePick < 0.18 ? glowColor : s.huePick < 0.55 ? baseColor : accentColor;

                const glowR = s.size * 10;
                const g = ctx.createRadialGradient(x, y, 0, x, y, glowR);
                g.addColorStop(0, rgbaFromRgb(c, alpha * 0.55));
                g.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(x, y, glowR, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(c, clamp(alpha + 0.16, 0, 1));
                ctx.fill();

                // update in-place happens in tick
            }

            ctx.restore();

            // Top fade for Hero readability
            const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.36);
            topFade.addColorStop(0, "rgba(0,0,0,0.74)");
            topFade.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = topFade;
            ctx.fillRect(0, 0, w, h * 0.36);
        };

        let rafId = 0;
        let lastTime = 0;

        const tick = (ts) => {
            if (!lastTime) lastTime = ts;
            const dt = clamp((ts - lastTime) / 1000, 0, 0.05);
            lastTime = ts;

            state.t += dt;

            // spawn sparks (rate scales with area)
            const rate = clamp((state.width * state.height) / 1800000, 0.45, 1.2);
            if (Math.random() < rate * 0.9) spawnSpark();
            if (Math.random() < rate * 0.5) spawnSpark();

            // update sparks
            for (let i = state.sparks.length - 1; i >= 0; i--) {
                const s = state.sparks[i];
                s.age += dt;
                s.x += s.speed * dt;

                const out = s.x < -state.width * 0.35 || s.x > state.width * 1.35 || s.age > s.life;
                if (out) state.sparks.splice(i, 1);
            }

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
            <span ref={glowColorProbeRef} className="hidden text-blue-400" />
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] mix-blend-overlay" />
        </div>
    );
}
