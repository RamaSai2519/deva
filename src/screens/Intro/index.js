import React from 'react';

const EpochIntro = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                GitHub Community
            </h1>

            {/* Tagline */}
            <div className="relative mb-8">
                <h2 className="text-[8rem] md:text-[10rem] font-bold bg-gradient-to-r from-blue-500 via-green-400 to-purple-600 text-transparent bg-clip-text flex items-center justify-center w-full">
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
                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-green-400/10 to-purple-600/10 blur-2xl -z-10" />
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

export default EpochIntro;