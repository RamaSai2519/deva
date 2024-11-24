'use client'

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import aboutData from './about.json'

const positions = [
    { x: -250, y: -200 },
    { x: 250, y: -200 },
    { x: -400, y: 0 },    
    { x: 400, y: 0 },      
    { x: -250, y: 200 },   
    { x: 250, y: 200 },    
    { x: 0, y: 350 }       
];

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
    }

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            <div
                ref={ref}
                className="relative w-[1200px] h-[800px] flex items-center justify-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute w-[400px] h-[200px] z-10 rounded-lg overflow-hidden"
                >
                    <img
                        src="/assets/images/test.jpg"
                        alt="Epoch 3.0"
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
                        className="absolute w-[250px] bg-[#1A1A1A] rounded-xl overflow-hidden text-center p-4"
                        style={{
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
                        }}
                    >
                        <h3 className="text-white text-lg font-semibold">
                            {member.name}
                        </h3>
                        <p className="text-blue-400 text-sm">{member.role}</p>
                        <p className="text-gray-400 text-sm">{member.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}