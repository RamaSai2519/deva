'use client'

import React from 'react';
import useScrollPosition from '../../hooks/useScrollPostion';

const Hero = () => {
    const { isScrolled } = useScrollPosition(1);

    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
            <div className="relative mb-8">
                <h2 className="text-[8rem] pl-10 md:text-[10rem] font-bold flex items-center justify-center w-full">
                    <span className="relative">
                        <span className="absolute inset-0 blur-[20px] text-blue-400 opacity-70">EP</span>
                        <span className="absolute inset-0 blur-[10px] text-blue-300 opacity-80">EP</span>
                        <span className="relative text-white">EP</span>
                    </span>
                    <span className="inline-flex items-center justify-center w-[4em] h-[4em] md:w-[2.5em] md:h-[2.5em] relative">
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
                        <span className="absolute text-mutedWhite text-9xl">3.0</span>
                    </span>

                    <span className="relative">
                        <span className="absolute inset-0 blur-[20px] text-purple-400 opacity-70">CH</span>
                        <span className="absolute inset-0 blur-[10px] text-purple-300 opacity-80">CH</span>
                        <span className="relative text-white">CH</span>
                    </span>
                </h2>
            </div>

            <button className="relative bg-black border border-transparent hover:border-transparent hover:text-white rounded-full px-8 py-3 text-lg font-medium mb-4 group">
                <span className="relative text-xl z-10 bg-gradient-to-r from-blue-400/80 to-purple-400/80 text-transparent bg-clip-text group-hover:text-white transition-colors duration-300">
                    Join the Epoch
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-100 p-[1px]">
                    <div className="h-full w-full bg-black rounded-full group-hover:bg-gradient-to-r group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                </div>
            </button>

            <p className="text-3xl relative">
                <span className="absolute inset-0 blur-[10px] text-blue-400 opacity-70">18th - 19th December | 2024</span>
                <span className="absolute inset-0 blur-[5px] text-blue-300 opacity-80">18th - 19th December | 2024</span>
                <span className="relative text-white">18th - 19th December | 2024</span>
            </p>

            <div className={`${isScrolled ? "animate-fade-in" : "animate-fade-out"} bg-[linear-gradient(to_bottom,_transparent_0%,_#212121)] w-full h-20 absolute bottom-0 z-10`} />
        </div>
    );
};

export default Hero;