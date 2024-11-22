import React from "react";

const NeonText = ({ text, color1, color2, color3 }) => (
    <span className="relative">
        <span className={`absolute inset-0 blur-[25px] text-${color1} opacity-70 z-[1]`}>
            {text}
        </span>
        <span className={`absolute inset-0 blur-[15px] text-${color2} opacity-80 z-[2]`}>
            {text}
        </span>
        <span className={`relative text-${color3} z-[3]`}>{text}</span>
    </span>
);

const NeonImage = ({ src, alt }) => (
    <span className="inline-flex items-center justify-center w-[1em] h-[1em] relative">
        <span className="absolute inset-0 blur-[25px] opacity-70 z-[1]">
            <img src={src} alt="" className="w-full h-full object-contain" />
        </span>
        <span className="absolute inset-0 blur-[15px] opacity-80 z-[2]">
            <img src={src} alt="" className="w-full h-full object-contain" />
        </span>
        <img src={src} alt={alt} className="w-full h-full object-contain relative z-[3]" />
    </span>
);

const EpochIntro = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
            {/* Tagline */}
            <div className="relative mb-8">
                <h2 className="text-[8rem] md:text-[10rem] font-bold flex items-center justify-center w-full relative">
                    {/* Base text layer with neon glow */}
                    <NeonText text="EP" color1="blue-400" color2="blue-300" color3="blue-100" />
                    <NeonImage src="Assets/images/githubLogo.png" alt="GitHub Logo" />
                    <NeonText text="CH" color1="purple-400" color2="purple-300" color3="purple-100" />
                </h2>
            </div>

            {/* Call-to-Action */}
            <button className="bg-gradient-to-r from-blue-500 via-green-400 to-purple-600 hover:from-blue-600 hover:via-green-500 hover:to-purple-700 text-white rounded-full px-8 py-3 text-lg font-medium transition duration-300 mb-4">
                Join the Epoch
            </button>

            {/* Additional Info */}
            <p className="text-gray-400">
                Tech Fest | 2024 | 18th - 20th December
            </p>
        </div>
    );
};

export default Intro;