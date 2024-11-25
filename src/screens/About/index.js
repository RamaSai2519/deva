import React, { useEffect, useRef, useState } from "react";
import useDeviceType from "../../hooks/useDeviceType";
import AboutMobile from "./mobile-index";
import aboutData from "./about.json";

const About = () => {
    const isDesktop = useDeviceType();
    const parentRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { setIsVisible(entry.isIntersecting); },
            { threshold: 0.1 }
        );

        const currentRef = parentRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => { if (currentRef) observer.unobserve(currentRef) };
    }, []);

    const positions = [
        { x: -200, y: -200 },
        { x: 200, y: -200 },
        { x: -400, y: 0 },
        { x: 400, y: 0 },
        { x: -300, y: 200 },
        { x: 300, y: 200 },
        { x: 0, y: 250 },
    ];

    return (
        <div
            id="core-team"
            className="w-full h-full min-h-screen bg-black flex items-center justify-center"
        >
            {isDesktop ? (
                <div
                    ref={parentRef}
                    className={`relative w-full h-full flex items-center justify-center ${isVisible ? "parent-animate-in" : "animate-fade-out"}`}
                >
                    <div className="absolute w-[200px] h-[100px] md:w-[300px] md:h-[150px] lg:w-[400px] lg:h-[200px] z-20 rounded-lg overflow-hidden">
                        <img src="/assets/images/test.jpg" alt="Epoch" className="w-full h-full object-cover" />
                    </div>

                    {aboutData.teamMembers.map((member, i) => (
                        <div
                            key={member.id}
                            className="card"
                            style={{
                                "--x": `${positions[i]?.x}px`,
                                "--y": `${positions[i]?.y}px`,
                                animationDelay: `${i * 0.4}s`,
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <img src={member.image} alt={member.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div>
                                    <h3 className="text-lg font-semibold">{member.name}</h3>
                                    <p className="text-blue-400 text-sm">{member.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mt-4">
                                {member.description}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <AboutMobile aboutData={aboutData} />
            )}
        </div>
    );
};

export default About;