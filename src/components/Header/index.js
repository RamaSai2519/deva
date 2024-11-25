import React from "react";
import { Link } from "react-router-dom";
import Octicon from "../../Icons/octicon";
import SearchIcon from "../../Icons/Searchicon";
import useScrollPosition from "../../hooks/useScrollPostion";
import { useHoveredMenu } from "../../contexts/hoveredMenuContext";

const Header = () => {
    const { hoveredMenu, setHoveredMenu } = useHoveredMenu();
    const { isScrolled } = useScrollPosition("80vh");

    const navItem = (text, menu) => (
        <span
            className="cursor-pointer text-mutedWhite hover:text-white transition-colors"
            onMouseEnter={() => setHoveredMenu(menu)}
        >
            {text}
        </span>
    );

    // Updated dropdown menus with generic items
    const dropdownMenus = {
        Events: ["Upcoming Events", "Past Events", "Highlights", "Get Involved"],
        FAQ: ["General Questions", "Event Policies", "Accessibility", "Contact Support"],
        About: ["Our Team", "Mission & Vision", "Careers", "Press"],
        Account: ["Profile", "Settings", "Notifications", "Sign Out"],
    };

    const renderDropdown = () => (
        <div
            className={`fixed top-10 bottom-0 left-0 right-0 w-full h-screen text-white z-20 ${hoveredMenu ? "animate-fade-in-bottom" : "hidden animate-fade-out"
                }`}
        >
            <div
                className={`w-full mx-auto flex flex-col items-center justify-center py-10 rounded-b-xl gap-5 bg-lightBlack ${hoveredMenu
                        ? "bg-lightBlack animate-fade-in animate-fade-in-bottom"
                        : "bg-transparent animate-fade-out"
                    }`}
                onMouseLeave={() => setHoveredMenu(null)}
            >
                {dropdownMenus[hoveredMenu]?.map((item, index) => (
                    <Link
                        key={index}
                        to={`/${hoveredMenu.toLowerCase()}/${item
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                        className="hover:underline text-lg animate-fade-in-bottom"
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <header
            className={`fixed top-0 p-1 md:py-2 px-4 md:px-6 lg:px-10 flex justify-between items-center w-full z-50 ${hoveredMenu
                    ? "bg-lightBlack transition-all duration-500"
                    : isScrolled
                        ? "bg-lightBlack transition-all duration-500 rounded-b-md"
                        : "bg-black"
                }`}
        >
            <nav className="flex w-full items-center justify-center">
                <div className="flex w-full max-w-2xl items-center justify-between">
                    <Octicon />
                    {navItem("Events", "Events")}
                    {navItem("FAQ", "FAQ")}
                    {navItem("About Us", "About")}
                    {navItem("Account", "Account")}
                    {navItem(<SearchIcon />, "")}
                </div>
            </nav>
            {renderDropdown()}
        </header>
    );
};

export default Header;