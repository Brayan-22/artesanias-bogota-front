import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useRegisterMutation } from "../../Features/Authentication/AuthApiSlice";

interface FormData {
  nombre: string;
  apellido: string;
  direccion: string;
  password: string;
  confirmPassword: string;
  email: string;
}

 function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    direccion: "",
    password: "",
    confirmPassword: "",
    email: "",
  });


  const [errMsg, setErrMsg] = useState<Partial<FormData>>({});

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors: Partial<FormData> = {};

    if (!formData.nombre.trim()) errors.nombre = "El nombre es obligatorio";
    if (!formData.apellido.trim()) errors.apellido = "El apellido es obligatorio";
    if (!formData.direccion.trim()) errors.direccion = "La dirección es obligatoria";
    if (!formData.email.includes("@")) errors.email = "El correo debe ser válido";
    if (formData.password.length < 6) errors.password = "La contraseña debe tener al menos 6 caracteres";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Las contraseñas no coinciden";

    setErrMsg(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
       try {
            const userData = await login({email , password: pwd}).unwrap();
            localStorage.setItem("token", userData.accessToken)
            const data =  decodeJWT(userData.accessToken)
            dispatch(setCredentials(data));
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
    }
  };

  return (
   <Box sx={{display:'flex', justifyContent:'center', p:3}}>
     <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}>
      <Typography variant="h5">Registro</Typography>
      <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} error={!!errMsg.nombre} helperText={errMsg.nombre} />
      <TextField label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} error={!!errMsg.apellido} helperText={errMsg.apellido} />
      <TextField label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} error={!!errMsg.direccion} helperText={errMsg.direccion} />
      <TextField label="Correo" name="email" type="email" value={formData.email} onChange={handleChange} error={!!errMsg.email} helperText={errMsg.email} />
      <TextField label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} error={!!errMsg.password} helperText={errMsg.password} />
      <TextField label="Confirmar Contraseña" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={!!errMsg.confirmPassword} helperText={errMsg.confirmPassword} />
      <Button type="submit" variant="contained"  disabled={isLoading}> {isLoading ? "Cargando..." : "Registrarse"}e</Button>
    </Box>
   </Box>
  );
}

export default RegisterPage;