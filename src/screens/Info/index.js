import React, { useState, useEffect } from 'react';

const GraphicsWorkflow = () => {
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
        <div className="relative min-h-screen bg-lightBlack">
            <div className="text-white text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Time Until Epoch 3.0</h2>
                <div className="flex justify-center gap-4">
                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-[1px] rounded-lg">
                        <div className="bg-black p-4 rounded-lg">
                            <span className="text-3xl">{timeLeft.days}</span>
                            <p>Days</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-[1px] rounded-lg">
                        <div className="bg-black p-4 rounded-lg">
                            <span className="text-3xl">{timeLeft.hours}</span>
                            <p>Hours</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-[1px] rounded-lg">
                        <div className="bg-black p-4 rounded-lg">
                            <span className="text-3xl">{timeLeft.minutes}</span>
                            <p>Minutes</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-[1px] rounded-lg">
                        <div className="bg-black p-4 rounded-lg">
                            <span className="text-3xl">{timeLeft.seconds}</span>
                            <p>Seconds</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-8">
                <div className="flex-1">
                    <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 p-[1px]">
                        <div className="w-full bg-black/90 rounded-2xl p-8">
                            <h3 className="text-white text-xl font-bold mb-4">Events</h3>
                            <p className="text-white/90 text-lg leading-relaxed">
                                • Workshops<br />
                                • Hackathons<br />
                                • Tech Talks<br />
                                • Booths
                            </p>
                        </div>
                        <div className="absolute inset-0 -z-10 rounded-2xl blur-[30px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 p-[1px]">
                        <div className="w-full bg-black/90 rounded-2xl p-8">
                            <p className="text-white/90 text-lg leading-relaxed">
                                Epoch 3.0 is GITAM University Bengaluru's premier tech fest, organized by the GitHub Community Club. It's a dynamic platform that brings together students, developers, and tech enthusiasts to celebrate technology, innovation, and collaboration.
                            </p>
                        </div>
                        <div className="absolute inset-0 -z-10 rounded-2xl blur-[30px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 p-[1px]">
                        <div className="w-full bg-black/90 rounded-2xl p-8">
                            <h3 className="text-white text-xl font-bold mb-4">Prizes</h3>
                            <p className="text-white/90 text-lg leading-relaxed">
                                • Cash Prizes<br />
                                • Vouchers<br />
                                • Certificates<br />
                                • Swag Kits
                            </p>
                        </div>
                        <div className="absolute inset-0 -z-10 rounded-2xl blur-[30px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
                    </div>
                </div>
            </div>
            <div className={`bg-[linear-gradient(to_bottom,_transparent_0%,_black)] w-full h-20 absolute bottom-0 z-10`} />
        </div>
    );
};

export default GraphicsWorkflow;