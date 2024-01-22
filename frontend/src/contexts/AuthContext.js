import React, { createContext, useState, useContext } from "react";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [gardenData, setGardenData] = useState(null);

  const signIn = (newToken) => {
    setToken(newToken);
  };

  const signOut = () => {
    setToken(null);
  };

  const setGarden = (data) => {
    setGardenData(data);
  };

  return (
    <Context.Provider value={{ token, signIn, signOut, gardenData, setGarden }}>
      {children}
    </Context.Provider>
  )
};

export const useAuth = () => {
  return useContext(Context);
};

