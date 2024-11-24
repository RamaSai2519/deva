import React from "react";

const GlowBox = ({ children }) => {
    const color = "blue-700";
    const h = "4";
    const w = "4";

    return (
        <div className="relative w-full max-w-4xl">
            <div className="relative h-full rounded-2xl overflow-hidden">
                <div className={`absolute inset-x-0 bottom-0 h-${h} bg-gradient-to-b from-transparent to-${color}`} />
                <div className={`absolute inset-x-0 top-0 h-${h} bg-gradient-to-b to-transparent from-${color}`} />
                <div className={`absolute inset-y-0 left-0 w-${w} bg-gradient-to-r to-transparent from-${color}`} />
                <div className={`absolute inset-y-0 right-0 w-${w} bg-gradient-to-r from-transparent to-${color}`} />
                <div className="relative h-full p-8 flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GlowBox;