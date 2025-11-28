'use client'

import React, { useState } from 'react';
import teamData from './team.json';

const TeamCard = ({ member }) => (
    <div className="relative rounded-3xl overflow-hidden group cursor-pointer bg-lightBlack border border-white/10 shadow-[0_12px_30px_rgba(15,23,42,0.8)]
        transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(59,130,246,0.45)]">
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-[rgba(56,189,248,0.55)] group-hover:shadow-[0_0_26px_rgba(56,189,248,0.45)] transition-all duration-300" />

        <div className="relative h-64 overflow-hidden">
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        </div>

        <div className="relative px-5 pt-4 pb-5 flex flex-col gap-1.5">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-sky-300/80">
                {member.department}
            </p>
            <h3 className="text-lg font-semibold text-slate-50 leading-snug">
                {member.name}
            </h3>
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
        <div className="bg-gradient-to-b from-black via-[#020617] to-black min-h-screen py-14 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 mb-8 sm:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-[2.5rem] leading-tight text-center">
                    <span className="block md:hidden">
                        <span className="text-gray-400 font-light">{teamData.quote.short.prefix} </span>
                        <span className="text-white font-normal">{teamData.quote.short.highlight} </span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10">
                    {getCurrentMembers().map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>

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
                            className={`w-[10px] h-[10px] rounded-full transition-colors ${i === currentPage ? 'bg-blue-500' : 'bg-zinc-700'
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
