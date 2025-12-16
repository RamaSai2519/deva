const Coins = () => {
    return (
        <section id="coins" className="bg-black py-10 sm:py-16 px-4">
            <div className="max-w-6xl mx-auto rounded-2xl border border-white/5 bg-gradient-to-r from-slate-900/70 via-black to-slate-900/60 px-5 sm:px-10 py-6 sm:py-10 flex flex-col gap-5 sm:gap-6">
                <div>
                    <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-sky-300/90 mb-1">
                        Powered by GitHub Community
                    </p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2">
                        A unified digital reward system that turns participation into experience.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-200 max-w-3xl">
                        Epoch Coins are the official digital participation currency of Epoch 4.0, credited to your event account and used across interactive zones throughout the fest.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-sm text-slate-100">
                    {/* subtle dashed connector line on desktop */}
                    <div className="hidden sm:block absolute top-6 left-[16%] right-[16%] border-t border-dashed border-slate-600/60 pointer-events-none" />

                    <div className="relative flex flex-col gap-2 bg-white/5 border border-white/5 rounded-xl p-4 sm:p-5 hover:border-sky-400/60 hover:bg-white/10 transition duration-300">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🪙</span>
                            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-300">What are Epoch Coins?</span>
                        </div>
                        <p className="text-slate-100 text-xs sm:text-sm">
                            Epoch Coins are the official digital participation currency of Epoch 4.0.
                        </p>
                        <p className="text-slate-300 text-xs sm:text-sm">
                            Every registered participant receives a set of coins that can be used across interactive zones throughout the fest.
                        </p>
                        <p className="text-slate-400 text-[11px] sm:text-xs mt-1">No cash. No confusion. Just experiences.</p>
                    </div>

                    <div className="relative flex flex-col gap-2 bg-white/5 border border-white/5 rounded-xl p-4 sm:p-5 hover:border-emerald-400/60 hover:bg-white/10 transition duration-300">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🎯</span>
                            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-300">How do you earn?</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-100">
                            <li>Attending workshops & hands-on sessions</li>
                            <li>Participating in flagship events & competitions</li>
                            <li>Completing mini challenges at designated zones</li>
                        </ul>
                        <p className="text-slate-300 text-[11px] sm:text-xs mt-1">
                            The system encourages students to learn, engage, and explore more.
                        </p>
                    </div>

                    <div className="relative flex flex-col gap-2 bg-white/5 border border-white/5 rounded-xl p-4 sm:p-5 hover:border-violet-400/60 hover:bg-white/10 transition duration-300">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🎮</span>
                            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-300">Where can you use them?</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-100">
                            <li>Gaming & fun zones</li>
                            <li>VR & immersive experience booths</li>
                            <li>Activity & engagement stalls</li>
                        </ul>
                        <p className="text-slate-300 text-[11px] sm:text-xs mt-1">
                            Coins ensure fair access, smooth flow, and a gamified fest experience.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)] gap-4 items-start text-xs sm:text-sm text-slate-100 pt-1 sm:pt-2">
                    <div className="bg-white/5 border border-dashed border-slate-500/60 rounded-xl p-4 sm:p-5">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">🔁</span>
                            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-300">Run out of Coins? No problem.</span>
                        </div>
                        <p className="text-slate-200 text-xs sm:text-sm mb-1">
                            Participants can recharge their experience by:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-100">
                            <li>Playing quick mini-games at recharge counters</li>
                            <li>Attending select learning sessions for bonus coins</li>
                        </ul>
                        <p className="text-slate-300 text-[11px] sm:text-xs mt-1">Learn more. Play more. Experience more.</p>
                    </div>
                    <p className="text-slate-200 text-xs sm:text-sm md:text-base md:text-right">
                        <span className="font-semibold text-white">Epoch Coins turn learning into play</span>
                        <span> — and participation into experience.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Coins;
