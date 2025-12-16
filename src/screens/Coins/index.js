const Coins = () => {
    return (
        <section id="coins" className="bg-black py-10 sm:py-12 px-4">
            <div className="max-w-5xl mx-auto rounded-2xl border border-sky-500/20 bg-gradient-to-r from-sky-950/60 via-black to-purple-950/40 px-5 sm:px-8 py-6 sm:py-8 flex flex-col gap-4 sm:gap-5">
                <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-sky-300/90 mb-1">
                    Epoch Coins System
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                    One digital currency for the entire fest.
                </h2>
                <p className="text-sm sm:text-base text-slate-200 max-w-3xl">
                    Every participant gets Epoch Coins added to their event account. Use them to explore games, VR booths,
                    and experience stalls across campus134 and earn more coins back by joining workshops, talks, and flagship events.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-sm text-slate-100">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">Play</span>
                        <p className="text-slate-200">
                            Redeem coins at arcade games, mini challenges, VR zones, and fun activity stalls.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">Learn</span>
                        <p className="text-slate-200">
                            Earn bonus coins by attending approved tech workshops, expert talks, and hands-on sessions.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">Recharge</span>
                        <p className="text-slate-200">
                            Top up at recharge stations by completing quick activities and campus challenges.
                        </p>
                    </div>
                </div>

                <div className="pt-1">
                    <a
                        href="#faq"
                        className="inline-flex items-center text-xs sm:text-sm font-medium text-sky-300 hover:text-sky-100 transition-colors"
                    >
                        <span className="mr-1">How Epoch Coins work</span>
                        <span className="text-base sm:text-lg">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Coins;
