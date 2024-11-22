import { useState, useEffect } from 'react';

const useScrollPosition = (height) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrolledHero, setScrolledHero] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= height);
            setScrolledHero(window.scrollY >= window.innerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [height]);

    return { isScrolled, scrolledHero };
};

export default useScrollPosition;
