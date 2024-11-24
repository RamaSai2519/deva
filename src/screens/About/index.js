'use client'
import { motion } from "framer-motion"
import React, { useState } from "react"
import { useInView } from "react-intersection-observer"

const teamMembers = [
    {
        id: 1,
        name: "John Doe",
        role: "Developer",
        bio: "John is a software developer with 10 years of experience.",
        image: "path/to/image1.jpg"
    },
    {
        id: 2,
        name: "Jane Smith",
        role: "Designer",
        bio: "Jane is a creative designer with a passion for user experience.",
        image: "path/to/image2.jpg"
    },
    {
        id: 3,
        name: "Mike Johnson",
        role: "Project Manager",
        bio: "Mike is an experienced project manager who ensures everything runs smoothly.",
        image: "path/to/image3.jpg"
    }
];

export default function AboutTeam() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    })

    return (
        <section className="py-24 bg-black text-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                >
                    Meet Our Core Team
                </motion.h2>
<motion.div
    initial="collapsed"
    animate={isExpanded ? "expanded" : "collapsed"}
    onClick={() => setIsExpanded(true)}
    className={`grid transition-all duration-700 ${isExpanded
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "grid-cols-1 place-items-center"
        }`}
>
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard
                            key={member.id}
                            member={member}
                            index={index}
                            isExpanded={isExpanded}
                            inView={inView}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function TeamMemberCard({ member, index, isExpanded, inView }) {
    const cardVariants = {
        collapsed: {
            scale: 0.8,
            opacity: 0.5,
            x: 0,
            y: 0,
            position: "absolute",
            zIndex: teamMembers.length - index,
            transition: {
                duration: 0.4,
            }
        },
        expanded: {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            position: "relative",
            zIndex: 1,
            transition: {
                duration: 0.4,
                delay: index * 0.1,
            }
        }
    }

    return (
        <motion.div
            variants={cardVariants}
            className={`group relative overflow-hidden rounded-2xl bg-gray-900 
                ${!isExpanded ? "w-64 absolute" : "w-full"}`}
            style={{
                transform: !isExpanded ? `translateY(${index * -4}px)` : "none"
            }}
        >
            <div className="aspect-square overflow-hidden">
                <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end"
            >
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {member.bio}
                </p>
            </motion.div>
        </motion.div>
    )
}