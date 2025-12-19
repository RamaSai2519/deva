import React, { useState } from "react";
import useDeviceType from "../../hooks/useDeviceType";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import GiantPopup from "../Popups/GiantPopup";

const Slider = ({ events, currentSlide, setCurrentSlide }) => {
    const isDesktop = useDeviceType();
    const [showPopup, setShowPopup] = useState(false);
    const [activeEvent, setActiveEvent] = useState(null);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    };

    const translateX = isDesktop
        ? `translateX(calc(15% - ${currentSlide * 70}%))`
        : `translateX(-${currentSlide * 100}%)`;

    return (
        <div className="relative">
            <div className="overflow-hidden relative">
                <div
                    id="slider"
                    className="flex transition-transform duration-500 ease-in-out items-center"
                    style={{ transform: translateX }}
                >
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className={`${isDesktop ? "min-w-[70%]" : "w-full"} flex-shrink-0 transition-all duration-500 px-2`}
                            style={{
                                transform: currentSlide === index ? 'scale(1)' : 'scale(0.85)',
                                opacity: currentSlide === index ? 1 : 0.4,
                            }}
                        >
                            <div className="relative w-full">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-auto max-h-[50vh] object-contain rounded-xl shadow-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Scroller */}
            <div className="flex justify-center items-center pt-8 w-full">
                <button
                    className={`border-r ${currentSlide !== 0 ? "animate-fade-in" : "animate-fade-out"}`}
                    onClick={handlePrev}
                >
                    <LeftOutlined className="text-white" />
                </button>
                <div
                    className="flex justify-start items-center space-x-8 border-b border-mutedWhite max-w-4xl w-full overflow-hidden"
                >
                    <div
                        className="flex transition-transform duration-500 w-full gap-5 md:gap-1"
                        style={{
                            transform: `translateX(-${currentSlide * 100}px)`,
                        }}
                    >
                        {events.map((event, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`text-sm text-nowrap w-full pb-1 transition-all duration-300 ${currentSlide === index
                                    ? "text-white font-bold border-b-2 border-blue-400 shadow-[0_2px_8px_rgba(59,130,246,0.4)]"
                                    : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                {event.title}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    className={`border-l ${currentSlide !== events.length - 1 ? "animate-fade-in" : "animate-fade-out"}`}
                    onClick={handleNext}
                >
                    <RightOutlined className="text-white" />
                </button>
            </div>

            {/* Event meta: title, outcome, micro CTA */}
            <div className="relative mt-4 px-4">
                <div className="relative z-10 max-w-3xl mx-auto text-center sm:text-left">
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-slate-400 mb-1">
                        Featured Event
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2 sm:mb-3">
                        {events[currentSlide]?.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-2">
                        {events[currentSlide]?.description}
                    </p>
                    <p className="text-xs sm:text-sm text-sky-300/80 mb-3 sm:mb-4">
                        Earn Epoch Coins by participating in this event.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setActiveEvent(events[currentSlide]);
                            setShowPopup(true);
                        }}
                        className="md:mb-10 mb-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-lightBlack/80 border border-blue-400/30 hover:border-blue-400/50 hover:bg-lightBlack transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50"
                        aria-label="Explore this event details"
                    >
                        <span>Explore this event</span>
                        <span className="text-base sm:text-lg" aria-hidden="true">→</span>
                    </button>
                </div>
            </div>

            <GiantPopup visible={showPopup} setVisible={setShowPopup}>
                {activeEvent && (
                    <div className="max-w-3xl mx-auto py-6 sm:py-10 space-y-4 sm:space-y-6 text-mutedWhite">
                        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-slate-400">
                            Event spotlight
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                            {activeEvent.title}
                        </h2>
                        {activeEvent.tagline && (
                            <p className="text-xs sm:text-sm md:text-base text-sky-300/90">
                                {activeEvent.tagline}
                            </p>
                        )}
                        <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
                            {activeEvent.longDescription || activeEvent.description}
                        </p>
                        {Array.isArray(activeEvent.highlights) && activeEvent.highlights.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-[0.16em]">
                                    What to expect
                                </p>
                                <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-slate-200 space-y-1.5">
                                    {activeEvent.highlights.map((point, index) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <p className="text-xs sm:text-sm text-slate-400">
                            Part of Epoch 4.0 at GITAM University, Bengaluru.
                        </p>
                        {activeEvent.registrationUrl && (
                            <div className="pt-2">
                                <a
                                    href={activeEvent.registrationUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-400 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.6)] transition-colors"
                                >
                                    <span>Register now on Luma</span>
                                    <span className="ml-2 text-base">↗</span>
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </GiantPopup>
        </div>
    );
};

export default Slider;