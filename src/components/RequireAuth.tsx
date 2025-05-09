import { useLocation, Navigate, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";

interface RequireAuthProps {
    allowedRoles : number[]
}

interface DecodedToken {
        UserInfo: {
        roles: string[]
        user: string
        }
}

const RequireAuth = ({allowedRoles}: RequireAuthProps) => {
    const { auth } = useAuth()
    const location = useLocation()

       
    const decoded = auth?.accessToken ? jwtDecode<DecodedToken>(auth.accessToken) : undefined
    const roles = decoded?.UserInfo?.roles.map(role => Number(role)) || []

    
    return(
        roles.find(role => allowedRoles.includes(role)) //I believe includes searches through stirng types, while allowedRoles is number  
            ? <Outlet/>
            : auth?.accessToken
                ? <Navigate to='/unauthorized' state={{ from:location }} replace/>
                : <Navigate to='/login' state={{ from:location }} replace/>

    )
}

export default RequireAuth