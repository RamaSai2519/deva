'use client'

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import aboutData from './about.json'

const getPositions = (screenWidth) => {
    if (screenWidth < 640) { // Mobile
        return aboutData.teamMembers.map((_, i) => ({ x: 0, y: i * 220 })); // Stacked vertically
    } else if (screenWidth < 1024) { // Tablet
        return [
            { x: -150, y: -100 },
            { x: 150, y: -100 },
            { x: -150, y: 100 },
            { x: 150, y: 100 },
            { x: -150, y: 300 },
            { x: 150, y: 300 },
            { x: 0, y: 500 }
        ];
    } else { // Desktop
        return [
            { x: -250, y: -200 },
            { x: 250, y: -200 },
            { x: -400, y: 0 },
            { x: 400, y: 0 },
            { x: -250, y: 200 },
            { x: 250, y: 200 },
            { x: 0, y: 400 }
        ];
    }
};

export default function TeamSection() {
    const [positions, setPositions] = useState(getPositions(typeof window !== 'undefined' ? window.innerWidth : 1024));
    const [containerHeight, setContainerHeight] = useState(800); // Default height for desktop
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: false
    });
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setPositions(getPositions(screenWidth));
            if (screenWidth < 640) {
                setContainerHeight(aboutData.teamMembers.length * 250);
            } else if (screenWidth < 1024) {
                setContainerHeight(aboutData.teamMembers.length / 2 * 300);
            } else {
                setContainerHeight(800);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Control animations based on visibility
    useEffect(() => {
        if (inView) {
            controls.start("animate");
        } else {
            controls.start("initial");
        }
    }, [inView, controls]);

    const cardVariants = {
        initial: {
            opacity: 0,
            scale: 0.8,
            x: 0,
            y: 0
        },
        animate: (i) => ({
            opacity: 1,
            scale: 1,
            x: positions[i].x,
            y: positions[i].y,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: i * 0.2
            }
        })
    };

    return (
        <div
            style={{ marginBottom: '4rem', height: containerHeight }}
            className="w-full bg-black flex items-center justify-center px-4 md:px-8 lg:px-16"
        >
            <div
                ref={ref}
                className="relative w-full max-w-[1200px] h-auto flex items-center justify-center flex-wrap"
                style={{ position: 'relative' }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute w-[200px] h-[100px] md:w-[300px] md:h-[150px] lg:w-[400px] lg:h-[200px] z-10 rounded-lg overflow-hidden"
                >
                    <img
                        src="/assets/images/test.jpg"
                        alt="Epoch"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {aboutData.teamMembers.map((member, i) => (
                    <motion.div
                        key={member.id}
                        custom={i}
                        variants={cardVariants}
                        initial="initial"
                        animate={controls}
                        className="absolute w-[280px] bg-[#1A1A1A] rounded-xl overflow-hidden text-left p-4"
                        style={{
                            boxShadow: "0px 8px rgba(32 ,32)"
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="text-white text-lg font-semibold">
                                    {member.name}
                                </h3>
                                <p className="text-blue-400 text-sm">{member.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-4">{member.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
