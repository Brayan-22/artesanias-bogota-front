import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import StoreOptions from "./ShopOptions";

const ShopPage = ({}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <StoreOptions />
      {<Outlet />}
    </Box>
  );
};

export default ShopPage;
