import { useState, useEffect } from 'react';

const useScrollPosition = (height) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrolledHero, setScrolledHero] = useState(false);

    const parseHeight = (height) => {
        if (typeof height === 'string') {
            if (height.endsWith('vh')) {
                return (window.innerHeight * parseInt(height)) / 100;
            } else if (height.endsWith('px')) {
                return parseInt(height);
            }
        }
        return height;
    };

    useEffect(() => {
        const handleScroll = () => {
            const parsedHeight = parseHeight(height);
            setIsScrolled(window.scrollY >= parsedHeight);
            setScrolledHero(window.scrollY >= window.innerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [height]);

    return { isScrolled, scrolledHero };
};

export default useScrollPosition;
