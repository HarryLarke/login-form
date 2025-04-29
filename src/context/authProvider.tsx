import { createContext, useState, ReactNode } from "react";
//Will receive children!

interface AuthContentType {
    auth: Record<string, any>,
    setAuth: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

interface AuthProviderProps {
    children : ReactNode
}

const AuthContext = createContext<AuthContentType | undefined>(undefined)

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [ auth, setAuth ] = useState({})

    return (
        <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
    )
}

export default AuthContext