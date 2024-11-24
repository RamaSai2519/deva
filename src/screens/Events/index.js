import React, { useState } from "react";
import events from "./events.json";
import Slider from "../../components/Slider";

const Events = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

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
            <Slider events={events} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        </section>
    );
};

export default Events;