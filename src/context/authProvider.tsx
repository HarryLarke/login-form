import { createContext, useState, ReactNode, SetStateAction } from "react";
//Will receive children!

//Can  also add varying data to AT? Like users and roles, if that reqires specification
//However, I believe the backend should handle that data?

interface AuthData {
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
    const [ auth, setAuth ] = useState<AuthData>({accessToken:''}) //Auth contains the user data too!

    return (
        <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
    )
}

export default AuthContext