import React from "react";
import { IoClose } from "react-icons/io5";

const GiantPopup = ({ visible, setVisible, children }) => {
    if (!visible) return null;
    return (
        <div className="fixed right-0 left-0 top-0 backdrop-blur-md w-full h-full z-50 p-10">
            <div className="bg-black w-full h-auto min-h-full rounded-3xl p-4">
                <div className="flex justify-end">
                    <button onClick={() => setVisible(false)} className="text-mutedWhite rounded-full bg-lightBlack p-1">
                        <IoClose className="text-2xl" />
                    </button>
                </div>
                <div className="w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GiantPopup;