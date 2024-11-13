import React, { createContext, useContext, useState } from "react";
import { createAxiosInstance } from "../services/api";

const GardenContext = createContext();

export const GardenProvider = ({ children }) => {
  const api = createAxiosInstance();
  const [gardenData, setGardenData] = useState([]);
  const [selectedGarden, setSelectedGarden] = useState(null);

  const setGarden = async (data) => {
    for(let i = 0 ; i < data.length ; i++){
      try{
        const response = await api.get(`/measures/garden/${data[i].id}`);
        if(response.data){
          data[i] = response.data;
        }
      }catch(error){
        console.log(error);
      }
    }
    setGardenData(data);
  };

  const setSelectedGardenFunction = async (data) => {
    try{
      const response = await api.get(`/measures/garden/${data.id}`);
      setSelectedGarden(response.data);
    }catch(error){
      setSelectedGarden(data);
      console.log(error);
    }
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
