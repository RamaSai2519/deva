import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import faqData from "./faq.json";
import peepParentData from "./peepParent.json";
import PeepParent from "../../components/PeepParent";
import GiantPopup from "../../components/Popups/GiantPopup";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0); // First FAQ open by default
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div id="faq" className="bg-black p-8 flex flex-col items-center justify-between">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">FAQs</h1>
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index}>
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`w-full p-4 flex justify-between items-center text-left hover:bg-darkBlack transition-colors duration-200 ${activeIndex === index ? 'bg-darkBlack' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${activeIndex === index ? 'bg-blue-500/20 text-blue-400' : 'bg-lightBlack text-mutedWhite'
                                        }`}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.657-1.5 2.25-1.5 2.25M12 16h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                                            />
                                        </svg>
                                    </div>
                                    <span className={`text-base transition-colors ${activeIndex === index ? 'font-semibold text-white' : 'font-medium text-mutedWhite'
                                        }`}>
                                        {item.question}
                                    </span>
                                </div>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`flex items-center justify-center w-6 h-6 transition-colors ${activeIndex === index ? 'text-blue-400' : 'text-mutedWhite'
                                        }`}
                                >
                                    {activeIndex === index ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    )}
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="p-4 text-mutedWhite bg-lightBlack">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
            <PeepParent elementId="faq" onClick={() => setShowPopup(true)}>
                <div className="flex w-full justify-center items-center">
                    <h2>{peepParentData.peepParent.text}</h2>
                </div>
            </PeepParent>
            <GiantPopup visible={showPopup} setVisible={setShowPopup}>
                <div className="max-w-3xl mx-auto py-6 sm:py-10 space-y-5 text-mutedWhite">
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">
                        Epoch Coins System
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        Play, learn, and explore with one digital currency.
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
                        Epoch Coins are the official digital currency of Epoch 4.0. Every registered participant gets
                        coins added to their event account, which they can use to explore different zones across the
                        fest — from games and VR experiences to creative activity stalls.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-slate-200">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-white">Where you can use Epoch Coins</h3>
                            <ul className="list-disc list-inside space-y-1 text-slate-300">
                                <li>Game Zones – arcade games, mini challenges, and competitive activities.</li>
                                <li>VR Booths – immersive simulations and interactive experiences.</li>
                                <li>Fun & Activity Zones – experience-based stalls across the campus.</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-white">How to earn more coins</h3>
                            <ul className="list-disc list-inside space-y-1 text-slate-300">
                                <li>Recharge Stations – complete quick on-ground challenges.</li>
                                <li>Workshops & Sessions – attend approved talks and hands-on labs.</li>
                                <li>Flagship Events – earn bonuses through contests and tournaments.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm sm:text-base text-slate-300">
                        <h3 className="font-semibold text-white">Why Epoch Coins?</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Encourages you to explore the entire fest, not just one zone.</li>
                            <li>Rewards learning – workshops and sessions help you recharge.</li>
                            <li>Keeps busy zones fair and manageable for everyone.</li>
                            <li>Makes the whole experience feel like a gamified campus adventure.</li>
                        </ul>
                    </div>
                </div>
            </GiantPopup>
        </div>
    );
};

export default FAQ;
