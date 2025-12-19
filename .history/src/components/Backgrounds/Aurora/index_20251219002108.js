import { useEffect, useState } from "react";

export default function AuroraBG({ paused = false }) {
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduceMotion(mediaQuery.matches);
        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    const shouldAnimate = !(paused || reduceMotion);

    return (
        <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2),transparent_60%)]" />

            <div
                className={[
                    "absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full",
                    "bg-blue-500/20 blur-3xl",
                    shouldAnimate ? "animate-[pulse_10s_ease-in-out_infinite]" : "",
                ].join(" ")}
            />
            <div
                className={[
                    "absolute -bottom-44 -right-40 h-[560px] w-[560px] rounded-full",
                    "bg-purple-500/20 blur-3xl",
                    shouldAnimate ? "animate-[pulse_12s_ease-in-out_infinite]" : "",
                ].join(" ")}
            />

            <div
                className={[
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "h-[520px] w-[900px] rounded-full blur-3xl",
                    "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10",
                    shouldAnimate ? "animate-[pulse_9s_ease-in-out_infinite]" : "",
                ].join(" ")}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.10),transparent_55%)]" />

            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
}
