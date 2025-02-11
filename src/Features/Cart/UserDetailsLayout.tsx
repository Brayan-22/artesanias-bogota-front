import { Box } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../Authentication/AuthSlice";
import { Outlet } from "react-router-dom";

const UserDetailsLayout = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const currentUser = useAppSelector(selectCurrentUser);
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
