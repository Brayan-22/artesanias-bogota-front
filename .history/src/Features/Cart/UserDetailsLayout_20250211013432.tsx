import { Box } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { Outlet } from "react-router-dom";

const UserDetailsLayout = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  if (/* currentUser */ true) {
    return (
      <Box>
      {/* <OrderOptions /> */}
      <Outlet/>
    </Box>
    )
  } else {
   
    return <Box>Iniciar sesión</Box>;
  }
};

export default UserDetailsLayout;
