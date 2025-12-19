import { useRef, useState, useEffect } from "react";
import Peep from "../Peep";

const PeepParent = ({ children, elementId, onClick }) => {
    const [state, setState] = useState({
        isInView: false,
        isSettled: false
    });

    const rafIdRef = useRef(null);
    const tickingRef = useRef(false);

    useEffect(() => {
        const update = () => {
            tickingRef.current = false;
            const element = document.getElementById(elementId);
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const nextIsInView = rect.top < window.innerHeight && rect.bottom > 0;
            const nextIsSettled = rect.bottom <= window.innerHeight;

            setState((prev) => {
                if (prev.isInView === nextIsInView && prev.isSettled === nextIsSettled) return prev;
                return { isInView: nextIsInView, isSettled: nextIsSettled };
            });
        };

        const handleScroll = () => {
            if (tickingRef.current) return;
            tickingRef.current = true;
            rafIdRef.current = window.requestAnimationFrame(update);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        update();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
        };
    }, [elementId]);

    return (
        state.isInView && <Peep onClick={onClick} isSettled={state.isSettled}>{children}</Peep>
    );
};

export default PeepParent;