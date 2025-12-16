import { lazy, Suspense } from "react";
import useDeviceType from "../../hooks/useDeviceType";
import aboutData from "./about.json";

const AboutDesktop = lazy(() => import("./AboutDesktop"));
const AboutMobile = lazy(() => import("./AboutMobile"));

const About = () => {
    const isDesktop = useDeviceType();
    const mainImage = "/assets/images/test.jpg";
    const {
        overview,
        eventDetails,
        highlights,
        teamMembers,
    } = aboutData;

    return (
        <div className="relative" id="about">
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
            <div className="bg-[linear-gradient(to_bottom,_transparent_0%,_black_100%)] animate-fade-in w-full h-20 ring-0 left-0" />
            <div className="w-full bg-black/40 px-6 py-12 md:px-12 md:py-16 lg:px-24 lg:py-20 space-y-10">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <p className="text-xs font-semibold tracking-[0.3em] text-blue-400 uppercase">
                        About Epoch 4.0
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-50">
                        {overview.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-300">
                        {overview.summary}
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto text-sm md:text-base">
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-100">Event details</h3>
                        <ul className="space-y-1 text-gray-300">
                            <li>
                                <span className="text-gray-400">Dates:</span> {eventDetails.dates}
                            </li>
                            <li>
                                <span className="text-gray-400">Venue:</span> {eventDetails.venue}
                            </li>
                            <li>
                                <span className="text-gray-400">Organisers:</span> {eventDetails.organizedBy}
                            </li>
                            <li>
                                <span className="text-gray-400">Audience:</span> {eventDetails.targetAudience}
                            </li>
                            <li>
                                <span className="text-gray-400">Expected participants:</span> {eventDetails.expectedParticipants}
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-100">Why Epoch 4.0</h3>
                        <ul className="space-y-1 text-gray-300 list-disc list-inside">
                            {overview.objectives.map((objective, index) => (
                                <li key={index}>{objective}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-100">Highlights</h3>
                        <ul className="space-y-1 text-gray-300 list-disc list-inside">
                            {highlights.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;