import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import faqData from "./faq.json";
import peepParentData from "./peepParent.json";
import PeepParent from "../../components/PeepParent";
import GiantPopup from "../../components/Popups/GiantPopup";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div id="faq" className="min-h-screen bg-black p-4 sm:p-8 flex flex-col items-center justify-between">
            <div className="w-full max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">FAQs</h1>
                <div className="space-y-3 sm:space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index}>
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full p-3 sm:p-4 flex justify-between items-center text-left text-mutedWhite hover:bg-darkBlack transition-colors duration-200"
                            >
                                <span className="font-medium text-sm sm:text-base pr-2">{item.question}</span>
                                <motion.span
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="transform"
                                >
                                    <svg
                                        className="w-5 h-5 text-mutedWhite"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </motion.span>
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
                {peepParentData.peepParent.popupContent}
            </GiantPopup>
        </div>
    );
};

export default FAQ;
