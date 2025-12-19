import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import teamData from './team.json';

const TeamCard = ({ member }) => (
    <div className="relative rounded-3xl overflow-hidden group cursor-pointer bg-darkBlack border border-white/5 shadow-[0_10px_24px_rgba(15,23,42,0.7)]
        transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(59,130,246,0.45)] hover:border-sky-400/30">
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-[rgba(56,189,248,0.55)] group-hover:shadow-[0_0_22px_rgba(56,189,248,0.45)] transition-all duration-300" />

        <div className="relative h-64 overflow-hidden">
            <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                decoding="async"
                width={600}
                height={600}
                className="w-full h-full object-top object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[15%]"
            />
            {/* Stronger unified overlay for photo consistency */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/75 group-hover:via-black/35 transition-all duration-300" />
        </div>

        <div className="relative px-5 pt-4 pb-5 flex flex-col gap-1.5">
            <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-sky-300/80 group-hover:text-sky-200 transition-colors">
                {member.department}
            </p>
            <h3 className="text-lg font-semibold text-slate-50 leading-snug group-hover:text-white transition-colors">
                {member.name}
            </h3>
            {member.role && (
                <p className="text-sm font-medium text-slate-400 group-hover:text-sky-100 transition-colors">
                    {member.role}
                </p>
            )}

            <div className="mt-3 flex items-center justify-between">
                {member.description && (
                    <p className="text-xs text-slate-400 max-w-[70%] line-clamp-2">
                        {member.description}
                    </p>
                )}
                <div className="flex items-center gap-2 ml-auto opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {member.github && (
                        <a
                            href={member.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                            aria-label={`${member.name} on GitHub`}
                        >
                            <FaGithub className="w-4 h-4" />
                        </a>
                    )}
                    {member.linkedin && (
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                            aria-label={`${member.name} on LinkedIn`}
                        >
                            <FaLinkedin className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const Team = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const membersPerPage = 6;
    const totalPages = Math.ceil(teamData.teamMembers.length / membersPerPage);

    const getCurrentMembers = () => {
        const start = currentPage * membersPerPage;
        return teamData.teamMembers.slice(start, start + membersPerPage);
    };

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <div className="bg-gradient-to-b from-black via-[#020617] to-black min-h-screen sm:mt-0 md:mt-14 sm:py-16 scroll-mt-24" id='team'>
            <div className="max-w-6xl mx-auto px-4 mb-16">
                <h2 className="text-2xl md:text-[2.5rem] leading-tight text-center">
                    <span className="block md:hidden">
                        <span className="text-gray-400 font-light">{teamData.quote.short.prefix} </span>
                        <span className="text-white font-normal">{teamData.quote.short.highlight}</span>
                        <span className="text-gray-400 font-light">{teamData.quote.short.suffix}</span>
                    </span>

                    <span className="hidden md:block">
                        <span className="text-gray-400 font-light">{teamData.quote.full.prefix} </span>
                        <span className="text-white font-normal">{teamData.quote.full.highlight} </span>
                        <span className="text-gray-400 font-light">{teamData.quote.full.suffix}</span>
                    </span>
                </h2>
            </div>
            <div className="relative max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-10">
                    {getCurrentMembers().map((member) => (
                        <TeamCard key={`${member.id}-${member.name}`} member={member} />
                    ))}
                </div>

                {/* Volunteer credit */}
                <p className="text-center text-sm text-slate-400 mt-8 mb-6">
                    And many more volunteers who make Epoch possible.
                </p>

                <div className="flex justify-center items-center gap-2 mt-4 relative">
                    <button
                        onClick={prevPage}
                        className="md:hidden p-2 absolute left-[10%]"
                        aria-label="Previous page"
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-[16px] h-[16px]'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15 19l-7 -7l7 -7'
                            />
                        </svg>
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-6 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${i === currentPage ? 'bg-blue-500' : 'bg-zinc-700'
                                }`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}

                    <button
                        onClick={nextPage}
                        className='md:hidden p-[10px] absolute right-[10%]'
                        aria-label='Next page'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-[16px] h-[16px]'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M9 5l7 7 -7 7'
                            />
                        </svg>
                    </button>

                </div>
            </div>
        </div >
    );
};

export default Team;
