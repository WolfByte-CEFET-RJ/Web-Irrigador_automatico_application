import { createContext } from "react";
import * as auth from  '../services/auth'

const AuthContext = createContext({
  signed: false,
  token: "",
  user: {},
  signIn: async () => {}, // Adicione a implementação real do método
});

export const AuthProvider = ({ children }) => {

//   async function signIn(){
//     const response = await auth.signIn2();

//     console.log(response);
//   }

    

  return (
    <AuthContext.Provider value={{ signed: false, token: "", user: {}, signIn }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;