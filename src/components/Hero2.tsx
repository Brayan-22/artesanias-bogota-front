import React from "react";
import { Button, Container } from "react-bootstrap";
import "./Hero.css"

const Hero = () => {
  return (
    <section>
      <div className="hero-image">
      </div>
      <Container className="hero-image d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Button variant="dark" className="hero-button">Comprar Ahora</Button>
      </Container>
    </section>
  );
};

export default Hero;
