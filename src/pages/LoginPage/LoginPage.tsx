"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useLoginMutation } from "../../Features/Authentication/AuthApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Features/Authentication/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [errMsg, setErrMsg] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate(`/`);
    } catch (err) {
      if (typeof err === "object" && err !== null && "status" in err) {
        if (err.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
      } else {
        setErrMsg("No Server Response");
      }

      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPwd(e.target.value);

  return (
    <Box sx={{ display: "flex", justifyContent: "center",  }}>
      <Card sx={{ maxWidth: 500,  }}>
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
                inputRef={userRef}
                onChange={handleUserInput}
              />
              <TextField
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                type="password"
                onChange={handlePwdInput}
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
          <Link to="/register">
            <Typography
              sx={{
                color: "#ff6c1f",
                textDecorationLine: "underline",
                cursor: "pointer",
              }}
            >
              ¿Aún no tienes una cuenta?
            </Typography>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default LoginPage;
