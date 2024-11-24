import React, { useState, useRef, useEffect } from "react";
import events from "./events.json";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Events = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const buttonRefs = useRef([]);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        if (buttonRefs.current[currentSlide]) {
            buttonRefs.current[currentSlide].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }, [currentSlide]);

    return (
        <section className="bg-black text-white min-h-screen">
            {/* Header Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto text-left mb-12">
                    <h2 className="text-xl text-gray-400 mb-2 uppercase tracking-wide">MACOS</h2>
                    <h1 className="text-5xl font-extrabold mb-6">Sharp as a Mac.</h1>
                    <p className="text-lg text-gray-400 mb-4">
                        Tens of thousands of apps are optimized to unlock.
                    </p>
                    <a href="#intro" className="text-blue-500 hover:underline">
                        Learn more about macOS
                    </a>
                </div>
            </div>

            {/* Slider Section */}
            <div className="relative">
                <div className="overflow-hidden relative">
                    <div
                        id="slider"
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(${25 - currentSlide * 50}%)` }}
                    >
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className={`min-w-[50%] flex-shrink-0 transform ${currentSlide === index ? "scale-100" : "scale-90 opacity-50"} transition-transform duration-500`}
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
                        className={`border-r ${currentSlide !== 0 ? 'animate-fade-in' : 'animate-fade-out'}`}
                        onClick={handlePrev}
                    >
                        <LeftOutlined className="text-white" />
                    </button>
                    <div className="flex justify-start items-center space-x-8 border-b border-mutedWhite max-w-4xl w-full overflow-x-hidden">
                        {events.map((event, index) => (
                            <button
                                key={index}
                                ref={(el) => (buttonRefs.current[index] = el)}
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
                    <button
                        className={`border-l ${currentSlide !== events.length - 1 ? 'animate-fade-in' : 'animate-fade-out'}`}
                        onClick={handleNext}
                    >
                        <RightOutlined className="text-white" />
                    </button>
                </div>

                {/* Dynamic Description */}
                <div className="mt-4 text-center mb-10">
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        {events[currentSlide]?.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Events;