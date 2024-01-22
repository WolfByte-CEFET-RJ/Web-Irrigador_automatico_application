import React, { createContext, useState, useContext } from "react";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const signIn = (newToken) => {
    setToken(newToken);
  };

  const signOut = () => {
    setToken(null);
  };


  console.log('AAAA' + token)

  return (
    <Context.Provider value={{ token, signIn, signOut }}>
      {children}
    </Context.Provider>
  )
};

export const useAuth = () => {
  return useContext(Context);
};

