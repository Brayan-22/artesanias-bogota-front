import { Box, Container } from "@mui/material";
import Hero from "../../components/Hero/Hero";
import Populars from "../../components/Populars";
import PhysicalStores from "./PhysicalStores";

const HomePage = () => {
  return (
    <Box sx={{padding:0, maring: 0}}>
      <Hero />
      <Populars />
      <PhysicalStores />
      {/* <Footer/> */}
    </Box>
  );
};

export default HomePage;
