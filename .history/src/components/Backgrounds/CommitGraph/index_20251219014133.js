import { useEffect, useMemo, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function rgbaFromRgb(rgb, alpha) {
    if (!rgb) return `rgba(255,255,255,${alpha})`;
    if (rgb.startsWith("rgba")) return rgb;
    if (!rgb.startsWith("rgb")) return `rgba(255,255,255,${alpha})`;
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

function mixRgb(a, b, t) {
    // a/b are rgb(...) strings
    const pa = a.match(/\d+/g)?.map(Number) ?? [255, 255, 255];
    const pb = b.match(/\d+/g)?.map(Number) ?? [255, 255, 255];
    const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
    const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
    const bb = Math.round(pa[2] + (pb[2] - pa[2]) * t);
    return `rgb(${r}, ${g}, ${bb})`;
}

function hash01(x, y) {
    // small deterministic hash -> [0,1)
    let n = x * 374761393 + y * 668265263;
    n = (n ^ (n >> 13)) >>> 0;
    n = (n * 1274126177) >>> 0;
    return ((n ^ (n >> 16)) >>> 0) / 4294967296;
}

const FONT_5X7 = {
    E: [
        "11111",
        "10000",
        "11110",
        "10000",
        "10000",
        "10000",
        "11111",
    ],
    P: [
        "11110",
        "10001",
        "10001",
        "11110",
        "10000",
        "10000",
        "10000",
    ],
    O: [
        "01110",
        "10001",
        "10001",
        "10001",
        "10001",
        "10001",
        "01110",
    ],
    C: [
        "01111",
        "10000",
        "10000",
        "10000",
        "10000",
        "10000",
        "01111",
    ],
    H: [
        "10001",
        "10001",
        "10001",
        "11111",
        "10001",
        "10001",
        "10001",
    ],
    0: [
        "01110",
        "10001",
        "10011",
        "10101",
        "11001",
        "10001",
        "01110",
    ],
    4: [
        "00010",
        "00110",
        "01010",
        "10010",
        "11111",
        "00010",
        "00010",
    ],
    ".": [
        "00000",
        "00000",
        "00000",
        "00000",
        "00000",
        "00100",
        "00100",
    ],
};

function buildWordMask(word, rows, cols) {
    if (!word) return null;
    const text = String(word).toUpperCase().replace(/[^A-Z0-9.]/g, "");
    if (!text) return null;
    if (rows < 7) return null;

    const glyphW = 5;
    const gap = 1;
    const totalW = text.length * glyphW + Math.max(0, text.length - 1) * gap;
    const startCol = clamp(Math.floor((cols - totalW) / 2), 0, Math.max(0, cols - totalW));
    const startRow = 0;

    const mask = new Array(rows * cols).fill(false);

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const glyph = FONT_5X7[ch];
        if (!glyph) continue;

        const ox = startCol + i * (glyphW + gap);
        for (let y = 0; y < 7; y++) {
            const rowStr = glyph[y];
            for (let x = 0; x < glyphW; x++) {
                if (rowStr[x] !== "1") continue;
                const col = ox + x;
                const row = startRow + y;
                if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
                mask[row * cols + col] = true;
            }
        }
    }

    return mask;
}

export default function CommitGraphBG({ paused = false, word }) {
    const rootRef = useRef(null);
    const canvasRef = useRef(null);

    // Tailwind-token-derived probes: no hard-coded new palette.
    const bgProbeRef = useRef(null);
    const emptyProbeRef = useRef(null);
    const level1ProbeRef = useRef(null);
    const level2ProbeRef = useRef(null);
    const level3ProbeRef = useRef(null);
    const level4ProbeRef = useRef(null);

    const prefs = useMemo(
        () => ({
            rows: 7,
            cols: 53,
            // animation
            waveSpeed: 0.22,
            fadeAlpha: 0.16,
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
            bg: getProbeColor(bgProbeRef.current, "rgb(0, 0, 0)"),
            empty: getProbeColor(emptyProbeRef.current, "rgb(31, 41, 55)"),
            // Light -> Dark (more contributions = darker green)
            l1: getProbeColor(level1ProbeRef.current, "rgb(110, 231, 183)"),
            l2: getProbeColor(level2ProbeRef.current, "rgb(52, 211, 153)"),
            l3: getProbeColor(level3ProbeRef.current, "rgb(16, 185, 129)"),
            l4: getProbeColor(level4ProbeRef.current, "rgb(4, 120, 87)"),
        };

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            t: 0,
            // layout
            cell: 12,
            gap: 4,
            radius: 3,
            leftPad: 0,
            topPad: 0,
            gridW: 0,
            gridH: 0,
            dotCols: 15,
            dotCell: 12,
            dotGap: 6,
            dotW: 0,
            dotStartX: 0,
            wordMask: null,
        };

        const resize = () => {
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            const rect = root.getBoundingClientRect();
            const width = Math.max(1, Math.floor(rect.width));
            const height = Math.max(1, Math.floor(rect.height));

            const isNarrow = width < 640;
            const isMedium = width < 900;

            state.width = width;
            state.height = height;
            state.dpr = dpr;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Scale cell size with container size.
            // Keep it big on desktop, but avoid cropping on narrow mobile widths.
            const base = isNarrow
                ? clamp(Math.min(width, height) * 0.024, 8, 14)
                : isMedium
                    ? clamp(Math.min(width, height) * 0.026, 10, 18)
                    : clamp(Math.min(width, height) * 0.028, 12, 20);
            // Start from the target size, then shrink until the full grid fits the container.
            let cell = Math.floor(base);
            let gap = clamp(Math.floor(cell * 0.35), isNarrow ? 2 : 3, 6);

            const minPadX = isNarrow ? 8 : 16;
            const maxGridW = Math.max(1, width - minPadX * 2);
            while (cell > 3) {
                const gridW = prefs.cols * cell + (prefs.cols - 1) * gap;
                if (gridW <= maxGridW) break;
                cell -= 1;
                gap = clamp(Math.floor(cell * 0.35), isNarrow ? 1 : 2, 6);
            }

            state.cell = cell;
            state.gap = gap;
            state.radius = clamp(Math.floor(state.cell * 0.28), 2, 5);

            state.gridW = prefs.cols * state.cell + (prefs.cols - 1) * state.gap;
            state.gridH = prefs.rows * state.cell + (prefs.rows - 1) * state.gap;

            // Right-side empty dots region sizing (kept subtle, GitHub-like)
            // Hide on narrow screens to keep the main grid centered and fully visible.
            state.dotCols = isNarrow ? 0 : isMedium ? 8 : 15;
            state.dotCell = Math.max(10, Math.floor(state.cell * 0.92));
            state.dotGap = Math.max(6, Math.floor(state.gap * 1.25));
            state.dotW = state.dotCols > 0 ? state.dotCols * state.dotCell + (state.dotCols - 1) * state.dotGap : 0;

            const spacer = state.dotCols > 0 ? clamp(width * 0.06, 18, 70) : 0;
            const totalW = state.gridW + spacer + state.dotW;

            // Center the whole composition horizontally. If the full composition doesn't fit,
            // prioritize centering the main grid (and let overflow clip gracefully).
            if (totalW + 16 * 2 <= width) {
                state.leftPad = clamp((width - totalW) / 2, 16, Math.max(16, width - totalW - 16));
            } else {
                state.leftPad = Math.max(8, Math.floor((width - state.gridW) / 2));
            }

            // Center vertically with a slight upward bias.
            const minTopPad = isNarrow ? 20 : 64;
            state.topPad = clamp((height - state.gridH) / 2 - height * 0.06, minTopPad, height * 0.32);

            state.dotStartX = state.leftPad + state.gridW + spacer;

            state.wordMask = buildWordMask(word, prefs.rows, prefs.cols);
        };

        const roundedRect = (x, y, w, h, r) => {
            const rr = Math.min(r, w / 2, h / 2);
            ctx.beginPath();
            ctx.moveTo(x + rr, y);
            ctx.lineTo(x + w - rr, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
            ctx.lineTo(x + w, y + h - rr);
            ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
            ctx.lineTo(x + rr, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
            ctx.lineTo(x, y + rr);
            ctx.quadraticCurveTo(x, y, x + rr, y);
            ctx.closePath();
        };

        const drawHeatmap = () => {
            const { rows, cols } = prefs;
            const cell = state.cell;
            const gap = state.gap;

            // soft fade
            ctx.fillStyle = `rgba(0,0,0,${prefs.fadeAlpha})`;
            ctx.fillRect(0, 0, state.width, state.height);

            // subtle vignette to keep hero readable
            const v = ctx.createRadialGradient(state.width * 0.52, state.height * 0.42, 0, state.width * 0.5, state.height * 0.5, Math.max(state.width, state.height) * 0.72);
            v.addColorStop(0, "rgba(0,0,0,0.06)");
            v.addColorStop(1, "rgba(0,0,0,0.86)");
            ctx.fillStyle = v;
            ctx.fillRect(0, 0, state.width, state.height);

            // compute wave (a moving “activity” sweep)
            const wave = (Math.sin(state.t * prefs.waveSpeed) + 1) * 0.5; // 0..1
            const waveCol = Math.floor(wave * (cols + 10)) - 5;

            // left grid
            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    const x = state.leftPad + c * (cell + gap);
                    const y = state.topPad + r * (cell + gap);

                    // base level distribution (mostly empty)
                    const h01 = hash01(c + 13, r + 29);
                    let level = 0;
                    if (h01 > 0.84) level = 1;
                    if (h01 > 0.91) level = 2;
                    if (h01 > 0.955) level = 3;
                    if (h01 > 0.985) level = 4;

                    // wave highlight (creates the “active” pattern like the screenshot)
                    const d = Math.abs(c - waveCol);
                    if (d <= 0) level = Math.max(level, 4);
                    else if (d === 1) level = Math.max(level, 3);
                    else if (d === 2) level = Math.max(level, 2);

                    const isWordCell = state.wordMask ? state.wordMask[r * cols + c] : false;
                    if (isWordCell) level = 4;

                    let fill = colors.empty;
                    if (level === 1) fill = colors.l1;
                    if (level === 2) fill = colors.l2;
                    if (level === 3) fill = colors.l3;
                    if (level === 4) fill = colors.l4;

                    // small shimmer
                    const shimmer = 0.65 + 0.35 * Math.sin(state.t * 1.1 + (c * 0.22 + r * 0.37));
                    const alpha = isWordCell
                        ? 0.95
                        : level === 0
                            ? 0.18
                            : clamp(0.45 + shimmer * 0.35, 0.45, 0.9);

                    // fill
                    roundedRect(x, y, cell, cell, state.radius);
                    ctx.fillStyle = rgbaFromRgb(fill, alpha);
                    ctx.fill();

                    // subtle inner highlight for depth
                    if (level > 0) {
                        roundedRect(x + 1, y + 1, cell - 2, cell - 2, Math.max(1, state.radius - 1));
                        ctx.strokeStyle = rgbaFromRgb(mixRgb(fill, "rgb(255,255,255)", 0.22), 0.18);
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // right “empty dots” region like the screenshot
            const dotCols = state.dotCols;
            const dotRows = rows;
            const dotStartX = state.dotStartX;
            const dotCell = state.dotCell;
            const dotGap = state.dotGap;

            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            for (let c = 0; c < dotCols; c++) {
                for (let r = 0; r < dotRows; r++) {
                    const x = dotStartX + c * (dotCell + dotGap) + dotCell / 2;
                    const y = state.topPad + r * (dotCell + dotGap) + dotCell / 2;

                    // keep it subtle; mostly empty circles
                    const baseA = 0.09 + 0.03 * Math.sin(state.t * 0.6 + c * 0.35 + r * 0.6);
                    ctx.beginPath();
                    const rr = dotCell * 0.45;
                    if (!(rr > 0) || !Number.isFinite(rr)) continue;
                    ctx.arc(x, y, rr, 0, Math.PI * 2);
                    ctx.fillStyle = rgbaFromRgb(colors.empty, baseA);
                    ctx.fill();
                }
            }
            ctx.restore();

            // top fade for readability
            const topFade = ctx.createLinearGradient(0, 0, 0, state.height * 0.36);
            topFade.addColorStop(0, "rgba(0,0,0,0.76)");
            topFade.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = topFade;
            ctx.fillRect(0, 0, state.width, state.height * 0.36);
        };

        let rafId = 0;
        let lastTime = 0;

        const tick = (ts) => {
            if (!lastTime) lastTime = ts;
            const dt = clamp((ts - lastTime) / 1000, 0, 0.05);
            lastTime = ts;

            state.t += dt;
            drawHeatmap();
            rafId = window.requestAnimationFrame(tick);
        };

        resize();

        // first paint
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, state.width, state.height);
        drawHeatmap();

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
    }, [paused, prefs, word]);

    return (
        <div ref={rootRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <span ref={bgProbeRef} className="hidden text-black" />
            <span ref={emptyProbeRef} className="hidden text-slate-800" />
            <span ref={level1ProbeRef} className="hidden text-emerald-300" />
            <span ref={level2ProbeRef} className="hidden text-emerald-400" />
            <span ref={level3ProbeRef} className="hidden text-emerald-500" />
            <span ref={level4ProbeRef} className="hidden text-emerald-800" />
            <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] mix-blend-overlay" />
        </div>
    );
}
