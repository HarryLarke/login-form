import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async (): Promise<string> => {
        console.log('init useRefresh')
        const response = await axios.get<{accessToken : string, roles : string[]}>('/refresh', {
            withCredentials: true
        })
        const accessToken = response?.data?.accessToken
        setAuth(accessToken)
        return accessToken
    }
    return refresh
}

export default useRefreshToken