import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const UserDetailsLayout = () => {

    return (
      <Box>
      {/* <OrderOptions /> */}
      <Outlet/>
    </Box>
    )
  
};

export default UserDetailsLayout;
