import { useEffect, useMemo, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function rgbaFromRgb(rgb, alpha) {
    if (!rgb) return `rgba(255,255,255,${alpha})`;
    if (rgb.startsWith("rgba")) return rgb;
    if (!rgb.startsWith("rgb")) return `rgba(255,255,255,${alpha})`;
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

function hash01(x, y) {
    let n = x * 374761393 + y * 668265263;
    n = (n ^ (n >> 13)) >>> 0;
    n = (n * 1274126177) >>> 0;
    return ((n ^ (n >> 16)) >>> 0) / 4294967296;
}

function roundedCornerPath(ctx, points, cornerRadius) {
    if (points.length < 2) return;
    const r = Math.max(0, cornerRadius);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
        const prev = points[i - 1];
        const cur = points[i];
        const next = points[i + 1];

        const vx1 = cur.x - prev.x;
        const vy1 = cur.y - prev.y;
        const vx2 = next.x - cur.x;
        const vy2 = next.y - cur.y;

        const len1 = Math.hypot(vx1, vy1) || 1;
        const len2 = Math.hypot(vx2, vy2) || 1;

        const ux1 = vx1 / len1;
        const uy1 = vy1 / len1;
        const ux2 = vx2 / len2;
        const uy2 = vy2 / len2;

        const d = Math.min(r, len1 * 0.5, len2 * 0.5);
        const p1x = cur.x - ux1 * d;
        const p1y = cur.y - uy1 * d;
        const p2x = cur.x + ux2 * d;
        const p2y = cur.y + uy2 * d;

        ctx.lineTo(p1x, p1y);
        ctx.quadraticCurveTo(cur.x, cur.y, p2x, p2y);
    }

    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
}

export default function CircuitLinesBG({ paused = false }) {
    const rootRef = useRef(null);
    const canvasRef = useRef(null);

    const lineProbeRef = useRef(null);
    const nodeProbeRef = useRef(null);
    const dimProbeRef = useRef(null);

    const prefs = useMemo(
        () => ({
            wireCount: 7,
            fadeAlpha: 0.18,
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
            line: getProbeColor(lineProbeRef.current, "rgb(255,255,255)"),
            node: getProbeColor(nodeProbeRef.current, "rgb(255,255,255)"),
            dim: getProbeColor(dimProbeRef.current, "rgb(148,163,184)"),
        };

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            t: 0,
            wires: [],
        };

        const buildWires = () => {
            const w = state.width;
            const h = state.height;

            const safeW = Math.max(1, w);
            const safeH = Math.max(1, h);

            const wires = [];
            for (let i = 0; i < prefs.wireCount; i++) {
                const seed = i + 17;

                const startEdge = hash01(seed, 1) < 0.5 ? "left" : "top";
                const endEdge = hash01(seed, 2) < 0.5 ? "right" : "bottom";

                const sx = startEdge === "left" ? -safeW * 0.1 : hash01(seed, 3) * safeW;
                const sy = startEdge === "top" ? -safeH * 0.1 : hash01(seed, 4) * safeH;

                const ex = endEdge === "right" ? safeW * 1.1 : hash01(seed, 5) * safeW;
                const ey = endEdge === "bottom" ? safeH * 1.1 : hash01(seed, 6) * safeH;

                // Two orthogonal bends with rounded corners.
                const midX = hash01(seed, 7) * safeW;
                const midY = hash01(seed, 8) * safeH;

                const points = [
                    { x: sx, y: sy },
                    { x: midX, y: sy },
                    { x: midX, y: midY },
                    { x: ex, y: midY },
                    { x: ex, y: ey },
                ];

                const nodes = [];
                // Nodes at some bends (circles/diamonds/squares)
                for (let j = 1; j < points.length - 1; j++) {
                    const p = points[j];
                    const pick = hash01(seed, 20 + j);
                    if (pick < 0.52) continue;
                    const type = pick < 0.72 ? "circle" : pick < 0.88 ? "diamond" : "square";
                    const size01 = hash01(seed, 40 + j);
                    nodes.push({
                        x: p.x,
                        y: p.y,
                        type,
                        r: clamp(5 + size01 * 8, 5, 14),
                    });
                }

                wires.push({
                    seed,
                    points,
                    nodes,
                    phase: hash01(seed, 99) * Math.PI * 2,
                    speed: 0.35 + hash01(seed, 101) * 0.45,
                });
            }

            state.wires = wires;
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

            buildWires();
        };

        const drawNode = (node) => {
            const r = Math.max(0.1, node.r);
            ctx.save();
            ctx.translate(node.x, node.y);

            if (node.type === "circle") {
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.fill();
            } else if (node.type === "square") {
                ctx.beginPath();
                ctx.rect(-r, -r, r * 2, r * 2);
                ctx.fill();
            } else {
                // diamond
                ctx.beginPath();
                ctx.moveTo(0, -r);
                ctx.lineTo(r, 0);
                ctx.lineTo(0, r);
                ctx.lineTo(-r, 0);
                ctx.closePath();
                ctx.stroke();
            }

            ctx.restore();
        };

        const render = () => {
            const w = state.width;
            const h = state.height;

            // Fade
            ctx.fillStyle = `rgba(0,0,0,${prefs.fadeAlpha})`;
            ctx.fillRect(0, 0, w, h);

            // Subtle vignette
            const vg = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
            vg.addColorStop(0, "rgba(0,0,0,0.0)");
            vg.addColorStop(1, "rgba(0,0,0,0.85)");
            ctx.fillStyle = vg;
            ctx.fillRect(0, 0, w, h);

            const lineWidth = clamp(Math.min(w, h) * 0.0038, 1.2, 2.6);
            const cornerRadius = clamp(Math.min(w, h) * 0.025, 10, 26);

            for (let i = 0; i < state.wires.length; i++) {
                const wire = state.wires[i];
                const shimmer = 0.55 + 0.45 * Math.sin(state.t * wire.speed + wire.phase);
                const alpha = clamp(0.35 + shimmer * 0.35, 0.28, 0.75);

                roundedCornerPath(ctx, wire.points, cornerRadius);
                ctx.strokeStyle = rgbaFromRgb(colors.line, alpha);
                ctx.lineWidth = lineWidth;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();

                // Soft inner highlight
                roundedCornerPath(ctx, wire.points, cornerRadius);
                ctx.strokeStyle = rgbaFromRgb(colors.dim, alpha * 0.18);
                ctx.lineWidth = lineWidth * 3.2;
                ctx.stroke();

                // Nodes
                ctx.fillStyle = rgbaFromRgb(colors.node, clamp(0.7 + shimmer * 0.25, 0.65, 0.92));
                ctx.strokeStyle = rgbaFromRgb(colors.node, clamp(0.55 + shimmer * 0.25, 0.5, 0.85));
                ctx.lineWidth = 2;

                for (let n = 0; n < wire.nodes.length; n++) {
                    drawNode(wire.nodes[n]);
                }
            }

            // top fade for readability
            const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.36);
            topFade.addColorStop(0, "rgba(0,0,0,0.75)");
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
            {/* Tailwind token probes: avoid introducing new hard-coded colors */}
            <span ref={lineProbeRef} className="hidden text-white" />
            <span ref={nodeProbeRef} className="hidden text-white" />
            <span ref={dimProbeRef} className="hidden text-slate-300" />
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
        </div>
    );
}
