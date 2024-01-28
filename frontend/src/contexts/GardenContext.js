import React, { createContext, useContext, useState } from 'react';

const GardenContext = createContext();

export const GardenProvider = ({ children }) => {
    const [gardenData, setGardenData] = useState([]);
    const [selectedGarden, setSelectedGarden] = useState(null);

    const setGarden = (data) => {
        setGardenData(data);
    };
    

    return (
    <GardenContext.Provider value={{ selectedGarden, setSelectedGarden, gardenData, setGarden }}>
        {children}
    </GardenContext.Provider>
    );
};

export const useGarden = () => {
    return useContext(GardenContext);
}