import React from "react";
import Intro from "../screens/Intro";
import Hero from "../screens/Hero";
import Faq from "../screens/faq";
import Info from "../screens/Info";

const Home = () => {
    return (
        <>
            <Hero />
            <Info />
            <Intro />
            <Faq />
        </>
    )
}

export default Home;