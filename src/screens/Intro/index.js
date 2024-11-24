import React, { useState, useEffect } from "react";
import GlowDiv from "../../components/GlowDiv";
import Peep from "../../components/Peep";

const Intro = () => {
    const [state, setState] = useState({
        isInView: false,
        isSettled: false
    });

    useEffect(() => {
        const handleScroll = () => {
            const introElement = document.getElementById("intro");
            if (introElement) {
                const rect = introElement.getBoundingClientRect();
                setState({
                    isInView: rect.top < window.innerHeight && rect.bottom > 0,
                    isSettled: rect.bottom <= window.innerHeight
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div id="intro" className="min-h-screen bg-black flex flex-col items-center justify-between">
            <GlowDiv>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Epoch Tech Fest</h2>
                <p className="text-lg text-white/80 text-center max-w-md">
                    Gitam Bengaluru
                </p>
            </GlowDiv>
            {state.isInView &&
                <Peep isSettled={state.isSettled}>
                    <h1>Welcome to Epoch Tech Fest</h1>
                </Peep>
            }
        </div>
    );
};

export default Intro;
