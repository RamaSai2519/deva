import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollTo = () => {
    const location = useLocation();

    useEffect(() => {
        const elementId = location.hash.replace("#", "");
        if (elementId) {
            console.log("🚀 ~ useEffect ~ elementId:", elementId)
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);
};

export default useScrollTo;
