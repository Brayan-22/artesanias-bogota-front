import { Opacity } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const PhysicalStores = () => {
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
          backgroundImage: `url("/src/assets/images/home/physical-stores-image.jpg")`,
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
          backgroundImage: `url("/src/assets/images/home/physical-stores-image2.jpg")`,
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
        <Button variant="contained" color="success" sx={{ opacity: 1 }}>
          Comprar Ahora
        </Button>
      </Box>
    </Stack>
  );
};

export default PhysicalStores;
