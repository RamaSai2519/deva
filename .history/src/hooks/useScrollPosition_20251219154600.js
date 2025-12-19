import { useEffect, useRef, useState } from 'react';

const useScrollPosition = (height) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrolledHero, setScrolledHero] = useState(false);

    const thresholdRef = useRef(0);
    const rafIdRef = useRef(null);
    const tickingRef = useRef(false);

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
        if (typeof window === 'undefined') return;

        const updateThreshold = () => {
            thresholdRef.current = parseHeight(height) || 0;
        };

        const updateState = () => {
            tickingRef.current = false;
            const nextIsScrolled = window.scrollY >= thresholdRef.current;
            const nextScrolledHero = window.scrollY >= window.innerHeight;

            setIsScrolled((prev) => (prev === nextIsScrolled ? prev : nextIsScrolled));
            setScrolledHero((prev) => (prev === nextScrolledHero ? prev : nextScrolledHero));
        };

        const onScroll = () => {
            if (tickingRef.current) return;
            tickingRef.current = true;
            rafIdRef.current = window.requestAnimationFrame(updateState);
        };

        updateThreshold();
        updateState();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateThreshold, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateThreshold);
            if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
        };
    }, [height]);

    return { isScrolled, scrolledHero };
};

export default useScrollPosition;
