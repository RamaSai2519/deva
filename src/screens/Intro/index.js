import { useState } from "react";
import PeepParent from "../../components/PeepParent";
import GiantPopup from "../../components/Popups/GiantPopup";

const Intro = () => {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <div className="relative">
            <div id="intro" className="min-h-screen flex flex-col items-center justify-between px-4 py-16 sm:py-20">
                {/* Cinematic open section — no box, just breathing space */}
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
                        What is Epoch 4.0?
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-12 sm:mb-14 max-w-3xl leading-relaxed">
                        48 hours where the campus turns into a tech playground.
                    </p>

                    {/* Experience-driven lines — no borders, just text + subtle glow */}
                    <div className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl text-slate-300">
                        <p className="flex items-center justify-center gap-3">
                            <span className="text-blue-400 font-semibold">Learn</span>
                            <span className="text-slate-500">in workshops & hands-on sessions</span>
                        </p>
                        <p className="flex items-center justify-center gap-3">
                            <span className="text-purple-400 font-semibold">Compete</span>
                            <span className="text-slate-500">in coding contests & gaming tournaments</span>
                        </p>
                        <p className="flex items-center justify-center gap-3">
                            <span className="text-pink-400 font-semibold">Build</span>
                            <span className="text-slate-500">ideas into working prototypes</span>
                        </p>
                        <p className="flex items-center justify-center gap-3">
                            <span className="text-sky-400 font-semibold">Play</span>
                            <span className="text-slate-500">explore & earn with Epoch Coins</span>
                        </p>
                    </div>

                    {/* Epoch Coins — one line, not a manual */}
                    <div className="mt-12 sm:mt-16">
                        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-sky-300/80 mb-2">
                            Powered by Epoch Coins
                        </p>
                        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
                            Earn Epoch Coins by participating. Use them to play, explore VR, and unlock experiences across campus.
                        </p>
                    </div>

                    {/* Soft CTA */}
                    <a
                        href="#events"
                        className="mt-8 sm:mt-10 inline-flex items-center gap-2 text-sm sm:text-base text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <span>See what's happening at Epoch</span>
                        <span>→</span>
                    </a>
                </div>

                <PeepParent elementId="intro" onClick={() => setShowPopup(true)}>
                    <div className="flex w-full items-center justify-between gap-3 pr-1">
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-slate-400">Deep dive</span>
                            <span className="text-sm sm:text-base font-semibold text-white">Discover Epoch 4.0</span>
                        </div>
                        <span className="text-xs sm:text-sm text-blue-400 whitespace-nowrap">View details →</span>
                    </div>
                </PeepParent>
                <GiantPopup visible={showPopup} setVisible={setShowPopup}>
                    <div className="max-w-3xl mx-auto py-6 sm:py-10 space-y-4 sm:space-y-6 text-mutedWhite">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            Epoch 4.0 — GitHub Community Tech Fest
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
                            Epoch 4.0 is a two-day technology fest at GITAM University, Bengaluru, organized by the
                            GitHub Community Club in collaboration with DoSL. It brings together developers, designers,
                            gamers, and innovators for hands-on workshops, a GeeksforGeeks coding contest, gaming
                            tournaments, and AI-powered Prompt to Prototype sessions.
                        </p>
                        <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                            Powered by the Epoch Coins system, participants can explore immersive VR booths, arcade
                            games, and experience zones across campus — earning and redeeming coins as they learn,
                            build, and play. It is designed to help students discover new technologies, meet mentors,
                            and experience a vibrant, GitHub-powered tech culture.
                        </p>
                        <div className="pt-4 border-t border-slate-700/50">
                            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-sky-300/80 mb-3">
                                How Epoch Coins Work
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-300">
                                <div>
                                    <p className="font-medium text-white mb-1">Earn</p>
                                    <p>Attend workshops, join events, complete challenges</p>
                                </div>
                                <div>
                                    <p className="font-medium text-white mb-1">Spend</p>
                                    <p>Games, VR booths, activity stalls across campus</p>
                                </div>
                                <div>
                                    <p className="font-medium text-white mb-1">Experience</p>
                                    <p>Fair access, gamified fun, no cash needed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </GiantPopup>
            </div>
            <div className="bg-[linear-gradient(to_bottom,_transparent_0%,_black_100%)] w-full h-20 absolute bottom-0 ring-0 left-0 z-10" />
        </div>
    );
};

export default Intro;
