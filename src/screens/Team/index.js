'use client'

import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import teamData from './team.json';

const TeamCard = ({ member }) => (
    <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
        <img
            src={member.image}
            alt={member.name}
            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90 p-8 flex flex-col justify-end">
            <p className="text-gray-400 text-sm mb-2">{member.department}</p>
            <h3 className="text-3xl text-white font-semibold mb-2">
                {member.name}.<br />
                {member.role}.
            </h3>
            <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 group-hover:text-blue-400 flex items-center"
            >
                Connect here
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </a>
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

    const handlers = useSwipeable({
        onSwipedLeft: nextPage,
        onSwipedRight: prevPage,
        trackMouse: true,
    });

    return (
        <div className="bg-black min-h-screen" {...handlers}>
            <div className="max-w-6xl mx-auto px-4 mb-20">
                <h2 className="text-[2.5rem] leading-tight text-center">
                    
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
