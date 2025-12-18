import CommitGraphBG from "../../components/Backgrounds/CommitGraph";

const CommitGraphSection = () => {
    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative w-full min-h-[52vh] flex items-center justify-center">
                <div className="pointer-events-none absolute inset-0 opacity-[0.9]" aria-hidden="true">
                    <CommitGraphBG paused={false} />
                </div>

                <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center text-center px-6">
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">
                        GitHub Contribution Graph
                    </p>
                    <h2 className="mt-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white">
                        EPOCH
                    </h2>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_bottom,_transparent_0%,_black_100%)]" />
            </div>
        </section>
    );
};

export default CommitGraphSection;
