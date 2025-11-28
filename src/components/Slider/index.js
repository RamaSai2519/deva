import React from "react";
import useDeviceType from "../../hooks/useDeviceType";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Slider = ({ events, currentSlide, setCurrentSlide }) => {
    const isDesktop = useDeviceType();

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    };

    // Desktop: each slide is 70% width, offset to center active slide
    // Formula: to center slide N, we need offset = (100% - 70%) / 2 - N * 70% = 15% - N * 70%
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
                    className={`border-r flex-shrink-0 px-2 ${currentSlide !== 0 ? "animate-fade-in" : "animate-fade-out"}`}
                    onClick={handlePrev}
                >
                    <LeftOutlined className="text-white" />
                </button>
                <div
                    className="flex justify-start items-center space-x-8 border-b border-mutedWhite max-w-4xl w-full overflow-x-auto scrollbar-hide"
                >
                    <div
                        className="flex transition-transform duration-500 w-full gap-3 sm:gap-5 md:gap-1 px-2"
                        style={{
                            transform: `translateX(-${currentSlide * 80}px)`,
                        }}
                    >
                        {events.map((event, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`text-xs sm:text-sm text-nowrap flex-shrink-0 pb-1 ${currentSlide === index
                                    ? "text-white font-bold border-b"
                                    : "text-mutedWhite hover:text-gray-200"
                                    }`}
                            >
                                {event.title}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    className={`border-l flex-shrink-0 px-2 ${currentSlide !== events.length - 1 ? "animate-fade-in" : "animate-fade-out"}`}
                    onClick={handleNext}
                >
                    <RightOutlined className="text-white" />
                </button>
            </div>

            {/* Description with static background image */}
            <div className="relative mt-10 text-center px-4 min-h-[400px] sm:min-h-[600px] md:min-h-[800px] flex items-start justify-center pt-4">
                <img
                    src="/Assets/images/event_description.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain opacity-70 pointer-events-none"
                />
                <p className="relative z-10 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                    {events[currentSlide]?.description}
                </p>
            </div>
        </div>
    );
};

export default Slider;