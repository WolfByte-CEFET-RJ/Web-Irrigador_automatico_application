import React, { createContext, useState, useContext } from "react";

const IrrigationConfigContext = createContext();

export const IrrigationProvider = ({ children }) => {
    const [irrigationConfig, setIrrigationConfig] = useState([]);
    const [selectedIrrigationConfig, setSelectedIrrigationConfig] = useState(null);

  const setIrrConfig = (data) => {
    setIrrigationConfig(data);
  };

  return (
    <IrrigationConfigContext.Provider 
    value={{ selectedIrrigationConfig, setSelectedIrrigationConfig, irrigationConfig, setIrrConfig }}>
      {children}
    </IrrigationConfigContext.Provider>
  );
};

export const useIrrigationSettings = () => {
  return useContext(IrrigationConfigContext);
};