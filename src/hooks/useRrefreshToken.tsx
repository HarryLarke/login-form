import axios from "axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async (): Promise<string> => {
        console.log('init useRefresh')
        const response = await axios.get<{accessToken : string, roles : string[]}>('/refresh', {
            withCredentials: true,
        })
        setAuth(prev => {
            console.log(response?.data?.accessToken)
            return {...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        })
        return response.data.accessToken
    }
    return refresh
}
//we are setting the state and getting a new AT returned too!
export default useRefreshToken