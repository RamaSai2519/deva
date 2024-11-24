
import React, { createContext, useState, useContext } from 'react';

const HoveredMenuContext = createContext();

export const HoveredMenuProvider = ({ children }) => {
    const [hoveredMenu, setHoveredMenu] = useState(null);

    return (
        <HoveredMenuContext.Provider value={{ hoveredMenu, setHoveredMenu }}>
            {children}
        </HoveredMenuContext.Provider>
    );
};

export const useHoveredMenu = () => useContext(HoveredMenuContext);