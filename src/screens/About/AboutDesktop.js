import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from 'prop-types';

const AboutDesktop = ({
    teamMembers,
    mainImage,
    animationDelay = 0.4,
    intersectionThreshold = 0.1
}) => {
    const parentRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { setIsVisible(entry.isIntersecting); },
            { threshold: intersectionThreshold }
        );

        const currentRef = parentRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => { if (currentRef) observer.unobserve(currentRef) };
    }, [intersectionThreshold]);

    const positions = useMemo(() => [
        { x: -200, y: -200 },
        { x: 200, y: -200 },
        { x: -400, y: 0 },
        { x: 400, y: 0 },
        { x: -300, y: 200 },
        { x: 300, y: 200 },
        { x: 0, y: 250 },
    ], []);

    return (
        <div
            ref={parentRef}
            className={`relative w-full h-full flex items-center justify-center ${isVisible ? "parent-animate-in" : "animate-fade-out"}`}
        >
            <div className="absolute w-[200px] h-[100px] md:w-[300px] md:h-[150px] lg:w-[400px] lg:h-[200px] z-20 rounded-lg overflow-hidden">
                <img src={mainImage} alt="Team" className="w-full h-full object-cover" aria-label="Team image" />
            </div>

            {teamMembers.map((member, i) => (
                <div
                    key={member.id}
                    className="card"
                    style={{
                        "--x": `${positions[i]?.x}px`,
                        "--y": `${positions[i]?.y}px`,
                        animationDelay: `${i * animationDelay}s`,
                    }}
                >
                    <div className="flex items-start gap-4">
                        <img src={member.image} alt={member.name} className="w-16 h-16 rounded-lg object-cover" aria-label={`${member.name}'s profile picture`} />
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
    );
};

AboutDesktop.propTypes = {
    teamMembers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
    mainImage: PropTypes.string.isRequired,
    animationDelay: PropTypes.number,
    intersectionThreshold: PropTypes.number,
};

export default AboutDesktop;