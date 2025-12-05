import { User, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Octicon from '../../Icons/octicon';
import { useAuth } from '../../contexts/AuthContext';
import useScrollPosition from '../../hooks/useScrollPosition';

const Header = () => {
    const { isAuthenticated } = useAuth();
    const { isScrolled } = useScrollPosition('1vh');
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const links = [
        { to: '#hero', label: 'Home' },
        { to: '#events', label: 'Events' },
        { to: '#team', label: 'Team' },
        { to: '#about', label: 'About' },
        { to: '#faq', label: 'FAQ' },
    ]

    const navToHomeIfNotHome = (to) => {
        const isHome = location.pathname === '/';
        if (!isHome) navigate(`/${to}`); else navigate(to);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`fixed top-0 p-1 md:py-2 md:px-6 lg:px-10 flex justify-between items-center w-full z-50 ${isScrolled || isMobileMenuOpen ? 'bg-darkBlack bg-opacity-80 backdrop-blur-md shadow-md' : 'bg-transparent'} transition-colors duration-300`}>
            <nav className='flex w-full items-center justify-center'>
                <div className='flex w-full items-center justify-between'>
                    <Link to="/">
                        <Octicon />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex w-full rounded-full items-center justify-center space-x-6">
                        {links.map((link) => (
                            <button
                                key={link.to}
                                to={link.to}
                                onClick={() => navToHomeIfNotHome(link.to)}
                                className="text-white text-base md:text-2xl font-medium hover:text-blue-400 transition-colors duration-300"
                            >{link.label}</button>
                        ))}
                    </div>

                    <div className='flex items-center md:gap-3 gap-5'>
                        <Link to={isAuthenticated ? "/scanner" : "/login"}>
                            <div className="w-7 h-7 rounded-full bg-card flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                    />
                                </svg>
                            </div>
                        </Link>
                        <Link to={isAuthenticated ? "/account" : "/login"}>
                            <User className="w-7 h-7 md:w-6 md:h-6 text-white" />
                        </Link>
                        {isMobile && (
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden w-7 h-7 text-white hover:text-blue-400 transition-colors duration-300"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobile && isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-darkBlack bg-opacity-95 backdrop-blur-md shadow-lg md:hidden">
                    <div className="flex flex-col py-4 px-6 space-y-4">
                        {links.map((link) => (
                            <button
                                key={link.to}
                                onClick={() => navToHomeIfNotHome(link.to)}
                                className="text-white text-lg font-medium hover:text-blue-400 transition-colors duration-300 text-left py-2 border-b border-gray-700 last:border-b-0"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;