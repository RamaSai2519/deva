import { useState, useEffect } from "react";
import Peep from "../Peep";

const PeepParent = ({ children, elementId, onClick }) => {
    const [state, setState] = useState({
        isInView: false,
        isSettled: false
    });

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById(elementId);
            if (element) {
                const rect = element.getBoundingClientRect();
                setState({
                    isInView: rect.top < window.innerHeight && rect.bottom > 0,
                    isSettled: rect.bottom <= window.innerHeight
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [elementId]);

    return (
        state.isInView && <Peep onClick={onClick} isSettled={state.isSettled}>{children}</Peep>
    );
};

export default PeepParent;