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
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllCategories } from "../Categories/Category";
import { selectProductById } from "./Products";

const CREATE = "/inventory/createProduct";
const EDIT = "/inventory/editProduct";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const product = useAppSelector((state) =>
    selectProductById(state, Number(id))
  );

  const categories = useAppSelector(selectAllCategories);
  console.log(pathname.includes(EDIT));

  console.log("este es el producto" + product);

  const [preview, setPreview] = useState<string>(product?.image || "");

  const [formState, setFormState] = useState({
    name: product?.name || "",
    stock: product?.stock || 0,
    price: product?.price || 0,
    categoryId: product?.category_id || 0,
    description: product?.description || "",
    image: product?.image || "", 
    createdAt: product?.created_at || "",
    updatedAt: product?.updated_at || ""
  });

  if (!product && pathname.includes(EDIT)) {
    return <Typography variant="h6">{"Producto no encontrado :("}</Typography>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]:
        name === "stock" || name === "price"
          ? Number(value)
          : name === "category"
          ? categories.find((c) => c.id === Number(value))
          : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setPreview(result);
          setFormState((prevState) => ({
            ...prevState,
            image: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    
  };

  const editProduct = () => {
    
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pathname === CREATE ? addProduct() : editProduct();
    navigate("/inventory"); // Navigate back to the inventory page
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}
    >
      <Typography variant="h5" gutterBottom>
        {pathname === CREATE ? "Crear Producto" : "Editar Producto"}
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
          <NativeSelect
            sx={{ mb: 5 }}
            name="category"
            value={formState.categoryId ? formState.categoryId : ""}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </NativeSelect>
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
            {pathname === CREATE ? "Crear Producto" : "Editar Producto"}
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
