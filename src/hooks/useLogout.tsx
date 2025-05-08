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
        const response = await axios.get('/logout', {
            withCredentials: true
        }) 
        console.log(response.status)
    } catch(err: unknown){
        if(isAxiosError(err)) {
        console.error(err.message) }
    } finally{
        console.log('Signing Out!')
    }
   }
   return logout
}

export default useLogout