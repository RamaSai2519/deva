import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-black text-white py-16 overflow-hidden">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-green-400/20 rounded-full blur-[100px] animate-pulse" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-green-400">
                            EPOCH 3.0
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-2xl">
                            Epoch 3.0 is a premier GitHub Community Club Event designed for tech enthusiasts, developers, and innovators.This event inspires creative expression with unique challenges and builds a strong tech communit within GITAM University. By blending fun with learning, Epoch ensures vibrant and engaging experience through games, performances, and tech exploration
                        </p>
                        <div className="space-y-2">
                            <p className="text-sm"><span className="font-semibold">Date:</span> December 18th & 19th</p>
                            <p className="text-sm"><span className="font-semibold">Location:</span> Gitam Bengaluru</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold mb-6">Events</h3>
                            <ul className="space-y-4">
                                <li><Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">Event1</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">Event2</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">Event3</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">Event4</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-6">What's In Epoch?</h3>
                            <ul className="space-y-4">
                                <li><Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">Team</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">Speakers</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">All Events</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">Register</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} GitHub Community. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">Twitter</Link>
                        <Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">Facebook</Link>
                        <Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">LinkedIn</Link>
                        <Link to="#" className="text-gray-400 hover:text-green-400 transition-colors">GitHub</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;