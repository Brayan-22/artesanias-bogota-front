import { Box } from "@mui/material";
import PhysicalStores from "./PhysicalStores";
import Hero from "../../components/Hero";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "../../Features/Authentication/AuthSlice";

const HomePage = () => {

  const dispatch = useAppDispatch()

  dispatch(setCredentials({
    rol: null,
    id: "1",
     token: ""
  }))
  return (
    <Box sx={{ padding: 0, maring: 0 }}>
      <Hero />
      <PhysicalStores />
    </Box>
  );
};

export default HomePage;
