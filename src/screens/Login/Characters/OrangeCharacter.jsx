import React from 'react';
import { motion } from 'framer-motion';

export function OrangeCharacter({ mousePosition, isPasswordVisible }) {
  return (
    <motion.g
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <motion.path
        d="M 0 50 A 50 50 0 0 1 100 50"
        fill="#FF9F1C"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* Eyes */}
      <motion.g
        animate={{
          x: isPasswordVisible ? -20 : mousePosition.x / 20,
          y: isPasswordVisible ? 10 : mousePosition.y / 20
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <circle cx="30" cy="35" r="3" fill="black" />
        <circle cx="70" cy="35" r="3" fill="black" />
      </motion.g>
      {/* Mouth */}
      <motion.path
        d="M 40 40 Q 50 45 60 40"
        stroke="black"
        strokeWidth="2"
        fill="none"
        animate={{
          d: isPasswordVisible 
            ? "M 40 45 Q 50 50 60 45" // Happy
            : "M 40 40 Q 50 45 60 40" // Normal
        }}
      />
    </motion.g>
  );
}

export default OrangeCharacter;