import React from "react";
import Intro from "../screens/Intro";
import Hero from "../screens/Hero";
import { useHoveredMenu } from "../contexts/hoveredMenuContext";

const Home = () => {
    const { hoveredMenu } = useHoveredMenu();

    return (
        <div className={`${hoveredMenu && 'transition-all duration-700 blur-md'}`}>
            <Hero />
            <Intro />
        </div>
    )
}

export default Home;