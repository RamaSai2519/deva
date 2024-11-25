import React from "react";
import { IoClose } from "react-icons/io5";

const GiantPopup = ({ visible, setVisible, children }) => {
    return (
        <div className={`fixed right-0 left-0 top-0 w-full h-full z-50 pt-10 px-10 overflow-auto transition-all duration-500 ${visible ? 'visible backdrop-blur-md' : 'invisible'}`}>
            <div className={`bg-black w-full h-auto min-h-full rounded-3xl transition-all duration-500 p-4 ${visible ? 'animate-climb-up' : 'blur-3xl animate-fade-out'}`}>
                <div className="flex justify-end">
                    <button onClick={() => setVisible(false)} className="text-mutedWhite rounded-full bg-lightBlack p-1 hover:text-white">
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