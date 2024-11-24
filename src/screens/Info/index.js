'use client'

import React, { useState, useEffect } from 'react';

const TimeUnit = ({ value, label }) => (
    <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-black rounded-lg flex flex-col items-center p-3 sm:p-4 md:p-6">
            <span className="text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[80px] font-bold text-white mb-1 sm:mb-2">
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-blue-500 uppercase tracking-wider text-[10px] sm:text-xs md:text-sm font-medium">
                {label}
            </span>
        </div>
    </div>
);

const Separator = () => (
    <div className="flex items-center justify-center">
        <span className="text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[60px] text-white/50 -mt-4 sm:-mt-6 md:-mt-8">:</span>
    </div>
);

const Info = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date('2024-12-18') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="bg-black">
            <div className="w-full min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <Separator />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <Separator />
                    <TimeUnit value={timeLeft.minutes} label="Minutes" />
                    <Separator />
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full bg-black py-16 px-8">
                <div className="max-w-6xl mx-auto">
                    <p className="text-2xl text-gray-400 mb-16">
                        <span className="text-white font-medium">Epoch 3.0</span> is GITAM University Bengaluru's premier tech fest
                        — organized by the GitHub Community Club — bringing together over 1000+ participants for
                        48 hours of innovation, learning, and collaboration.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8" />
                            <p className="text-gray-400 text-lg mb-2">Up to</p>
                            <h2 className="text-white text-7xl font-medium mb-4">48 hours</h2>
                            <p className="text-gray-500 text-lg">of non-stop coding</p>
                        </div>

                        <div>
                            <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8" />
                            <p className="text-gray-400 text-lg mb-2">Over</p>
                            <h2 className="text-white text-7xl font-medium mb-4">₹1L+</h2>
                            <p className="text-gray-500 text-lg">in prizes and rewards</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;