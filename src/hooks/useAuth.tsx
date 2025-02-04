import { useContext } from "react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import AuthContext from "../Context/AuthProvider"

const useAuth = () =>{
    return useContext(AuthContext);
}

export default useAuth;
