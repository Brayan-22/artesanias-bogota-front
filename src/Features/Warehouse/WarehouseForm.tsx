import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  NativeSelect,
} from "@mui/material";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useGetwarehouseQuery } from "./Warehouses";

const warehouseForm = () => {
  const { warehouseId } = useParams();
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { data: warehouse} = useGetwarehouseQuery(warehouseId!);

  const [formState, setFormState] = useState({
    name: warehouse?.name || "",
    location: warehouse?.location_id || 0,
    is_central: warehouse?.is_central || false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

 /*  

  const handleCreatewarehouse = () => {
    dispatch(createwarehouse({ ...formState } as warehouse));
  };

  const handleEditwarehouse = () => {
    dispatch(editwarehouse({ ...formState, id: warehouseId } as warehouse));
  };
 */
  /* const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !warehouse ? handleCreatewarehouse() : handleEditwarehouse();
    navigate(`../warehouses`);
  }; */

  if (!warehouse && !path.includes("createWarehouse")) {
    return <Typography variant="h6">{"warehouse no encontrado :("}</Typography>;
  }

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}
    >
      <Typography variant="h5" gutterBottom>
        {!warehouse ? "Crear Almacen" : "Editar Almacen"}
      </Typography>
      <Box component="form" /* onSubmit={handleSubmit} */ noValidate>
        <Stack spacing={2}>
         
          <TextField
            fullWidth
            label="Nombre del warehouse"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            required
          />
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Dirección"
              name="location"
              type="text"
              value={formState.location}
              onChange={handleInputChange}
              required
            />

            
          
          </Stack>
          <NativeSelect
            sx={{ mb: 5 }}
            name="category_id"
            value={formState.is_central ? 1 : 0}
            onChange={handleInputChange}
          >
             <option key={0} value={0}>
                Almacén convencional
              </option>
              <option key={1} value={1}>
                 Punto central
              </option>
          </NativeSelect>
          
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="contained" color="primary" type="submit">
            {!warehouse ? "Crear Almacen" : "Editar Almacen"}
          </Button>
          <Link to={`../warehouses`}>
            <Button variant="outlined" color="secondary">
              Cancelar
            </Button>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default warehouseForm;
