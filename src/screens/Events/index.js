import React from "react";
import events from './events.json';

const Events = () => {
    return (
        <section className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-left mb-12">
                    <h2 className="text-2xl mb-2">MACOS</h2>
                    <h1 className="text-6xl font-bold mb-6">Sharp as a Mac.</h1>
                    <p className="text-lg text-gray-400 mb-4">
                        Tens of thousands of apps are optimized to unlock the full
                        capabilities of macOS — from your go-to productivity apps to your
                        favorite games and hardcore working pro apps. And with the M1
                        family of chips, these apps just race.
                    </p>
                    <p href="#" className="text-blue-500 hover:underline">
                        Learn more about macOS
                    </p>
                </div>
            </div>
            <div>
                {/* Slider for events Component, event schema: {title, description, image(url)} */}
            </div>

        </section>
    )
}

export default Events;