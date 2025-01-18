import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Info from "../screens/Info";
import Hero from "../screens/Hero";
import About from "../screens/About/About";
import aboutData from "../screens/About/about.json";
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
            <ErrorBoundary>
                <About teamMembers={aboutData.teamMembers} mainImage="/assets/images/test.jpg" />
            </ErrorBoundary>
            <Team />
            <FAQ />
        </div>
    )
};

export default Home;