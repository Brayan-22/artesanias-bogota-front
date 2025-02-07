import {  useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NewCustomerAddress } from "../../Features/Customer/CustomerSlice";

const RegisterPage = () => {
  const [newAddresses, setNewAddresses] = useState<NewCustomerAddress[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /*   const [user, setUser] = useState("");
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [pwdConfirmation, setPwdConfirmation] = useState<string>("");
  const [address, setAddress] = useState<string>(""); */

  const initialState = {
    user: "",
    email: "",
    pwd: "",
    pwdConfirmation: "",
    address: "",
  };
  const [customerForm, setCustomerForm] = useState(initialState);

  const hanldeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerForm({
      ...customerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = () => {
    if (customerForm.address.trim() === "") {
      setErrors({ ...errors, address: "La dirección no puede estar vacía" });
      return;
    }
    setNewAddresses([...newAddresses, { address: customerForm.address }]);
    setCustomerForm({ ...customerForm, address: "" });
    setErrors({ ...errors, address: "" });
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    if (!customerForm.user.trim()) newErrors.user = "El usuario es obligatorio";
    if (!customerForm.email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerForm.email))
      newErrors.email = "El email no es válido";

    if (!customerForm.pwd.trim())
      newErrors.pwd = "La contraseña es obligatoria";
    else if (customerForm.pwd.length < 6)
      newErrors.pwd = "La contraseña debe tener al menos 6 caracteres";

    if (!customerForm.pwdConfirmation.trim())
      newErrors.pwdConfirmation = "Confirme su contraseña";
    else if (customerForm.pwd !== customerForm.pwdConfirmation)
      newErrors.pwdConfirmation = "Las contraseñas no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Formulario válido:", customerForm);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          maxWidth: 500,
          p: 3,
          border: "2px solid rgba(101, 96, 96, 0.2)", 
          borderRadius: "8px", 
          boxShadow: "3px 3px 10px rgba(232, 188, 188, 0.2)", 
          backgroundColor: "white", 
          mb:2
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Registrar Cliente
          </Typography>
          <Stack direction="row" spacing={2}>
            <Stack>
              <TextField
                id="outlined-basic"
                label="Usuario"
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={hanldeInputChange}
                name="user"
                error={!!errors.user}
                helperText={errors.user}
                required
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                sx={{ mb: 2 }}
                onChange={hanldeInputChange}
                name="email"
                error={!!errors.email}
                helperText={errors.email}
                required
              />
              <TextField
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                type="password"
                sx={{ mb: 2 }}
                onChange={hanldeInputChange}
                name="pwd"
                error={!!errors.pwd}
                helperText={errors.pwd}
                required
              />
              <TextField
                id="outlined-basic"
                label="Confirme la contraseña"
                variant="outlined"
                type="password"
                sx={{ mb: 2 }}
                onChange={hanldeInputChange}
                name="pwdConfirmation"
                error={!!errors.pwdConfirmation}
                helperText={errors.pwdConfirmation}
                required
              />
            </Stack>
            <Stack>
              <Stack
                direction={"row"}
                sx={{ display: "flex", flexWrap: "wrap" }}
              >
                <TextField
                  id="outlined-basic"
                  label="Dirección"
                  variant="outlined"
                  type="text"
                  sx={{ mb: 2 }}
                  onChange={hanldeInputChange}
                  name="address"
                  error={!!errors.address}
                  helperText={errors.address}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleAddAddress}
                  sx={{ mb: 2 }}
                >
                  Agregar
                </Button>
              </Stack>
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Direcciones:
                </Typography>
                <Stack>
                  {newAddresses.length === 0
                    ? "No hay direcciones agregadas"
                    : newAddresses.map((a) => (
                        <Box key={a.address + Date.now().toString()}>
                          Dirección: {a.address}
                        </Box>
                      ))}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Box>
        {/* <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > */}
        <Button
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: "customColor.dark",
            color: "customColor.contrastText",
            mb: 3,
          }}
          type="submit"
        >
          Registrarse
        </Button>
        <Typography
          sx={{
            color: "#ff6c1f",
            textDecorationLine: "underline",
            cursor: "pointer",
          }}
        >
          ¿Aún no tienes una cuenta?
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
