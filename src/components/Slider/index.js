import { useState, useEffect, useRef } from "react";
import useDeviceType from "../../hooks/useDeviceType";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import GiantPopup from "../Popups/GiantPopup";

const Slider = ({ events, currentSlide, setCurrentSlide }) => {
    const isDesktop = useDeviceType();
    const [showPopup, setShowPopup] = useState(false);
    const [activeEvent, setActiveEvent] = useState(null);
    const [isInView, setIsInView] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    };

    // Intersection Observer to detect when slider comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        const currentSlider = sliderRef.current;
        if (currentSlider) observer.observe(currentSlider);

        return () => {
            if (currentSlider) observer.unobserve(currentSlider)
        };
    }, []);

    // Auto-slideshow effect
    useEffect(() => {
        if (!isInView || isPaused) return;

        const interval = setInterval(() => {
            handleNext();
        }, 3500);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView, isPaused, currentSlide]);

    // Gesture control handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        setIsPaused(true);
    };

    const handleTouchMove = (e) => touchEndX.current = e.touches[0].clientX;

    const handleTouchEnd = () => {
        const minSwipeDistance = 50;
        const swipeDistance = touchStartX.current - touchEndX.current;

        if (swipeDistance > minSwipeDistance) {
            handleNext();
        } else if (swipeDistance < -minSwipeDistance) {
            handlePrev();
        }
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    const translateX = isDesktop
        ? `translateX(calc(15% - ${currentSlide * 70}%))`
        : `translateX(-${currentSlide * 100}%)`;

    return (
        <div
            ref={sliderRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="overflow-hidden relative">
                <div
                    id="slider"
                    className="flex transition-transform duration-500 ease-in-out items-center"
                    style={{ transform: translateX }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
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
                                    width={1200}
                                    height={630}
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
                    className={`border-r px-3 py-2 ${currentSlide !== 0 ? "animate-fade-in" : "animate-fade-out"}`}
                    onClick={handlePrev}
                    aria-label="Previous event"
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
                                    : "text-slate-400 hover:text-slate-200"
                                    }`}
                            >
                                {event.title}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    className={`border-l px-3 py-2 ${currentSlide !== events.length - 1 ? "animate-fade-in" : "animate-fade-out"}`}
                    onClick={handleNext}
                    aria-label="Next event"
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
                    <div className="flex gap-3 flex-wrap md:mb-10 mb-6">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveEvent(events[currentSlide]);
                                setShowPopup(true);
                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-lightBlack/80 border border-blue-400/30 hover:border-blue-400/50 hover:bg-lightBlack transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50"
                            aria-label="Explore this event details"
                        >
                            <span>Explore this event</span>
                            <span className="text-base sm:text-lg" aria-hidden="true">→</span>
                        </button>
                        {events[currentSlide]?.registrationUrl && (
                            <a
                                href={events[currentSlide].registrationUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-blue-500/90 hover:bg-blue-500 border border-blue-400/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50"
                                aria-label="Register for this event"
                            >
                                <span>Register now</span>
                                <span className="text-base sm:text-lg" aria-hidden="true">↗</span>
                            </a>
                        )}
                    </div>
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
                                    <span>Register now </span>
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