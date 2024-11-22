import React from 'react';

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
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
            {/* Tagline */}
            <div className="relative mb-8">
                <h2 className="text-[8rem] pl-10 md:text-[10rem] font-bold bg-gradient-to-r from-blue-500 via-green-400 to-purple-600 text-transparent bg-clip-text flex items-center justify-center w-full">
                    EP
                    <span className="inline-flex items-center justify-center w-[4em] h-[4em] md:w-[2.5em] md:h-[2.5em]">
                        <img
                            src="Assets/images/githubLogo.png"
                            alt="GitHub Logo"
                            className="w-full h-full object-contain"
                        />
                    </span>
                    CH
                </h2>
            </div>

            {/* Call-to-Action */}
            <button className="relative bg-black border border-transparent hover:border-transparent hover:text-white rounded-full px-8 py-3 text-lg font-medium transition duration-300 mb-4 hover:bg-gradient-to-r hover:from-blue-500 hover:via-green-400 hover:to-purple-600 group">
                <span className="relative z-10 bg-gradient-to-r from-blue-500 via-green-400 to-purple-600 text-transparent bg-clip-text group-hover:text-white">
                    Join the Epoch
                </span>
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-green-400 to-purple-600 p-[2px]">
                    <div className="h-full w-full bg-black rounded-full group-hover:bg-gradient-to-r from-blue-500 via-green-400 to-purple-600"></div>
                </div>
            </button>

            {/* Additional Info */}
            <p className="text-mutedWhite">
                Tech Fest | 2024 | 18th - 20th December
            </p>
        </div>
    );
};

export default EpochIntro;