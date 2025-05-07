import { InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRrefreshToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        console.log('Axios Private init') //This send my AT 
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                } 
                return config
            }, (error) => Promise.reject(error) 
        )
        
        //response intercept is not working or activating??
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,  
            async (error) => {
                const prevRequest = error?.config
                if(error?.response?.status === 403 &&!prevRequest?.sent) {
                    console.log('Response Incepting')
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            })
        
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
            }

    }, [auth, refresh])
    
    return axiosPrivate
}

export default useAxiosPrivate