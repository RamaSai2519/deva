import { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from 'prop-types';

const AboutMobile = ({
    teamMembers,
    mainImage,
    animationDelay = 200,
    intersectionThreshold = 0.1
}) => {
    const containerRef = useRef(null);
    const [animatedCards, setAnimatedCards] = useState([]);

    const handleIntersection = useCallback((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                teamMembers.forEach((_, index) => {
                    setTimeout(() => {
                        setAnimatedCards((prev) => [...prev, index]);
                    }, index * animationDelay);
                });
            } else {
                setAnimatedCards([]);
            }
        });
    }, [teamMembers, animationDelay]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: intersectionThreshold });

        const currentContainer = containerRef.current;
        if (currentContainer) observer.observe(currentContainer);

        return () => {
            if (currentContainer) observer.unobserve(currentContainer);
        };
    }, [handleIntersection, intersectionThreshold]);

    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center px-4"
            ref={containerRef}
        >
            <div className="w-[250px] h-[150px] md:w-[300px] md:h-[150px] lg:w-[400px] lg:h-[200px] z-20 rounded-lg overflow-hidden my-5">
                <img
                    src={mainImage}
                    alt="Team"
                    className="w-full h-full object-cover"
                    aria-label="Team image"
                />
            </div>

            {/* GitHub Community Club credit */}
            <p className="text-xs text-slate-500 text-center mb-4">
                Powered by the GitHub Community Club
            </p>
            <div className="">
                {teamMembers.map((member, index) => {
                    const isCoreTeam = member.role === "Core Team";
                    return (
                        <div
                            key={member.id}
                            className={`card-mobile flex items-center gap-4 mb-8 transform transition-all duration-500 ease-out group ${animatedCards.includes(index)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-10"
                                } ${isCoreTeam ? "ring-1 ring-blue-500/30 rounded-lg p-3" : ""}`}
                            style={{
                                transitionDelay: `${index * 300}ms`,
                            }}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-16 h-16 rounded-lg object-cover"
                                aria-label={`${member.name}'s profile picture`}
                            />
                            <div>
                                <h3 className="text-lg font-semibold group-hover:text-white transition-colors">{member.name}</h3>
                                <p className="text-blue-400 text-sm group-hover:text-blue-300 transition-colors">{member.role}</p>
                                <p className="text-gray-400 text-sm mt-2 group-hover:text-gray-300 transition-colors">{member.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

AboutMobile.propTypes = {
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

export default AboutMobile;