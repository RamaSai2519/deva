import React, { useEffect, useRef, useState } from "react";
import aboutData from "./about.json";

const getPositions = (screenWidth) => {
    if (screenWidth < 640) {
        return aboutData.teamMembers.map((_, i) => ({ x: 0, y: i * 220 }));
    } else if (screenWidth < 1024) {
        return [
            { x: -150, y: -100 },
            { x: 150, y: -100 },
            { x: -150, y: 100 },
            { x: 150, y: 100 },
            { x: -150, y: 300 },
            { x: 150, y: 300 },
            { x: 0, y: 500 },
        ];
    } else {
        return [
            { x: -250, y: -200 },
            { x: 250, y: -200 },
            { x: -400, y: 0 },
            { x: 400, y: 0 },
            { x: -250, y: 200 },
            { x: 250, y: 200 },
            { x: 0, y: 400 },
        ];
    }
};

export default function TeamSection() {
    const [positions, setPositions] = useState(
        getPositions(typeof window !== "undefined" ? window.innerWidth : 1024)
    );
    const [containerHeight, setContainerHeight] = useState(800);
    const [triggerAnimation, setTriggerAnimation] = useState(false);
    const containerRef = useRef(null);
    const observerRef = useRef(null);

    // Handle responsive layout and height
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setPositions(getPositions(screenWidth));
            if (screenWidth < 640) {
                setContainerHeight(aboutData.teamMembers.length * 250);
            } else if (screenWidth < 1024) {
                setContainerHeight((aboutData.teamMembers.length / 2) * 300);
            } else {
                setContainerHeight(800);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Observer to track component visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTriggerAnimation(true);
                } else {
                    setTriggerAnimation(false);
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
            observerRef.current = observer;
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    // Loop animation every 10 seconds
    useEffect(() => {
        if (!triggerAnimation) return;
        const interval = setInterval(() => {
            setTriggerAnimation(false); // Reset animation
            setTimeout(() => setTriggerAnimation(true), 0); // Trigger animation again
        }, 10000);

        return () => clearInterval(interval);
    }, [triggerAnimation]);

    return (
        <div
            style={{ marginBottom: "2rem" }}
            className="w-full bg-black flex items-center justify-center px-4 md:px-8 lg:px-16 pt-8"
        >
            <div
                ref={containerRef}
                className="relative w-full max-w-[1200px] min-h-[calc(100vh-8rem)] h-auto flex items-center justify-center flex-wrap"
            >
                {/* Background Image */}
                <div
                    className="absolute w-[200px] h-[100px] md:w-[300px] md:h-[150px] lg:w-[400px] lg:h-[200px] z-20 rounded-lg overflow-hidden"
                >
                    <img
                        src="/assets/images/test.jpg"
                        alt="Epoch"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Team Member Cards */}
                {aboutData.teamMembers.map((member, i) => (
                    <div
                        key={member.id}
                        className={`card ${triggerAnimation ? "card-animate" : ""}`}
                        style={{
                            "--x": `${positions[i]?.x}px`,
                            "--y": `${positions[i]?.y}px`,
                            animationDelay: `${i * 0.4}s`, // Add staggered delays
                        }}
                    >
                        <div className="flex items-start gap-4">
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
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-4">
                            {member.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
