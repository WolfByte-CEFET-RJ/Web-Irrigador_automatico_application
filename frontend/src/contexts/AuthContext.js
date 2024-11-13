import React, { createContext, useState, useContext } from "react";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [resetToken, setResetToken] = useState(null);

  
  console.log(token);
  const signIn = (newToken) => {
    setToken(newToken);
  };

  const signOut = () => {
    setToken(null);
  };

  const setReset = (newResetToken) => {
    setResetToken(newResetToken);
  }

  const unsetReset = () =>{
    setResetToken(null);
  }

  return (
    <Context.Provider value={{ token, signIn, signOut, resetToken, setReset, unsetReset }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  return useContext(Context);
};
