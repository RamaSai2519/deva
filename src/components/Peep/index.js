import { useState, useEffect } from "react";
import PlusIcon from "../../Icons/Plusicon";


const Peep = ({ children, isSettled, onClick }) => {
    const [state, setState] = useState({
        isCircle: true,
        isVisible: false,
        shouldRender: false
    });

    useEffect(() => {
        const timers = [
            setTimeout(() => setState(prev => ({ ...prev, isCircle: false })), 1000),
            setTimeout(() => setState(prev => ({ ...prev, isVisible: true })), 500),
            setTimeout(() => setState(prev => ({ ...prev, shouldRender: true })), 1700)
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    return (
        <div className={`fixed ${isSettled ? 'relative w-full' : 'bottom-0'} right-0 left-0 h-max z-20 animate-fade-in`}>
            <div className="w-full flex justify-center items-center">
                <div
                    onClick={onClick}
                    id="circloid"
                    className={`flex cursor-pointer items-center rounded-full transition-all duration-1000 mb-5 bg-lightBlack bg-opacity-80
                                ${state.isCircle ? "w-12 h-12 justify-center" : "w-[80%] md:w-[30%] min-h-12 h-auto p-2 pr-3 justify-between"}
                                ${state.isVisible ? "translate-y-0" : "translate-y-20"}
                                animate-fade-in overflow-hidden gap-4
                                `}
                >
                    {state.isVisible &&
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full`}>
                            <PlusIcon />
                        </div>}
                    {state.shouldRender && children}
                </div>
            </div>
        </div>
    );
};

export default Peep;