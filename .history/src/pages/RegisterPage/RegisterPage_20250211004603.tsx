import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const schema = z.object({
  user: z.string().min(1, "El usuario es obligatorio"),
  email: z.string().email("El email no es válido"),
  pwd: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  pwdConfirmation: z
    .string()
    .min(6, "Confirme su contraseña")
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
    .refine((val, ctx) => val === ctx.parent.pwd, {
      message: "Las contraseñas no coinciden",
    }),
  address: z.string().min(1, "La dirección es obligatoria"),
});

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [addressOptions, setAddressOptions] = useState<string[]>([]);

  const fetchAddresses = async (query: string) => {
    if (query.length < 3) return;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        }
      );
      setAddressOptions(response.data.map((item: any) => item.display_name));
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const onSubmit = (data: FormData) => {
    
    
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
          mb: 2,
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Registrar Cliente
        </Typography>
        <Stack spacing={2}>
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Usuario" error={!!errors.user} helperText={errors.user?.message} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Email" type="email" error={!!errors.email} helperText={errors.email?.message} />
            )}
          />
          <Controller
            name="pwd"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Contraseña" type="password" error={!!errors.pwd} helperText={errors.pwd?.message} />
            )}
          />
          <Controller
            name="pwdConfirmation"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Confirme la contraseña" type="password" error={!!errors.pwdConfirmation} helperText={errors.pwdConfirmation?.message?.toString()} />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Autocomplete
                freeSolo
                options={addressOptions}
                onInputChange={(_, value) => fetchAddresses(value)}
                onChange={(_, value) => setValue("address", value || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    label="Dirección"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            )}
          />
          <Button type="submit" variant="contained">
            Registrarse
          </Button>

          <Link to="/login">
            <Typography
              sx={{
                color: "#ff6c1f",
                textDecorationLine: "underline",
                cursor: "pointer",
              }}
            >
              ¿Ya tienes una cuenta?
            </Typography>
          </Link>
        </Stack>
      </Box>
      
    </Box>
  );
};

export default RegisterPage;
