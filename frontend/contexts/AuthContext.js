import React, { createContext } from "react";

//função que constroe o Provider e também permite consumir os dados globais
export const AuthContext = createContext();

//componente Provider para passar os valores para os childrens
AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false)

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default Provider