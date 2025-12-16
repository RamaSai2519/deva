import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollPosition from '../../hooks/useScrollPosition';

const Hero = () => {
    const navigate = useNavigate();
    const { isScrolled } = useScrollPosition('1vh');
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
        <div id='hero' className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-16 md:py-20 overflow-hidden">
            {/* Soft vignette behind content for readability */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.32),transparent_60%)]" />

            <div className="relative mb-6 sm:mb-8 flex flex-col items-center">
                <h1 className="text-[3.2rem] sm:text-[4.8rem] md:text-[6.5rem] lg:text-[15rem] font-bold flex items-center justify-center w-full">
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
                    <span className="inline-flex items-center justify-center w-[5em] h-[5em] sm:w-[2.6em] sm:h-[2.6em] md:w-[2.8em] md:h-[2.8em] lg:w-[2em] lg:h-[2em] relative">
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
                        <span className="absolute text-mutedWhite/70 text-[1.7em] sm:text-[0.65em] md:text-[0.75em] drop-shadow-[0_0_6px_rgba(15,23,42,0.9)]">
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

            <div className='lg:mr-14'>
                <button
                    className="relative bg-lightBlack border border-transparent hover:border-transparent rounded-full px-8 py-3 text-lg font-medium mb-4 group"
                    onClick={() => navigate('/account')}
                >
                    <span className="relative text-xl z-10 bg-gradient-to-r from-blue-400/80 to-purple-400/80 text-transparent group-hover:text-blue-400 bg-clip-text transition-colors duration-300">
                        Register Now
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-100 p-[1px]">
                        <div className="h-full w-full bg-black rounded-full group-hover:bg-gradient-to-r group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                    </div>
                </button>
                {/* Microcopy under CTA */}
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                    Limited seats  x Free entry
                </p>
                {/* Sub-headline */}
                <p className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl font-semibold text-slate-200 max-w-2xl leading-relaxed">
                    48 Hours. Builders. Code. Innovation.
                </p>
                <p className="mt-1.5 text-sm sm:text-base text-slate-400 max-w-xl">
                    The flagship tech fest by GitHub Community Club
                </p>
                {/* Dates */}
                <p className="text-lg sm:text-xl md:text-2xl relative mt-2.5 sm:mt-3">
                    <span className="absolute inset-0 blur-[10px] text-blue-400/65">29th - 30th December 2025</span>
                    <span className="absolute inset-0 blur-[5px] text-blue-300/80">29th - 30th December 2025</span>
                    <span className="relative text-white font-medium tracking-wide">29th - 30th December 2025</span>
                </p>
            </div>
            <div className={`bg-[linear-gradient(to_bottom,_transparent_0%,_black_100%)] ${isScrolled ? "animate-fade-in" : "animate-fade-out"} w-full h-20 absolute bottom-0 ring-0 left-0 z-10`} />
        </div>
    );
};

export default Hero;