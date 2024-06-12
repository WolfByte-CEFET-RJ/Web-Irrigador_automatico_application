import React, { createContext, useContext, useState } from "react";
import { createAxiosInstance } from "../services/api";

const GardenContext = createContext();

export const GardenProvider = ({ children }) => {
  const api = createAxiosInstance();
  const [gardenData, setGardenData] = useState([]);
  const [selectedGarden, setSelectedGarden] = useState(null);

  const setGarden = (data) => {

    
    setGardenData(data);
  };

  const setSelectedGardenFunction = async (data) => {
    const response = await api.get(`/measures/garden/${data.id}`);
    setSelectedGarden(response.data);
      // lastMeasure: response.data.lastMeasures ? response.data.lastMeasures[0] : null});
  }

  return (
    <GardenContext.Provider
      value={{ selectedGarden, setSelectedGardenFunction, gardenData, setGarden }}
    >
      {children}
    </GardenContext.Provider>
  );
};

export const useGarden = () => {
  return useContext(GardenContext);
};
