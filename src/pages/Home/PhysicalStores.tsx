import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const leftImg = new URL("images/home/physical-stores-image.jpg",import.meta.env.VITE_CLOUD_FRONT_URL).href
const rightImg = new URL("images/home/physical-stores-image2.jpg",import.meta.env.VITE_CLOUD_FRONT_URL).href




const PhysicalStores = () => {
  const navigate  = useNavigate()
  return (
    <Stack direction={{ xs: "column", sm: "row" }} sx={{ overflow: "hidden" }}>
      {/* Primera imagen como fondo */}
      <Box
        sx={{
          overflow:'hidden',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          height: "100vh", // Ajusta la altura según lo necesario
          backgroundImage: `url(${leftImg})`,
          backgroundSize: "cover", // Cubre todo el contenedor
          backgroundPosition: "center", // Centra la imagen
          backgroundRepeat: "no-repeat", // Evita repeticiones
          transition: "opacity 0.3s ease, transform 0.3s ease", // Transición suave
          opacity: 1, // Opacidad inicial
          "&:hover": {
            opacity: 1, // Ilumina al hacer hover
            transform: "scale(1.05)", // Efecto de zoom
          },
        }}
      >
        <Typography sx={{color:'#FFFF',  fontStyle: 'italic', textAlign:"center" }} variant="h4">LAS MEJORES ARTESANÍAS DE COLOMBIA</Typography>
      </Box>
      {/* Segunda imagen con botón */}
      <Box
        sx={{
          overflow:'hidden',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#00000",
          width: "50%",
          height: "100vh",
          backgroundImage: `url(${rightImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "opacity 0.3s ease, transform 0.3s ease", // Transición suave
          opacity: 1, // Opacidad inicial
          "&:hover": {
            opacity: 1, // Ilumina al hacer hover
            transform: "scale(1.05)", // Efecto de zoom
          },
        }}
      >
        <Button variant="contained" color="success" sx={{ opacity: 1 }} onClick={()=> navigate("/products")}>
          Comprar Ahora
        </Button>
      </Box>
    </Stack>
  );
};

export default PhysicalStores;
