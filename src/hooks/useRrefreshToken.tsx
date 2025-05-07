import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async (): Promise<string> => {
        const response = await axios.get<{accessToken : string, roles : string[]}>('/refresh', {
            withCredentials: true
        })
        setAuth(prev => {
            return {...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
        }})
        return response.data.accessToken
    }
    return refresh
}

export default useRefreshToken