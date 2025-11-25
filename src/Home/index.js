import About from "../screens/About";
import useCircularScrollPosition from "../hooks/useCircularScrollPosition";
import Cards from "../screens/Cards";

const Home = () => {
    const { position, scrollProgress } = useCircularScrollPosition(600);
    const rotation = scrollProgress * 360;
    const opacity = Math.max(0, 1 - scrollProgress * 1.5);


    return (
        <div>
            <About />
            <Cards />
            <div
                className="absolute bottom-2 left-2 w-48 h-42 md:w-64 md:h-60 lg:w-80 lg:h-72 transition-transform duration-100 ease-out"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
                    opacity: opacity,
                }}
                aria-label="Scroll down indicator"
            >
                <img src="/Assets/images/scroll_puppy.webp" alt="Logo" className="w-full h-full scale-in" />
            </div>
            <div className="fixed top-10 right-20 rotate-[15deg]" onClick={() => window.location = 'mailto:riyam@gmail.com'} style={{ cursor: 'pointer' }} aria-label="Email link">
                <img src="/Assets/images/email.webp" alt="Email" className="h-48 scale-in" />
            </div>
        </div >
    )
};

export default Home;