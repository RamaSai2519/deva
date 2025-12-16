import { useState } from "react";
import GlowDiv from "../../components/GlowDiv";
import PeepParent from "../../components/PeepParent";
import GiantPopup from "../../components/Popups/GiantPopup";

const Intro = () => {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <div className="relative">
            <div id="intro" className="min-h-screen flex flex-col items-center justify-between p-2">
                <GlowDiv>
                    <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-blue-400 uppercase text-center mb-2">
                        Epoch Tech Fest
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 text-center">
                        What is Epoch 4.0?
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-white/80 text-center max-w-2xl">
                        A 48-hour celebration of technology, innovation, and collaboration at GITAM Bengaluru —
                        powered by workshops, contests, gaming tournaments, and the Epoch Coins experience zones.
                    </p>
                </GlowDiv>
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
                    </div>
                </GiantPopup>
            </div>
            <div className="bg-[linear-gradient(to_bottom,_transparent_0%,_black_100%)] w-full h-20 absolute bottom-0 ring-0 left-0 z-10" />
        </div>
    );
};

export default Intro;
