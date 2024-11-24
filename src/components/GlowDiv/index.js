import React from "react";

const GlowDiv = ({ children }) => {
    return (
        <div className="relative w-full max-w-4xl">
            <div className="relative h-full rounded-2xl overflow-hidden">
                <div className={`absolute inset-x-0 bottom-0 h-4 bg-gradient-to-r from-blue-600 to-pink-600`} />
                <div className={`absolute inset-x-0 top-0 h-4 bg-gradient-to-b to-transparent from-blue-700`} />
                <div className={`absolute inset-y-0 left-0 w-4 bg-gradient-to-r to-transparent from-purple-700`} />
                <div className={`absolute inset-y-0 right-0 w-4 bg-gradient-to-r from-transparent to-blue-700`} />
                <div className="relative h-full p-8 flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GlowDiv;