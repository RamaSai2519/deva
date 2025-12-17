import { lazy, Suspense, useRef } from "react";
import useDeviceType from "../../hooks/useDeviceType";
import aboutData from "./about.json";
import StarfieldBG from "../../components/Backgrounds/StarField";

const AboutDesktop = lazy(() => import("./AboutDesktop"));
const AboutMobile = lazy(() => import("./AboutMobile"));

const About = () => {
    const parentRef = useRef(null);
    const isDesktop = useDeviceType();
    const mainImage = "/assets/images/test.jpg";
    const {
        teamMembers,
    } = aboutData;

    return (
        <div className="relative" id="about" ref={parentRef}>
            <div

                id="core-team"
                className="w-full h-full min-h-[90vh] flex items-center"
            >
                {isDesktop && <StarfieldBG />}
                <Suspense fallback={<div>Loading...</div>}>
                    {isDesktop ? (
                        <AboutDesktop
                            parentRef={parentRef}
                            teamMembers={teamMembers}
                            mainImage={mainImage}
                            animationDelay={0.4}
                            intersectionThreshold={0.1}
                        />
                    ) : (
                        <AboutMobile
                            teamMembers={teamMembers}
                            mainImage={mainImage}
                            animationDelay={200}
                            intersectionThreshold={0.1}
                        />
                    )}
                </Suspense>
            </div>
            <div className="pointer-events-none bg-[linear-gradient(to_bottom,_transparent_0%,_#000_100%)] w-full h-14 absolute bottom-0 ring-0 left-0 z-20" />
        </div>
    );
};

export default About;