import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import WarehouseDashBoard from "./WarehouseDashBoard";

const WarehousePage = ({}) => {
  return (
    <Box sx={{display:'flex', }}>
      <WarehouseDashBoard/>
      {<Outlet />} 
    </Box>
  );
};

export default WarehousePage;
