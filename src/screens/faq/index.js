import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqItems = [
        {
            question: "What is Epoch Tech Fest?",
            answer: "Epoch Tech Fest is an annual technology festival that showcases the latest in tech innovations and provides a platform for tech enthusiasts to connect and learn."
        },
        {
            question: "When and where is Epoch Tech Fest held?",
            answer: "Epoch Tech Fest is held annually in the month of November at the Tech Convention Center."
        },
        {
            question: "How can I participate in Epoch Tech Fest?",
            answer: "You can participate by registering on our official website. There are various events and workshops you can join."
        },
        {
            question: "Are there any fees to attend Epoch Tech Fest?",
            answer: "Yes, there is a nominal fee for attending the festival. Details about the fee structure can be found on our website."
        },
        {
            question: "Who can I contact for more information?",
            answer: "For more information, you can contact our support team at support@epochtechfest.com."
        }
    ];

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div key={index}>
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full p-4 flex justify-between items-center text-left text-mutedWhite hover:bg-darkBlack transition-colors duration-200"
                        >
                            <span className="font-medium">{item.question}</span>
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
                                    <div className="p-4 text-mutedWhite">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
