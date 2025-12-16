import { useState, useEffect } from 'react';

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
        const difference = +new Date('2025-12-29') - +new Date();
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
        <div className='relative' id='info'>
            <div className="bg-black flex flex-col w-full pb-14 sm:pb-16">
                <div className="w-full min-h-[120px] flex flex-col items-center justify-center pt-3 sm:pt-4 md:pt-5 pb-4 sm:pb-5 md:pb-6 px-4">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.20em] text-slate-400 mb-3 sm:mb-4">
                        Event starts in
                    </p>
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
                <div className="max-w-6xl px-4 mx-auto text-center">
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 sm:mb-12 md:mb-14 leading-relaxed">
                        <span className="text-white font-semibold">Epoch 4.0</span> is <span className="text-white font-semibold">GITAM University Bengaluru's</span> flagship 2-day tech fest, organized by the <span className="text-white font-semibold">GitHub Community Club & DoSL</span>.
                        <span className="block mt-2">Powered by <span className="text-white font-semibold">GitHub Community</span>, workshops, contests, gaming tournaments, and experience zones — bringing together <span className="text-white font-semibold">1000+ participants</span> for learning, innovation, and play.</span>
                    </p>

                    {/* Stats / Social Proof */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                        <div className="flex flex-col items-center">
                            <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.18em] text-gray-400 mb-1">Duration</p>
                            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-1">48 Hours</h2>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500">Non-stop learning, competition & experiences</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.18em] text-gray-400 mb-1">Participants</p>
                            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-1">1000+</h2>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500">Students from all schools at GITAM</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.18em] text-gray-400 mb-1">Events & Zones</p>
                            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-1">15+</h2>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500">Contests, workshops, gaming, stalls & VR zones</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.18em] text-gray-400 mb-1">Mentors & Speakers</p>
                            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-1">50+</h2>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500">Industry & community mentors, speakers & volunteers</p>
                        </div>
                    </div>
                    <p className="mt-4 sm:mt-5 text-[10px] sm:text-xs text-gray-500/80 text-center">
                        Based on previous editions and current planning.
                    </p>
                </div>
            </div>
            <div className="bg-[linear-gradient(to_bottom,_transparent_0%,_#141414_100%)] w-full h-20 absolute bottom-0 ring-0 left-0 z-10" />
        </div>
    );
};

export default Info;
