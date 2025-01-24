import React from 'react';
import { Link } from 'react-router-dom';

const SocialLink = ({ href, label }) => (
    <Link
        to={href}
        aria-label={label}
        className="text-gray-400 hover:text-green-400 transition-colors"
    >
        {label}
    </Link>
);

const Footer = () => {
    const currentYear = new Date().getFullYear() || 2025; // Fallback to a default year

    return (
        <footer className="relative bg-black text-white py-16 overflow-hidden">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage:
                        'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
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
                        <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
                            Epoch 3.0 is a premier GitHub Community Club Event designed for tech enthusiasts, developers, and innovators. This event inspires creative expression with unique challenges and builds a strong tech community within GITAM University. By blending fun with learning, Epoch ensures a vibrant and engaging experience through games, performances, and tech exploration.
                        </p>
                        <div className="space-y-2">
                            <p className="text-sm">
                                <span className="font-semibold">Date:</span> February 27 & 28, 2025
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Location:</span> Gitam Bengaluru
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold mb-6">Events</h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        to="#"
                                        aria-label="Learn about Event 1"
                                        className="text-gray-400 hover:text-green-400 transition-colors"
                                    >
                                        Explore Event 1
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        aria-label="Learn about Event 2"
                                        className="text-gray-400 hover:text-green-400 transition-colors"
                                    >
                                        Explore Event 2
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        aria-label="Learn about Event 3"
                                        className="text-gray-400 hover:text-green-400 transition-colors"
                                    >
                                        Explore Event 3
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        aria-label="Learn about Event 4"
                                        className="text-gray-400 hover:text-green-400 transition-colors"
                                    >
                                        Explore Event 4
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-6">What's In Epoch?</h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        to="#"
                                        aria-label="Meet the Team"
                                        className="text-gray-400 hover:text-green-400 transition-colors"
                                    >
                                        Meet the Team
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        aria-label="Learn about the Speakers"
                                        className="text-gray-400 hover:text-green-400 transition-colors"
                                    >
                                        Learn About Speakers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        aria-label="View All Events"
                                        className="text-gray-400 hover:text-green-400 transition-colors"
                                    >
                                        View All Events
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        aria-label="Register for Epoch 3.0"
                                        className="text-gray-400 hover:text-green-400 transition-colors"
                                    >
                                        Register Now
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © {currentYear} GitHub Community. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <SocialLink href="#" label="Twitter" />
                        <SocialLink href="#" label="Facebook" />
                        <SocialLink href="#" label="LinkedIn" />
                        <SocialLink href="#" label="GitHub" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
