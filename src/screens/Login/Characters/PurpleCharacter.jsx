import React from 'react';
import { motion } from 'framer-motion';

export function PurpleCharacter({ mousePosition, isPasswordVisible }) {
  return (
    <motion.g
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <rect x="20" y="0" width="60" height="120" fill="#7B2CBF" rx="4" />
      {/* Eyes */}
      <motion.g
        animate={{
          x: isPasswordVisible ? 20 : mousePosition.x / 20,
          y: isPasswordVisible ? -10 : mousePosition.y / 20,
          rotate: isPasswordVisible ? -20 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <circle cx="35" cy="20" r="4" fill="white" />
        <circle cx="65" cy="20" r="4" fill="white" />
      </motion.g>
      {/* Mouth */}
      <motion.rect
        x="45"
        y="30"
        width="10"
        height="2"
        fill="white"
        animate={{
          rotate: isPasswordVisible ? -45 : 0,
          x: isPasswordVisible ? 50 : 45
        }}
      />
    </motion.g>
  );
}

export default PurpleCharacter;