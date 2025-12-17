import { useState } from "react";
import events from "./events.json";
import Slider from "../../components/Slider";
import useDeviceType from "../../hooks/useDeviceType";

const Events = () => {
    const isDesktop = useDeviceType();
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <section className="bg-black text-white min-h-screen w-full pt-16 md:pt-px relative" id="events">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto text-left">
                    <h2 className="text-xl text-gray-400 mb-2 uppercase tracking-wide">GITAM</h2>
                    <h1 className="text-5xl font-extrabold mb-6">Epoch 4.0</h1>
                    <p className="text-lg text-gray-400">
                        Celebration of technology, innovation, and creativity.
                    </p>
                    <a href="#intro" className="text-blue-500 hover:underline">
                        Know More about Epoch 4.0
                    </a>
                    <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-slate-400 uppercase mt-6">
                        Inside Epoch 4.0
                    </p>
                    <p className="text-sm sm:text-base text-slate-300 max-w-xl">
                        Learn, compete, and explore through coding contests, workshops, gaming tournaments, and VR experiences.
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mb-9">
                <Slider events={events} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
            </div>
            {!isDesktop && <div className="pointer-events-none bg-[linear-gradient(to_bottom,_transparent_0%,_#141414_100%)] w-full h-14 absolute bottom-0 ring-0 left-0 z-0" />}
        </section>
    );
};

export default Events;
