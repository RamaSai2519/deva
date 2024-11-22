import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Octicon from '../../Icons/octicon';
import SearchIcon from '../../Icons/Searchicon';

const Header = () => {
    const [hoveredMenu, setHoveredMenu] = useState(null);

    const navItem = (text, menu) => (
        <span
            className="cursor-pointer text-mutedWhite hover:text-white transition-colors"
            onMouseEnter={() => setHoveredMenu(menu)}
        >
            {text}
        </span>
    );

    const dropdownMenus = {
        Mac: ['Explore All Mac', 'MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini', 'Mac Studio', 'Mac Pro', 'Displays'],
        iPhone: ['iPhone 15', 'iPhone 14', 'iPhone SE', 'Compare iPhones'],
        Watch: ['Apple Watch Ultra', 'Series 9', 'SE', 'Compare Watches'],
        AirPods: ['AirPods Pro', 'AirPods Max', 'AirPods (3rd generation)'],
    };

    const renderDropdown = () => (
        <div className={`fixed top-10 left-0 right-0 w-full h-screen text-white z-20 backdrop-blur-md transition-opacity duration-300 ease-in-out ${hoveredMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="w-full mx-auto flex flex-col items-center justify-center gap-5 bg-lightBlack" onMouseLeave={() => setHoveredMenu(null)}>
                {dropdownMenus[hoveredMenu]?.map((item, index) => (
                    <Link
                        key={index}
                        to={`/${hoveredMenu.toLowerCase()}/${item.toLowerCase().replace(/ /g, '-')}`}
                        className="hover:underline text-lg"
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <header className={`fixed top-0 p-1 md:py-2 px-4 md:px-6 lg:px-10 flex justify-between items-center w-full z-30 backdrop-blur-lg rounded-b-md ${hoveredMenu ? "bg-lightBlack" : "bg-black"}`}>
            <nav className='flex w-full items-center justify-center'>
                <div className="flex w-full max-w-2xl items-center justify-between">
                    {navItem(<Octicon />, '/')}
                    {navItem('Events', 'Mac')}
                    {navItem('FAQ', 'iPhone')}
                    {navItem('About Us', 'Watch')}
                    {navItem('Account', 'AirPods')}
                    {navItem(<SearchIcon />, '')}
                </div>
            </nav>
            {renderDropdown()}
        </header>
    );
};

export default Header;