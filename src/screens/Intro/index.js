import React from "react";
import GlowDiv from "../../components/GlowDiv";
import useScrollTo from "../../hooks/useScrollTo";

const Intro = () => {
    useScrollTo("intro");
    useScrollTo("slider");

    return (
        <div id="intro" className="min-h-screen bg-black p-8 flex flex-col items-center justify-center">
            <GlowDiv>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Epoch Tech Fest</h2>
                <p className="text-lg text-white/80 text-center max-w-md">
                    Gitam Bengaluru
                </p>
            </GlowDiv>
        </div>
    );
};

export default Intro;
