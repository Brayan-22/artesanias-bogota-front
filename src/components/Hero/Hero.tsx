"use client";
import React from "react";
import styles from "./Hero.module.scss";
import { Button, Container } from "@mui/material";
import { Height } from "@mui/icons-material";
import heroImage from "../../assets/images/home/hero-image.jpg"; // Ajusta la ruta según tu estructura
import { Link } from "react-router-dom";

/* import "./Hero.scss"; */

export type HeroProps = {
  // types...
};

const Hero: React.FC<HeroProps> = ({}) => {
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
        <Button variant="contained" sx={{ background: "#212121" }}>
          Comprar ahora
        </Button>
      </Link>
    </Container>
  );
};

export default Hero;
