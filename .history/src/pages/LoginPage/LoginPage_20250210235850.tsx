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
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../Features/Authentication/AuthSlice";

const LoginPage = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [userError, setUserError] = useState("");
  const [pwdError, setPwdError] = useState("");

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

  const validateForm = () => {
    let isValid = true;

    if (!user.trim()) {
      setUserError("El usuario es obligatorio.");
      isValid = false;
    } else {
      setUserError("");
    }

    if (!pwd.trim()) {
      setPwdError("La contraseña es obligatoria.");
      isValid = false;
    } else if (pwd.length < 6) {
      setPwdError("La contraseña debe tener al menos 6 caracteres.");
      isValid = false;
    } else {
      setPwdError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (err: any) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      //errRef.current?.focus();
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
      component="form"
      onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Iniciar Sesión
        </Typography>

        {errMsg && (
          <Typography color="error" ref={errRef} sx={{ mb: 2 }}>
            {errMsg}
          </Typography>
        )}

        <TextField
          label="Usuario"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
          inputRef={userRef}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          error={Boolean(userError)}
          helperText={userError}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          sx={{ width: "100%" }}
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          error={Boolean(pwdError)}
          helperText={pwdError}
        />

        <Button
          size="medium"
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "customColor.dark",
            color: "customColor.contrastText",
            mb: 3,
          }}
          /* onClick={handleSubmit} */
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Ingresar"}
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
      </Box>
    </Box>
  );
};

export default LoginPage;
