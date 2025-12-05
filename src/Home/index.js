import FAQ from "../screens/faq";
import Info from "../screens/Info";
import Hero from "../screens/Hero";
import Team from "../screens/Team";
import Intro from "../screens/Intro";
import Events from "../screens/Events";
import About from "../screens/About/About";
import aboutData from "../screens/About/about.json";
import ErrorBoundary from "../components/ErrorBoundary";
import { useHoveredMenu } from "../contexts/hoveredMenuContext";

const Home = () => {
    const { hoveredMenu } = useHoveredMenu();

    return (
        <div className={`${hoveredMenu && 'transition-all duration-700 blur-md'} w-full flex flex-col`}>
            <Hero />
            <Info />
            <Intro />
            <Events />
            <ErrorBoundary>
                <About teamMembers={aboutData.teamMembers} mainImage="/assets/images/test.jpg" />
            </ErrorBoundary>
            <Team />
            <FAQ />
        </div>
    )
};

export default Home;