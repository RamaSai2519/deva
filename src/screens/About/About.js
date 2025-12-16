import { lazy, Suspense } from "react";
import useDeviceType from "../../hooks/useDeviceType";
import aboutData from "./about.json";

const AboutDesktop = lazy(() => import("./AboutDesktop"));
const AboutMobile = lazy(() => import("./AboutMobile"));

const About = () => {
    const isDesktop = useDeviceType();
    const mainImage = "/assets/images/test.jpg";
    const {
        teamMembers,
    } = aboutData;

    return (
        <div className="relative" id="about">
            {/* Section Intro */}
            <div className="text-center pt-16 pb-8">
                <p className="text-xs sm:text-sm uppercase tracking-wider text-slate-400 mb-2">
                    Behind the Scenes at Epoch 4.0
                </p>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
                    A passionate team of students working together to bring Epoch 4.0 to life.
                </p>
            </div>

            <div
                id="core-team"
                className="w-full h-full min-h-screen flex items-center justify-center"
            >
                <Suspense fallback={<div>Loading...</div>}>
                    {isDesktop ? (
                        <AboutDesktop
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
        </div>
    );
};

export default About;