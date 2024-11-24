import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollTo = (elementId) => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === `#${elementId}`) {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location, elementId]);
};

export default useScrollTo;
