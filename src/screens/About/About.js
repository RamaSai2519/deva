import { lazy, Suspense } from "react";
import PropTypes from 'prop-types';
import useDeviceType from "../../hooks/useDeviceType";

const AboutDesktop = lazy(() => import('./AboutDesktop'));
const AboutMobile = lazy(() => import('./AboutMobile'));

const About = ({
    teamMembers,
    mainImage,
    desktopAnimationDelay = 0.4,
    mobileAnimationDelay = 200,
    intersectionThreshold = 0.1
}) => {
    const isDesktop = useDeviceType();

    return (
        <div className="relative" id="about">
            <div id="core-team" className="w-full h-full min-h-screen flex items-center justify-center">
                <Suspense fallback={<div>Loading...</div>}>
                    {isDesktop ? (
                        <AboutDesktop
                            teamMembers={teamMembers}
                            mainImage={mainImage}
                            animationDelay={desktopAnimationDelay}
                            intersectionThreshold={intersectionThreshold}
                        />
                    ) : (
                        <AboutMobile
                            teamMembers={teamMembers}
                            mainImage={mainImage}
                            animationDelay={mobileAnimationDelay}
                            intersectionThreshold={intersectionThreshold}
                        />
                    )}
                </Suspense>
            </div>
            <div className="bg-[linear-gradient(to_bottom,_transparent_0%,_black_100%)] w-full h-20 absolute bottom-0 ring-0 left-0 z-10" />
        </div>
    );
};

About.propTypes = {
    teamMembers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
    mainImage: PropTypes.string.isRequired,
    desktopAnimationDelay: PropTypes.number,
    mobileAnimationDelay: PropTypes.number,
    intersectionThreshold: PropTypes.number,
};

export default About;