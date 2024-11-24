import React, { useState, useEffect } from "react";

const Peep = ({ children }) => {
    const [isCircle, setIsCircle] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsCircle(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed bottom-0 right-0 left-0 h-max z-50">
            <div className="w-full flex justify-center items-center">
                <div
                    id="circloid"
                    className={`flex justify-center items-center transition-all duration-1000 mb-5 bg-red-600 
                        ${isCircle ? "w-12 h-12 rounded-full" : "w-48 min-w-0 h-12 rounded-2xl p-2"} 
                        ${isVisible ? "translate-y-0" : "translate-y-20"}`}
                >
                    {!isCircle && children}
                </div>
            </div>
        </div>
    );
};

export default Peep;