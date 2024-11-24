import React, { useState } from "react";
import GlowDiv from "../../components/GlowDiv";
import PeepParent from "../../components/PeepParent";
import GiantPopup from "../../components/Popups/GiantPopup";

const Intro = () => {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <div id="intro" className="min-h-screen bg-black flex flex-col items-center justify-between">
            <GlowDiv>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Epoch Tech Fest</h2>
                <p className="text-lg text-white/80 text-center max-w-md">
                    Gitam Bengaluru
                </p>
            </GlowDiv>
            <PeepParent elementId="intro" onClick={() => setShowPopup(true)}>
                <div className="flex w-full justify-center items-center">
                    <h1>Welcome to Epoch Tech Fest</h1>
                </div>
            </PeepParent>
            <GiantPopup visible={showPopup} setVisible={setShowPopup}>
                Hello World
            </GiantPopup>
        </div>
    );
};

export default Intro;
