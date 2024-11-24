'use client'

import React, { useState } from 'react';
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
        if (currentPage === totalPages - 1) {
            return teamData.teamMembers.slice(start);
        }
        return teamData.teamMembers.slice(start, start + membersPerPage);
    };

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <div className="bg-black min-h-screen py-20">
            <div className="max-w-6xl mx-auto px-4 mb-20">
                <h2 className="text-[2.5rem] leading-tight text-center">
                    <span className="text-gray-400 font-light">
                        "Behind every great innovation and transformative experience at Epoch 3.0,
                    </span>
                    <span className="text-white font-normal">
                        "stands a team of passionate individuals who bring their unique strengths together to create something extraordinary"
                    </span>
                    <span className="text-gray-400 font-light">
                        "— because the greatest achievements aren't built by individuals, but by teams who dare to dream bigger. - Satya Nadella"
                    </span>
                </h2>
            </div>
            <div className="relative max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {getCurrentMembers().map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
                <button
                    onClick={prevPage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-zinc-800/80 hover:bg-zinc-700 rounded-full p-4 transition-colors"
                    aria-label="Previous page"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextPage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-zinc-800/80 hover:bg-zinc-700 rounded-full p-4 transition-colors"
                    aria-label="Next page"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Page Indicators */}
                <div className="flex justify-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-2 h-2 rounded-full transition-colors ${i === currentPage ? 'bg-blue-500' : 'bg-zinc-700'
                                }`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;