import React, { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [configData, setConfigData] = useState([]);
    const [selectedConfig, setSelectedConfig] = useState(null);

    const setConfig = (data) => {
        setConfigData(data);
    };
    

    return (
    <ConfigContext.Provider value={{ selectedConfig, setSelectedConfig, configData, setConfig }}>
        {children}
    </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    return useContext(ConfigContext);
}