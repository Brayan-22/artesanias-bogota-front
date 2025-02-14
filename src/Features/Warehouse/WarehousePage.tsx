import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import WarehouseDashBoard from "./WarehouseDashBoard";
import { selectCurrentRol, setCredentials } from "../Authentication/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";


const WarehousePage = ({}) => {
   const dispatch = useAppDispatch()
  
    dispatch(setCredentials({
      rol: "ADMIN",
      id: "1",
       token: ""
    }))

    console.log(useAppSelector(selectCurrentRol));
    
  
  return (
    <Box sx={{display:'flex', }}>
      <WarehouseDashBoard/>
      {<Outlet />} 
    </Box>
  );
};

export default WarehousePage;
