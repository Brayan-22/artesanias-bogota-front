"use client";
import React, { MouseEventHandler, useState } from "react";
import { useTheme } from "@mui/material/styles";
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
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const LOGIN_URL = "http://localhost:3500/auth";

export type LoginPageProps = {
  // types...
};

const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      console.log(roles);
  
      setUser("");
      setPassword("");
      // navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
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
