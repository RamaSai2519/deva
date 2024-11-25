import React, { useEffect, useRef, useState } from "react";
import aboutData from "./about.json";

const AboutMobile = () => {
    const containerRef = useRef(null);
    const [animatedCards, setAnimatedCards] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        aboutData.teamMembers.forEach((_, index) => {
                            setTimeout(() => {
                                setAnimatedCards((prev) => [...prev, index]);
                            }, index * 200);
                        });
                    } else { setAnimatedCards([]); }
                });
            },
            { threshold: 0.1 }
        );

        const currentContainer = containerRef.current;
        if (currentContainer) observer.observe(currentContainer);

        return () => { if (currentContainer) observer.unobserve(currentContainer); };
    }, []);

    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center"
            ref={containerRef}
        >
            <div
                className="w-[200px] h-[100px] md:w-[300px] md:h-[150px] lg:w-[400px] lg:h-[200px] z-20 rounded-lg overflow-hidden my-10"
            >
                <img
                    src="/assets/images/test.jpg"
                    alt="Epoch"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="">
                {aboutData.teamMembers.map((member, index) => (
                    <div
                        key={member.id}
                        className={`card-mobile flex items-center gap-4 mb-8 transform transition-all duration-500 ease-out ${animatedCards.includes(index)
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-10"
                            }`}
                        style={{
                            transitionDelay: `${index * 300}ms`,
                        }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">
                                {member.name}
                            </h3>
                            <p className="text-blue-400 text-sm">{member.role}</p>
                            <p className="text-gray-400 text-sm mt-2">
                                {member.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutMobile;