import { useState, useEffect, useRef } from 'react';

const Cards = () => {
    const h1Ref = useRef(null);
    const cardsRef = useRef(null);
    const [scale, setScale] = useState(1.75);
    const [cardsProgress, setCardsProgress] = useState(0);

    const handleScroll = () => {
        if (h1Ref.current) {
            const element = h1Ref.current;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;

            if (elementTop <= windowHeight && elementTop + elementHeight >= 0) {
                const visibleProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
                const clampedProgress = Math.max(0, Math.min(1, visibleProgress));

                const newScale = 1.75 - (0.75 * clampedProgress);
                setScale(Math.max(1, newScale));
            } else if (elementTop > windowHeight) {
                setScale(1.75);
            } else {
                setScale(1);
            }
        }

        if (cardsRef.current) {
            const cardsElement = cardsRef.current;
            const cardsRect = cardsElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const cardsTop = cardsRect.top;
            const cardsHeight = cardsRect.height;

            if (cardsTop <= windowHeight && cardsTop + cardsHeight >= 0) {
                const visibleProgress = (windowHeight - cardsTop) / (windowHeight + cardsHeight);
                const clampedProgress = Math.max(0, Math.min(1, visibleProgress));
                setCardsProgress(clampedProgress);
            } else if (cardsTop > windowHeight) { setCardsProgress(0); } else { setCardsProgress(1); }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Card data configuration
    const cardData = [
        { alt: 'Client Work' },
        { alt: 'Exhibit Features' },
        { alt: 'Personal Work & Art Shop' },
        { alt: 'Blog & Writing' },
        { alt: 'Contact & Socials' }
    ];

    const cardBaseStyle = {
        left: '50%',
        top: '50%',
        marginLeft: '-128px',
        marginTop: '-160px',
        transition: 'transform 0.4s ease-out',
        cursor: 'pointer'
    };

    const getCardStyle = (index) => {
        const startPosition = 0;
        const finalPositions = { 0: -1400, 1: -700, 2: 0, 3: 700, 4: 1400 };
        const currentX = startPosition + (finalPositions[index] - startPosition) * cardsProgress;

        return {
            ...cardBaseStyle,
            transform: `translateX(${currentX}px)`,
            '--card-x': `${currentX}px`
        };
    };

    return (
        <div className="w-full h-full pt-20 flex-row min-h-screen justify-center overflow-hidden">
            <div ref={h1Ref} className='w-full h-full flex justify-center' style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.1s ease-out',
                transformOrigin: 'center'
            }}
            >
                <h1 className="text-8xl" style={{ fontFamily: 'Times New Roman, sans-serif', fontWeight: 'bold', color: '#916f41' }}>What's in the cards for us?</h1>
            </div>
            <div ref={cardsRef} className='p-6 flex justify-center w-full relative min-h-[625px] overflow-hidden'>
                {cardData.map((card, index) => (
                    <img
                        key={index}
                        src='/Assets/images/about_card.webp'
                        alt={card.alt}
                        className="absolute h-[450px] object-cover rounded-3xl card-hover-effect"
                        style={getCardStyle(index)}
                    />
                ))}
            </div>
            <div className='w-full flex justify-center'>
                <h1 className='text-3xl'>Let's connect</h1>
            </div>
            <div className='absolute bottom-30 left-10 text-3xl animate-pop-rotated'>
                Pick a card,<br />any card!
            </div>

        </div>
    );
};

export default Cards;
