import { Box } from "@mui/material";
import Populars from "../../components/Populars";
import PhysicalStores from "./PhysicalStores";
import Hero from "../../components/Hero";

const HomePage = () => {
  
  return (
    <Box sx={{ padding: 0, maring: 0, background:"red" }}>
      <Hero />
      <Populars />
      <PhysicalStores />
    </Box>
  );
};

export default HomePage;
