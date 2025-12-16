import { useState } from "react";
import GlowDiv from "../../components/GlowDiv";
import PeepParent from "../../components/PeepParent";
import GiantPopup from "../../components/Popups/GiantPopup";

const Intro = () => {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <div className="relative">
            <div id="intro" className="min-h-screen flex flex-col items-center justify-between p-2">
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
            <div className="bg-[linear-gradient(to_bottom,_transparent_0%,_black_100%)] w-full h-20 absolute bottom-0 ring-0 left-0 z-10" />
        </div>
    );
};

export default Intro;
