import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear() || 2024;

    return (
        <footer className="relative bg-gradient-to-t from-black via-[#020617] to-black text-white pt-12 pb-6 overflow-hidden">
            {/* Glow backdrop */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-72 w-[480px] rounded-full bg-sky-500/25 blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8">
                    {/* Column 1: Brand / About */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-3">
                            <img
                                src="Assets/images/epoch_logo.webp"
                                alt="Epoch"
                                width={40}
                                height={40}
                                loading="lazy"
                                decoding="async"
                                className="h-10 w-10 object-contain"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-100">Epoch 4.0</span>
                                <span className="text-xs text-slate-400">GitHub Community Club & DoSL · GITAM Bengaluru</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 max-w-sm">
                            A 48-hour tech experience by the GitHub Community Club at GITAM — built by students, powered by community, and driven by innovation.
                        </p>
                    </div>

                    {/* Column 2: Quick links */}
                    <div className="flex flex-col gap-4 text-sm">
                        <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">Quick Links</h3>
                        <nav className="grid grid-cols-2 gap-y-2 gap-x-6 text-slate-300">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <a href="#events" className="hover:text-white transition-colors">Events</a>
                            <a href="#team" className="hover:text-white transition-colors">Team</a>
                            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                        </nav>
                    </div>

                    {/* Column 3: Support / Socials */}
                    <div className="flex flex-col gap-4 text-sm">
                        <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">Support & Socials</h3>
                        <div className="flex flex-wrap gap-3 text-slate-300">
                            <a href="https://github.com/github-community-gitam" target="_blank" rel="noopener noreferrer" aria-label="GitHub Community Club on GitHub" className="flex items-center gap-1.5 hover:text-white transition-all hover:shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                GitHub
                            </a>
                            <a href="https://www.linkedin.com/company/githubcommunitygitam/" target="_blank" rel="noopener noreferrer" aria-label="GitHub Community Club on LinkedIn" className="flex items-center gap-1.5 hover:text-white transition-all hover:shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                LinkedIn
                            </a>
                            <a href="https://www.instagram.com/github.gitamblr/" target="_blank" rel="noopener noreferrer" aria-label="GitHub Community Club on Instagram" className="flex items-center gap-1.5 hover:text-white transition-all hover:shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                Instagram
                            </a>
                        </div>
                        <div className="space-y-1 text-xs text-slate-400">
                            <p>Support: <a href="mailto:github_community@gitam.in" className="hover:text-slate-200">github_community@gitam.in</a></p>
                            <p>Organised by GitHub Community Club & DoSL at GITAM University.</p>
                            <p>Location: GITAM University, Bengaluru Campus</p>
                        </div>
                    </div>
                </div>

                {/* Sponsors strip */}
                <div className="border-t border-white/5 pt-5 mt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400">Sponsors</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Official Coding Partner</span>
                                <span className="text-[11px] text-slate-400">GeeksforGeeks | DosL | Gitam & more.</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="h-10 px-3 rounded-md border border-slate-700/60 bg-black/40 flex items-center justify-center hover:border-slate-600 transition-colors">
                                <img src="https://media.geeksforgeeks.org/gfg-gg-logo.svg" alt="GeeksforGeeks" width={120} height={24} loading="lazy" decoding="async" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                            </a>
                            <div className="h-10 px-3 rounded-md border border-slate-700/60 bg-black/40 flex items-center justify-center">
                                <img src="Assets/images/dosl.webp" alt="DoSL" width={112} height={28} loading="lazy" decoding="async" className="h-7 opacity-80" />
                            </div>
                            <div className="h-10 px-3 rounded-md border border-slate-700/60 bg-black/40 flex items-center justify-center">
                                <img src="Assets/images/gitam.webp" alt="GITAM" width={112} height={28} loading="lazy" decoding="async" className="h-7 opacity-80" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal strip */}
                <div className="border-t border-white/5 pt-4 mt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
                    <p>© {currentYear} GitHub Community Club · GITAM Bengaluru. All rights reserved.</p>
                    <p>Built with ❤️ by the GitHub Community Club at GITAM for Epoch 4.0.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
