'use client'
import React, { useEffect, useState } from 'react';

const Hero = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (event) => setPrefersReducedMotion(event.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Soft vignette behind content for readability */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.32),transparent_60%)]" />

            <div className="relative mb-6 sm:mb-8 flex flex-col items-center">
                <h1 className="text-[3.2rem] sm:text-[4.8rem] md:text-[6.5rem] lg:text-[8rem] font-bold flex items-center justify-center w-full px-4 sm:px-8">
                    {/* E */}
                    <span className="relative hidden md:inline-block">
                        <span className="absolute inset-0 blur-[20px] text-blue-400 opacity-60">E</span>
                        <span className="absolute inset-0 blur-[10px] text-blue-300 opacity-75">E</span>
                        <span className="relative text-white">E</span>
                    </span>
                    {/* P */}
                    <span className="relative hidden md:inline-block">
                        <span className="absolute inset-0 blur-[20px] text-blue-400 opacity-60">P</span>
                        <span className="absolute inset-0 blur-[10px] text-blue-300 opacity-75">P</span>
                        <span className="relative text-white">P</span>
                    </span>
                    {/* GitHub Logo and 4.0 */}
                    <span className="inline-flex items-center justify-center w-[2.2em] h-[2.2em] sm:w-[2.6em] sm:h-[2.6em] md:w-[2.8em] md:h-[2.8em] lg:w-[2em] lg:h-[2em] relative mx-4">
                        {/* Soft neon glow (respect reduced motion) */}
                        {!prefersReducedMotion && (
                            <span className="absolute inset-0 rounded-full bg-blue-500/25 blur-[22px] animate-[pulse_3s_ease-in-out_infinite]" />
                        )}
                        <span className="absolute inset-0 blur-[14px] opacity-80">
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
                        <span className="absolute text-mutedWhite/70 text-[0.55em] sm:text-[0.65em] md:text-[0.75em] drop-shadow-[0_0_6px_rgba(15,23,42,0.9)]">
                            4.0
                        </span>
                    </span>
                    {/* C */}
                    <span className="relative hidden md:inline-block">
                        <span className="absolute inset-0 blur-[20px] text-purple-400 opacity-60">C</span>
                        <span className="absolute inset-0 blur-[10px] text-purple-300 opacity-75">C</span>
                        <span className="relative text-white">C</span>
                    </span>
                    {/* H */}
                    <span className="relative hidden md:inline-block">
                        <span className="absolute inset-0 blur-[20px] text-purple-400 opacity-60">H</span>
                        <span className="absolute inset-0 blur-[10px] text-purple-300 opacity-75">H</span>
                        <span className="relative text-white">H</span>
                    </span>
                </h1>
            </div>

            <button
                type="button"
                aria-label="Join Epoch 4.0"
                className="relative inline-flex items-center justify-center rounded-full px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg md:text-xl font-semibold mb-2.5 sm:mb-3 group w-full max-w-xs sm:w-auto text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
                <span className="absolute inset-0 rounded-full bg-cyan-500/22 group-hover:bg-cyan-500/30 transition-colors duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                    Join Epoch
                    <span className="inline-flex translate-x-0 opacity-80 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all duration-200">
                        
                    </span>
                </span>
            </button>

            {/* Microcopy under CTA */}
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Limited seats  x Free entry
            </p>

            {/* Sub-headline */}
            <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-slate-300 max-w-xl">
                48-Hour Tech Innovation Experience by GitHub Community Club
            </p>

            {/* Dates */}
            <p className="text-lg sm:text-xl md:text-2xl relative mt-2.5 sm:mt-3">
                <span className="absolute inset-0 blur-[10px] text-blue-400/65">29th - 30th December 2025</span>
                <span className="absolute inset-0 blur-[5px] text-blue-300/80">29th - 30th December 2025</span>
                <span className="relative text-white font-medium tracking-wide">29th - 30th December 2025</span>
            </p>
        </div>
    );
};

export default Hero;