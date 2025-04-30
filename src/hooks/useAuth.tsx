import { useContext } from "react";
import AuthContext from "../context/authProvider";

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within the AuthProvider.")
    }
    else return context 
}

export default useAuth