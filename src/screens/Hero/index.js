'use client'
import React from 'react';

const Hero = () => {
    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
            <div className="relative mb-8">
                <h2 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold flex items-center justify-center w-full px-4 sm:px-8">
                    <div className="flex items-center space-x-2 sm:space-x-4"></div>
                    {/* E */}
                    <span className="relative inline-block">
                        <span className="absolute inset-0 blur-[20px] text-blue-400 opacity-70">E</span>
                        <span className="absolute inset-0 blur-[10px] text-blue-300 opacity-80">E</span>
                        <span className="relative text-white">E</span>
                    </span>
                    {/* P */}
                    <span className="relative inline-block">
                        <span className="absolute inset-0 blur-[20px] text-blue-400 opacity-70">P</span>
                        <span className="absolute inset-0 blur-[10px] text-blue-300 opacity-80">P</span>
                        <span className="relative text-white">P</span>
                    </span>
                    {/* GitHub Logo and 3.0 */}
                    <span className="inline-flex items-center justify-center w-[3em] h-[3em] sm:w-[3.5em] sm:h-[3.5em] md:w-[4em] md:h-[4em] lg:w-[2.5em] lg:h-[2.5em] relative mx-4">
                        <span className="absolute inset-0 blur-[20px] opacity-70">
                            <img
                                src="Assets/images/githubLogo.png"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </span>
                        <img
                            src="Assets/images/githubLogo.png"
                            alt="GitHub Logo"
                            className="w-full h-full object-contain relative"
                        />
                        <span className="absolute text-mutedWhite text-[0.6em] sm:text-[0.7em] md:text-[0.8em]">3.0</span>
                    </span>
                    {/* C */}
                    <span className="relative inline-block">
                        <span className="absolute inset-0 blur-[20px] text-purple-400 opacity-70">C</span>
                        <span className="absolute inset-0 blur-[10px] text-purple-300 opacity-80">C</span>
                        <span className="relative text-white">C</span>
                    </span>
                    {/* H */}
                    <span className="relative inline-block">
                        <span className="absolute inset-0 blur-[20px] text-purple-400 opacity-70">H</span>
                        <span className="absolute inset-0 blur-[10px] text-purple-300 opacity-80">H</span>
                        <span className="relative text-white">H</span>
                    </span>
                </h2>
            </div>

            <button className="relative bg-black border border-transparent hover:border-transparent hover:text-white rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-base sm:text-lg md:text-xl font-medium mb-4 group w-[80%] sm:w-auto">
                <span className="relative z-10 bg-gradient-to-r from-blue-400/80 to-purple-400/80 text-transparent bg-clip-text group-hover:text-white transition-colors duration-300">
                    Join the Epoch
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-100 p-[1px]">
                    <div className="h-full w-full bg-black rounded-full group-hover:bg-gradient-to-r group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                </div>
            </button>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl relative mt-4">
                <span className="absolute inset-0 blur-[10px] text-blue-400 opacity-70">27th - 28th February | 2025</span>
                <span className="absolute inset-0 blur-[5px] text-blue-300 opacity-80">27th - 28th February | 2025</span>
                <span className="relative text-white">27th - 28th February | 2025</span>
            </p>
        </div>
    );
};

export default Hero;