'use client'

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const teamMembers = [
    {
        id: 1,
        name: "Event Head",
        role: "Core Team",
        description: "Leading all coordination and execution of Epoch 3.0, ensuring seamless integration of all events and activities."
    },
    {
        id: 2,
        name: "Technical Lead",
        role: "Tech Team",
        description: "Managing all technical aspects of the fest including workshops, hackathons, and coding competitions."
    },
    {
        id: 3,
        name: "Creative Director",
        role: "Design Team",
        description: "Overseeing the visual identity and creative direction of all fest materials and presentations."
    },
    {
        id: 4,
        name: "Operations Head",
        role: "Management",
        description: "Coordinating logistics, venue management, and smooth execution of all events."
    },
    {
        id: 5,
        name: "Marketing Lead",
        role: "Outreach Team",
        description: "Driving promotional strategies and social media presence for maximum engagement."
    },
    {
        id: 6,
        name: "Content Head",
        role: "Media Team",
        description: "Creating and managing all content including social media, website, and promotional materials."
    }
]

const getRandomPosition = (index) => {
    const positions = [
        { x: -300, y: -200 },  
        { x: 300, y: -200 },   
        { x: -400, y: 0 },     
        { x: 400, y: 0 },      
        { x: -300, y: 200 },   
        { x: 300, y: 200 }     
    ]
    return positions[index]
}

export default function TeamSection() {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: false
    })

    useEffect(() => {
        if (inView) {
            controls.start("animate")
        } else {
            controls.start("initial")
        }
    }, [inView, controls])

    const cardVariants = {
        initial: {
            x: 0,
            y: 0,
            scale: 0.7,
            opacity: 0,
            rotateZ: -5,
        },
        animate: (i) => ({
            x: getRandomPosition(i).x,
            y: getRandomPosition(i).y,
            scale: 1,
            opacity: 1,
            rotateZ: 0,
            transition: {
                type: "spring",
                stiffness: 40,    
                damping: 15, 
                mass: 1.2, 
                delay: i * 0.15,  
                duration: 1.5     
            }
        })
    }

    return (
        <div ref={ref} className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-20">
            <div className="relative w-full max-w-[1400px] aspect-[16/9] flex items-center justify-center">
                {/* Center Image/Logo */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] aspect-video"
                >
                    <img
                        src="/assets/images/test.jpg"
                        alt="Epoch 3.0"
                        className="w-full h-full object-contain"
                    />
                </motion.div>

                {teamMembers.map((member, i) => (
                    <motion.div
                        key={member.id}
                        custom={i}
                        variants={cardVariants}
                        initial="initial"
                        animate={controls}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] bg-zinc-900/90 rounded-lg overflow-hidden backdrop-blur-sm"
                        style={{
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <div className="relative p-6">
                            {/* Small image in top right */}
                            <div className="absolute top-2 right-2 w-8 h-8 rounded-full overflow-hidden bg-blue-500/10">
                                <img
                                    src="/assets/images/githubLogo.png"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-white text-xl font-semibold mb-1">
                                {member.name}
                            </h3>
                            <p className="text-blue-400 text-sm mb-3">
                                {member.role}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {member.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}