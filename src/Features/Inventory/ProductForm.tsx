import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectInventoryProduct, productEdited } from "./Inventory";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fetch the product by id from the Redux store
  const product = useAppSelector((state) =>
    selectInventoryProduct(state, Number(id))
  );

  // Local state for form fields
  const [formState, setFormState] = useState({
    name: product?.name || "",
    stock: product?.stock || 0,
    price: product?.price || 0,
    category: product?.category || "",
    description: product?.description || "",
    image: product?.image || "", // For the product image
  });

  // Local state for image preview
  const [preview, setPreview] = useState(product?.image || "");

  if (!product) {
    return <Typography variant="h6">Producto no encontrado</Typography>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === "stock" || name === "price" ? Number(value) : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        setFormState((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productEdited({
        id: product.id,
        ...formState,
      })
    );
    navigate("/inventory"); // Navigate back to the inventory page
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5, }}
    >
      <Typography variant="h5" gutterBottom>
        Editar Producto
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Imagen del Producto</Typography>

            {preview && (
              <Box
                component="img"
                src={preview}
                alt="Vista previa"
                sx={{ width: "50%", height: "auto", borderRadius: 2, mt: 2 }}
              />
            )}
            <Button variant="contained" component="label" sx={{ mt: 1, mb: 2 }}>
              Subir Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>
          <TextField
            fullWidth
            label="Nombre del Producto"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            required
          />
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formState.stock}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Precio"
              name="price"
              type="number"
              value={formState.price}
              onChange={handleInputChange}
              required
            />
          </Stack>
          <TextField
            fullWidth
            label="Categoría"
            name="category"
            value={formState.category}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Descripción"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            multiline
            rows={4}
          />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="contained" color="primary" type="submit">
            Guardar Cambios
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/inventory")}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductForm;
