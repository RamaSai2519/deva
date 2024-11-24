import React, { useState } from "react";
import events from "./events.json";

const Events = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="bg-black text-white min-h-screen">
            {/* Header Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-left mb-12">
                    <h2 className="text-xl text-gray-400 mb-2 uppercase tracking-wide">MACOS</h2>
                    <h1 className="text-5xl font-extrabold mb-6">Sharp as a Mac.</h1>
                    <p className="text-lg text-gray-400 mb-4">
                        Tens of thousands of apps are optimized to unlock the full
                        capabilities of macOS — from your go-to productivity apps to your
                        favorite games and hardcore working pro apps. And with the M1
                        family of chips, these apps just soar.
                    </p>
                    <a href="#intro" className="text-blue-500 hover:underline">
                        Learn more about macOS
                    </a>
                </div>
            </div>

            {/* Slider Section */}
            <div className="relative container mx-auto px-4 mb-10">
                <div className="overflow-hidden relative">
                    <div
                        id="slider"
                        className="flex transition-transform duration-500 ease-in-out items-center justify-center"
                        style={{ transform: `translateX(-${currentSlide * 80}%)`, gap: "20px" }}
                    >
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className={`min-w-[80%] flex-shrink-0 transform ${currentSlide === index ? "scale-100" : "scale-90 opacity-50"} transition-transform duration-500`}
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

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Category Scroller */}
                <div className="flex justify-center mt-8 space-x-8">
                    {events.map((event, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`uppercase text-sm ${currentSlide === index
                                    ? "text-white font-bold"
                                    : "text-gray-400 hover:text-gray-200"
                                }`}
                        >
                            {event.title}
                        </button>
                    ))}
                </div>

                {/* Dynamic Description */}
                <div className="mt-4 text-center">
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        {events[currentSlide]?.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Events;