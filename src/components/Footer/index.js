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
                            {/* Mini GitHub cat hologram */}
                            <div className="relative h-10 w-10 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_26px_rgba(56,189,248,0.45)]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.22),_transparent_60%)] opacity-70" />
                                <img
                                    src="Assets/images/githubLogo.png"
                                    alt="GitHub"
                                    className="relative h-6 w-6 object-contain opacity-95 mix-blend-screen"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-100">Epoch 4.0</span>
                                <span className="text-xs text-slate-400">GITAM × GitHub Community</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 max-w-sm">
                            A 48-hour GitHub-powered tech festival hosted by the GITAM Community — built for people who love to ship, learn, and play.
                        </p>
                    </div>

                    {/* Column 2: Quick links */}
                    <div className="flex flex-col gap-4 text-sm">
                        <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">Quick Links</h3>
                        <nav className="grid grid-cols-2 gap-y-2 gap-x-6 text-slate-300">
                            <Link to="/" className="hover:text-white">Home</Link>
                            <button type="button" className="text-left hover:text-white">Schedule</button>
                            <button type="button" className="text-left hover:text-white">Stalls</button>
                            <button type="button" className="text-left hover:text-white">Team</button>
                            <button type="button" className="text-left hover:text-white">FAQ</button>
                            <button type="button" className="text-left hover:text-white">Contact</button>
                        </nav>
                    </div>

                    {/* Column 3: Support / Socials */}
                    <div className="flex flex-col gap-4 text-sm">
                        <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">Support & Socials</h3>
                        <div className="flex flex-wrap gap-3 text-slate-300">
                            <a href="#" aria-label="GitHub" className="hover:text-white">GitHub</a>
                            <a href="#" aria-label="LinkedIn" className="hover:text-white">LinkedIn</a>
                            <a href="#" aria-label="Instagram" className="hover:text-white">Instagram</a>
                            <a href="#" aria-label="Discord" className="hover:text-white">Discord</a>
                        </div>
                        <div className="space-y-1 text-xs text-slate-400">
                            <p>Support: epoch@gitam.edu</p>
                            <p>Venue: GITAM University, Bengaluru</p>
                        </div>
                    </div>
                </div>

                {/* Legal strip */}
                <div className="border-t border-white/5 pt-4 mt-2 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
                    <p>© {currentYear} GitHub Community GITAM. All rights reserved.</p>
                    <p>Built by the GitHub Community Club for Epoch 4.0.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
