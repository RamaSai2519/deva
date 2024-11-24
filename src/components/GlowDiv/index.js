import React from "react";

const GlowDiv = ({ children }) => {
    return (
        <div className="relative w-full max-w-4xl">
            <div className="relative h-full rounded-2xl overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-r from-blue-600 to-pink-600 mask-gradient-top" />
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-l from-blue-600 to-pink-600 mask-gradient-bottom" />
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-t from-blue-600 to-pink-600 mask-gradient-right" />
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-b from-blue-600 to-pink-600 mask-gradient-left" />
                <div className="relative h-full p-8 flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GlowDiv;