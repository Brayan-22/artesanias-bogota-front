import { useSelector } from "react-redux";
import { selectCurrentToken } from "./AuthSlice";
import { Navigate } from "react-router-dom";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  return (
    token
    ?  (<h1> xd </h1>)
    : <Navigate to="/login"  state={{from: location}} replace />
  )
}

export default RequireAuth;
