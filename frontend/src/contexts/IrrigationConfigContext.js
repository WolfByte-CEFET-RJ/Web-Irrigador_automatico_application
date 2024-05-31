import React, { createContext, useState, useContext } from "react";

const Context = createContext();

export const IrrigationProvider = ({ children }) => {
    const [irrigationConfig, setConfig] = useState([]);
    const [selectedIrrigationConfig, setSelectedIrrigationConfig] = useState(null);

  const setIrrigationConfig = (data) => {
    setConfig(data);
  };

  return (
    <Context.Provider value={{ irrigationConfig, setIrrigationConfig ,selectedIrrigationConfig, setSelectedIrrigationConfig }}>
      {children}
    </Context.Provider>
  );
};

export const useIrrigationSettings = () => {
  return useContext(Context);
};