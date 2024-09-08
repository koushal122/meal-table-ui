import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../helper/Slices/authSlice";


const useAuth = () =>{
    const dispatch =useDispatch();
    const isAuthenticated = useSelector((state) => state.authentication.isUserAuthenticated);
    const isUserAdmin = useSelector((state) => state.authentication.isAdmin);
    const canCreateAdmin = useSelector((state) => state.authentication.canCreateAdmin);

    const handleLogin = (token,email,username,isadmin,canCreateAdmin) => {
        const userDetails = {
            token :token,
            userEmail :email,
            userName : username,
            isAdmin : isadmin,
            canCreateAdmin : canCreateAdmin
        }
        dispatch(login(userDetails));
    }

    const handleLogout = () =>{
        dispatch(logout());
    }

    return {isAuthenticated,login:handleLogin, logout:handleLogout,isUserAdmin,canCreateAdmin}

}

export default useAuth;