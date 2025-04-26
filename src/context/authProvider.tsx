import { createContext, useState, reactNode } from "react";
//Will receive children!


const AuthContext:object = createContext({})

export const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState({})

    return (
        <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContent.Provider>
    )
}

export default AuthContext