import { isAxiosError } from "axios";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
   const { setAuth } = useAuth()

   const logout = async () => {
    setAuth({
        accessToken: '',
        roles: [],
        user: ''
    })
    try{ 
        await axios.get('/logout', {
            withCredentials: true
        }) 
    } catch(err: unknown){
        if(isAxiosError(err)) {
        console.error(err.message) }
    } 
   }
   return logout
}

export default useLogout