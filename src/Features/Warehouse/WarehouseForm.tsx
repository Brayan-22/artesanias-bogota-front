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
import { useAddWarehouseMutation, useGetWarehouseQuery, useUpdateWarehouseMutation,  } from "./Warehouses";

const warehouseForm = () => {
  const { shopId, warehouseId } = useParams();
 
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { data: warehouse } = useGetWarehouseQuery({ 
    warehouseId: warehouseId ?? "", 
    shopId: shopId ?? "" 
  });
  const [addWarehouse] = useAddWarehouseMutation()
  const [updateWarehouse] = useUpdateWarehouseMutation()

  const [formState, setFormState] = useState({
    location: warehouse?.id_ubicación || 0,
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

  

  const handleCreatewarehouse = async() => {
    await addWarehouse({shopId: Number(shopId), newWarehouse: {id_ubicación: formState.location, is_central: formState.is_central, id_tienda: ""}})
  };
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleEditwarehouse = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
    await updateWarehouse({shopId: Number(shopId), warehouseId , warehouse: {id_ubicación: formState.location, is_central: formState.is_central}})
  };
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !warehouse ? handleCreatewarehouse() : null;
    navigate(`../warehouses`);
  };

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
