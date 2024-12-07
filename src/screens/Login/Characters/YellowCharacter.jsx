import React from 'react';
import { motion } from 'framer-motion';

export function YellowCharacter({ mousePosition, isPasswordVisible }) {
  return (
    <motion.g
      initial={{ x: 40, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        y: [-3, 3, -3],
      }}
      transition={{ 
        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
        default: { delay: 0.6 }
      }}
    >
      <rect x="150" y="40" width="30" height="90" fill="#FFB800" rx="8" />
      <motion.g
        animate={{
          x: isPasswordVisible ? 5 : mousePosition.x / 100,
          y: isPasswordVisible ? -5 : mousePosition.y / 100,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <circle cx="165" cy="60" r="2" fill="black" />
        <path
          d="M 160 70 Q 165 75 170 70"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </motion.g>
    </motion.g>
  );

}

export default YellowCharacter;