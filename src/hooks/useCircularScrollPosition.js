import { useState, useEffect } from 'react';

const useCircularScrollPosition = (maxScrollDistance = 800) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const progress = Math.min(scrollY / maxScrollDistance, 1);
            setScrollProgress(progress);

            const angle = progress * Math.PI * 0.75;
            const radius = 300;

            const x = -radius * Math.sin(angle);
            const y = radius * (1 - Math.cos(angle)) + progress * 400;

            setPosition({ x, y });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [maxScrollDistance]);

    return { position, scrollProgress };
};

export default useCircularScrollPosition;