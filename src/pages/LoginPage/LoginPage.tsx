"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "../../api/axios";

const LOGIN_URL = "http://localhost:3500/auth";



const LoginPage = ({}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [user, setUser] = useState("");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
  };
  

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Iniciar Sesión
              </Typography>
              <TextField
                id="outlined-basic"
                label="Usuario"
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={(e) => setUser(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </form>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            size="medium"
            variant="contained"
            sx={{
              backgroundColor: "customColor.dark",
              color: "customColor.contrastText",
              mb: 3,
            }}
            onClick={handleSubmit}
          >
            Ingresar
          </Button>
          <Typography
            sx={{
              color: "#ff6c1f",
              textDecorationLine: "underline",
              cursor: "pointer",
            }}
          >
            ¿Aun no tienes una cuenta?
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
};

export default LoginPage;
