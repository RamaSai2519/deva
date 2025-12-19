import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function rgbaFromRgb(rgb, alpha) {
    if (!rgb) return `rgba(255,255,255,${alpha})`;
    if (rgb.startsWith("rgba")) return rgb;
    if (!rgb.startsWith("rgb")) return `rgba(255,255,255,${alpha})`;
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

export default function ConstellationBG({ paused = false }) {
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
            nodes: [],
            laneCount: 7,
            laneGap: 64,
            graphTop: 0,
            graphHeight: 0,
            graphCenterX: 0,
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

            state.laneCount = clamp(Math.floor(width / 170), 6, 10);
            state.laneGap = clamp(width * 0.06, 44, 78);
            state.graphTop = height * 0.12;
            state.graphHeight = height * 0.76;
            state.graphCenterX = width * 0.53;
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

            const nodeCount = clamp(Math.floor((w * h) / 16000), 64, 170);
            const nodes = new Array(nodeCount).fill(null).map((_, i) => {
                const lane = Math.floor(Math.random() * state.laneCount);
                const y = -0.2 + Math.random() * 1.4;
                const size = Math.random() * 1.4 + 1.2;
                const phase = Math.random() * Math.PI * 2;
                const huePick = Math.random();

                const parent = i === 0 ? -1 : Math.floor(Math.random() * i);
                const wantsMerge = Math.random() < 0.14;
                const mergeParent = wantsMerge && i > 8 ? Math.floor(Math.random() * i) : -1;

                return {
                    lane,
                    y,
                    size,
                    phase,
                    huePick,
                    parent,
                    mergeParent,
                    jitter: (Math.random() - 0.5) * 0.24,
                };
            });

            state.nodes = nodes;
        };

        const laneX = (laneIndex) => {
            const mid = (state.laneCount - 1) / 2;
            return state.graphCenterX + (laneIndex - mid) * state.laneGap;
        };

        const nodeScreen = (node, localT) => {
            const speed = 0.045;
            const yy = ((node.y + localT * speed + node.jitter) % 1.4 + 1.4) % 1.4;
            const y01 = yy - 0.2; // now in [-0.2, 1.2]
            const x = laneX(node.lane);
            const y = state.graphTop + y01 * state.graphHeight;
            return { x, y, y01 };
        };

        const draw = () => {
            const w = state.width;
            const h = state.height;

            // Soft fade keeps motion smooth
            ctx.fillStyle = "rgba(0,0,0,0.16)";
            ctx.fillRect(0, 0, w, h);

            // Vignette for readability
            const vignette = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.74);
            vignette.addColorStop(0, "rgba(0,0,0,0.06)");
            vignette.addColorStop(1, "rgba(0,0,0,0.86)");
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

            // Graph (commit-constellation)
            const centerShiftX = mx * 0.2;
            const centerShiftY = my * 0.2;

            ctx.save();
            ctx.translate(centerShiftX, centerShiftY);
            ctx.globalCompositeOperation = "lighter";

            // Subtle lane glow rails
            for (let lane = 0; lane < state.laneCount; lane++) {
                const x = laneX(lane);
                const railAlpha = 0.018;

                ctx.beginPath();
                ctx.moveTo(x, state.graphTop);
                ctx.lineTo(x, state.graphTop + state.graphHeight);
                ctx.strokeStyle = rgbaFromRgb(lane % 2 === 0 ? baseColor : accentColor, railAlpha);
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Edges
            for (let i = 0; i < state.nodes.length; i++) {
                const node = state.nodes[i];
                const a = nodeScreen(node, state.t);

                if (a.y01 < 0 || a.y01 > 1) continue;

                const drawEdgeTo = (parentIndex, strength = 1) => {
                    if (parentIndex < 0 || parentIndex >= state.nodes.length) return;
                    const parent = state.nodes[parentIndex];
                    const b = nodeScreen(parent, state.t);

                    // Only connect if parent is visually "above" to avoid wrap-around lines
                    if (b.y >= a.y) return;
                    if (b.y01 < -0.05 || b.y01 > 1.05) return;

                    const dx = a.x - b.x;
                    const isCrossLane = Math.abs(dx) > state.laneGap * 0.35;

                    const edgeAlpha = clamp(0.04 + (1 - a.y01) * 0.08, 0.04, 0.14) * strength;
                    const edgeColor = isCrossLane ? accentColor : baseColor;

                    ctx.beginPath();
                    if (isCrossLane) {
                        const cx1 = lerp(b.x, a.x, 0.35);
                        const cx2 = lerp(b.x, a.x, 0.65);
                        const cy1 = lerp(b.y, a.y, 0.35);
                        const cy2 = lerp(b.y, a.y, 0.65);
                        ctx.moveTo(b.x, b.y);
                        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, a.x, a.y);
                    } else {
                        ctx.moveTo(b.x, b.y);
                        ctx.lineTo(a.x, a.y);
                    }

                    ctx.strokeStyle = rgbaFromRgb(edgeColor, edgeAlpha);
                    ctx.lineWidth = isCrossLane ? 1.15 : 1;
                    ctx.lineCap = "round";
                    ctx.stroke();
                };

                drawEdgeTo(node.parent, 1);
                if (node.mergeParent !== -1) drawEdgeTo(node.mergeParent, 0.75);
            }

            // Nodes
            for (let i = 0; i < state.nodes.length; i++) {
                const node = state.nodes[i];
                const p = nodeScreen(node, state.t);
                if (p.y01 < 0 || p.y01 > 1) continue;

                const pulse = 0.6 + 0.4 * Math.sin(state.t * 1.4 + node.phase);
                const alpha = clamp(0.18 + (1 - p.y01) * 0.22 + pulse * 0.06, 0.14, 0.52);

                const c = node.huePick < 0.18 ? glowColor : node.huePick < 0.55 ? baseColor : accentColor;

                // glow
                const glowR = node.size * 8;
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
                g.addColorStop(0, rgbaFromRgb(c, alpha * 0.30));
                g.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
                ctx.fill();

                // core
                ctx.beginPath();
                ctx.arc(p.x, p.y, node.size, 0, Math.PI * 2);
                ctx.fillStyle = rgbaFromRgb(c, clamp(alpha + 0.16, 0, 1));
                ctx.fill();
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
