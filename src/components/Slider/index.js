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

    const translateX = isDesktop ? `translateX(${25 - currentSlide * 50}%)` : `translateX(-${currentSlide * 100}%)`;

    return (
        <div className="relative">
            <div className="overflow-hidden relative">
                <div
                    id="slider"
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: translateX }}
                >
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className={`${isDesktop ? "min-w-[50%]" : "w-full"} flex-shrink-0 transform ${currentSlide === index ? "scale-100" : "scale-90 opacity-50"} transition-transform duration-500`}
                        >
                            <div className="relative w-full">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-auto rounded-lg shadow-lg"
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
                                className={`text-sm text-nowrap w-full pb-1 ${currentSlide === index
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
                    className={`border-l ${currentSlide !== events.length - 1 ? "animate-fade-in" : "animate-fade-out"}`}
                    onClick={handleNext}
                >
                    <RightOutlined className="text-white" />
                </button>
            </div>

            <div className="mt-4 text-center">
                <p className="text-gray-300 max-w-2xl mx-auto">
                    {events[currentSlide]?.description}
                </p>
            </div>
        </div>
    );
};

export default Slider;