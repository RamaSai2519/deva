import React from 'react';
import { motion } from 'framer-motion';

export function BlackCharacter({ mousePosition, isPasswordVisible }) {
    return (
        <motion.g
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            <rect x="90" y="20" width="40" height="100" fill="#2D2D2D" rx="4" />
            {/* Eyes */}
            <motion.g
                animate={{
                    x: isPasswordVisible ? 30 : mousePosition.x / 20,
                    y: isPasswordVisible ? -15 : mousePosition.y / 20,
                    rotate: isPasswordVisible ? 45 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <circle cx="105" cy="40" r="4" fill="white" />
                <circle cx="115" cy="40" r="4" fill="white" />
            </motion.g>
        </motion.g>
    );
}

export default BlackCharacter;