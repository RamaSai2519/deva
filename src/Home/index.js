import React from "react";
import Info from "../screens/Info";
import Hero from "../screens/Hero";
import About from "../screens/About";
import Intro from "../screens/Intro";
import Events from "../screens/Events";
import Team from "../screens/Team";
import { useHoveredMenu } from "../contexts/hoveredMenuContext";
import FAQ from "../screens/faq";

const Home = () => {
    const { hoveredMenu } = useHoveredMenu();

    return (
        <div className={`${hoveredMenu && 'transition-all duration-700 blur-md'}`}>
            <Hero />
            <Info />
            <Intro />
            <Events />
            <About />
            <Team />
            <FAQ />
        </div>
    )
};

export default Home;