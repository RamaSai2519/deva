import React, { useState, useEffect } from "react";

const Peep = ({ children, isSettled }) => {
    const [state, setState] = useState({
        isCircle: true,
        isVisible: false,
        shouldRender: false
    });

    useEffect(() => {
        const timers = [
            setTimeout(() => setState(prev => ({ ...prev, isCircle: false })), 1000),
            setTimeout(() => setState(prev => ({ ...prev, isVisible: true })), 500),
            setTimeout(() => setState(prev => ({ ...prev, shouldRender: true })), 1500)
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    return (
        <div className={`fixed ${isSettled ? 'relative w-full' : 'bottom-0'} right-0 left-0 h-max z-20 animate-fade-in`}>
            <div className="w-full flex justify-center items-center">
                <div
                    id="circloid"
                    className={`flex justify-center items-center rounded-full transition-all duration-1000 mb-5 bg-lightBlack bg-opacity-80
                        ${state.isCircle ? "w-12 h-12" : "w-1/3 min-h-12 h-auto p-2"} 
                        ${state.isVisible ? "translate-y-0" : "translate-y-20"}
                        animate-fade-in
                        `}
                >
                    {state.shouldRender && children}
                </div>
            </div>
        </div>
    );
};

export default Peep;