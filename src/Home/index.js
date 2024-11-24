import React from "react";
import Info from "../screens/Info";
import Hero from "../screens/Hero";
import Intro from "../screens/Intro";
import { useHoveredMenu } from "../contexts/hoveredMenuContext";

const Home = () => {
    const { hoveredMenu } = useHoveredMenu();

    return (
        <div className={`${hoveredMenu && 'transition-all duration-700 blur-md'}`}>
            <Hero />
            <Info />
            <Intro />
        </div>
    )
}

export default Home;