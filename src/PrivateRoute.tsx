import { Navigate } from "react-router-dom"
import { isLogin } from "./Utils/Util"
import type { ReactNode } from "react"


const PrivateRoute = ({ children }: { children: ReactNode }) => {
    return (
        isLogin() ? children : <Navigate to={"/login"} />
    )
}
export default PrivateRoute