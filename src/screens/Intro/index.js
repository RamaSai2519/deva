import React from "react";

const Intro = () => {
    return (
        <div className="min-h-screen bg-black p-8 flex justify-center items-center">
            <div className="relative h-[calc(100vh-4rem)] max-w-full w-full">
                <div className="absolute inset-0 rounded-[28px] bg-gray-800"></div>
                <div className="absolute inset-[4px] rounded-[26px] bg-black shadow-[0_0_30px_15px_rgba(0,204,255,0.4),0_0_50px_30px_rgba(128,0,255,0.3)]">
                    <div className="relative h-full w-full rounded-[24px] bg-black flex items-center justify-center">
                        <h1 className="text-white text-center text-2xl font-semibold">
                            Glowing Inner Border
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
