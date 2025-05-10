import { createContext, useState, ReactNode, SetStateAction } from "react";

interface AuthData {
    user: string
    roles?: string[]
    accessToken: string
}

interface AuthContentType {
    auth: AuthData
    setAuth: React.Dispatch<SetStateAction<AuthData>>
}

interface AuthProviderProps {
    children : ReactNode
}

const AuthContext = createContext<AuthContentType | undefined>(undefined)

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [ auth, setAuth ] = useState<AuthData>({
        user: "",
        roles: [],
        accessToken: ""
    }) //Auth contains the user data too!

    return (
        <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
    )
}

export default AuthContext