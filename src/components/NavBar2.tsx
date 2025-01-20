import React from "react";
import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import iconCart from "../assets/images/cart-img.png"
import CartButton from "./Cartbutton";

const NavBar = () => {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary "
      bg="light"
      data-bs-theme="light"
      sticky="top"
    >
      <Container>
        <Link to="/">
          <Navbar.Brand>ARTESANÍAS BOGOTÁ</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
          <Nav.Item className="me-3">
              <Link to="/inventory" >
                INVENTARIO
              </Link>
            </Nav.Item>
            <Nav.Item className="me-3">
              <Link to="/products" >
                CATÁLOGO
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Button 
                style={{
                  backgroundColor: "#FF6C1F",
                  borderColor: "#FF6C1F",
                  marginRight:"1rem"
                }}
              >
                <Link to="/">INICIAR SESIÓN</Link>
              </Button>
            </Nav.Item>
            <Nav.Item>
            
                <Link to="/">
                 {/*  <img src={iconCart} style={{width:"30px", height:"30px"}} alt="" />  
                  <span  className="position-relative start-50 rounded-circle d-flex justify-content-center aling-items-center bg-danger p-1"
                    style={{fontSize:".8rem"}}
                  >0</span> */}
                
                  <CartButton/>
                </Link>
        
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
