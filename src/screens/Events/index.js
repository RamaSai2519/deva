import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Slider from "../../components/Slider";
import events from "./events.json";

const Events = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: () => setCurrentSlide((prev) => (prev + 1) % events.length),
        onSwipedRight: () => setCurrentSlide((prev) => (prev - 1 + events.length) % events.length),
        trackMouse: true,
    });

    return (
        <section className="bg-black text-white min-h-screen flex-col items-center justify-center h-full">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto text-left mb-12">
                    <h2 className="text-xl text-gray-400 mb-2 uppercase tracking-wide">GITAM</h2>
                    <h1 className="text-5xl font-extrabold mb-6">Epoch 3.0</h1>
                    <p className="text-lg text-gray-400 mb-4">
                        Celebration of technology, innovation, and creativity.
                    </p>
                    <a href="#intro" className="text-blue-500 hover:underline">
                        Know More about Epoch 3.0
                    </a>
                </div>
            </div>
            <div {...handlers}>
                <Slider events={events} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
            </div>
        </section>
    );
};

export default Events;
