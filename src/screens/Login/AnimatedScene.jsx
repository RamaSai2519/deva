import React from 'react';
import { motion } from 'framer-motion';
export function AnimatedCharacters({ mousePosition, isPasswordVisible }) {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      {/* Ocean Wave Base) */}
      <motion.path
        d="M 100 200 Q 180 170 260 200"
        fill="#0EA5E9"
        animate={{
          d: isPasswordVisible 
            ? "M 100 200 Q 180 190 260 200"
            : "M 100 200 Q 180 170 260 200"
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.g
        animate={{
          y: [-5, 5, -5],
          transition: { duration: 4, repeat: Infinity }
        }}
      >
        <motion.path
          d="M 120 80 h 80 v 160 h -80 z"
          fill="#7B2CBF"
          rx="4"
        />
        {/* Octocat tentacles */}
        <motion.path
          d="M 130 220 q -10 10 -10 20"
          stroke="#7B2CBF"
          strokeWidth="8"
          fill="none"
          animate={{ 
            d: isPasswordVisible 
              ? "M 130 220 q -15 15 -15 25"
              : "M 130 220 q -10 10 -10 20"
          }}
        />
        {/* Eyes */}
        <motion.g
          animate={{
            x: mousePosition.x / 40,
            y: mousePosition.y / 40,
          }}
        >
          <circle cx="145" cy="120" r="6" fill="white" />
          <circle cx="175" cy="120" r="6" fill="white" />
        </motion.g>
      </motion.g>
      <motion.g
        animate={{
          y: [-3, 3, -3],
          transition: { duration: 3, repeat: Infinity, delay: 0.5 }
        }}
      >
        <rect x="220" y="100" width="60" height="140" fill="#2D2D2D" rx="4" />
        {/* Spiral pattern */}
        <motion.path
          d="M 230 150 q 20 -20 40 0"
          stroke="#3F3F3F"
          strokeWidth="2"
          fill="none"
          animate={{ rotate: isPasswordVisible ? 360 : 0 }}
          transition={{ duration: 2 }}
        />
      </motion.g>
      <motion.g
        animate={{
          y: [-4, 4, -4],
          transition: { duration: 3.5, repeat: Infinity, delay: 1 }
        }}
      >
        <rect x="290" y="120" width="40" height="120" fill="#FFB800" rx="4" />
        <motion.circle
          cx="310"
          cy="150"
          r="8"
          fill="#2D2D2D"
          animate={{
            scale: [1, 1.2, 1],
            transition: { duration: 2, repeat: Infinity }
          }}
        />
      </motion.g>
    </svg>
  );
}

export default AnimatedCharacters;