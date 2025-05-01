import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    UserInfo?: {
        roles: string[]
    }
}

interface RequireAuthProps {
    allowedRoles : Number
}

const RequireAuth = ({allowedRoles}: RequireAuthProps) => {
    const { auth } = useAuth()
    const location = useLocation()
    
    const decoded = auth?.accessToken ? jwtDecode<DecodedToken>(auth.accessToken) : undefined
    const roles = decoded?.UserInfo?.roles || []

    return(
        roles.find(role => allowedRoles?.includes(role))    
            ? <Outlet/>
            : auth.accessToken //don't know how I fee about using AT?
                ? <Navigate to='/unauthorized' state={{ from:location }} replace/>
                : <Navigate to='/login' state={{ from:location }} replace/>

    )
}

export default RequireAuth