import { Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const heroImage = new URL("images/home/hero-image.jpg",import.meta.env.VITE_CLOUD_FRONT_URL).href



const Hero = ({}) => {
  const navigate = useNavigate()
  return (
    <Container
      className="hero-image"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${heroImage})`, // Usar la ruta importada
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        mb: 5,
      }}
    >
      <Link to ="/products">
        <Button variant="contained" sx={{ background: "#212121" }} onClick={()=>navigate("/products")}>
          Comprar ahora
        </Button>
      </Link>
    </Container>
  );
};

export default Hero;
