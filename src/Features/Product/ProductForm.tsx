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
import { useAddNewProductMutation, useGetProductQuery, useUpdateProductMutation } from "./Products";
import { useGetCategoriesQuery } from "../Categories/Category";

const ProductForm = () => {
  const { warehouseId, productId } = useParams();

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { data: product } = useGetProductQuery(productId!);
  const [addNewProduct] = useAddNewProductMutation()
  const [updateProduct] = useUpdateProductMutation()

  const { data: categories = [] } = useGetCategoriesQuery();

  const [preview, setPreview] = useState<string>(product?.image || "");

  const [formState, setFormState] = useState({
    name: product?.name || "",
    stock: product?.stock || 0,
    price: product?.price || 0,
    category_id: product?.category_id || 0,
    description: product?.description || "",
    image: product?.image || "",
    created_at: product?.created_at || "",
    updated_at: product?.updated_at || "",
    warehouse_id: warehouseId || "",
    status: product?.status || "out_of_stock",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "stock" || name === "price") {
      if (value === "") {
        setFormState({ ...formState, [name]: "" });
        return;
      }
      if (!/^[0-9]\d*$/.test(value)) {
        return;
      }
      if (!/^\d+(\.\d+)?$/.test(value)) {
        return;
      }
      setFormState({ ...formState, [name]: Number(value) });
      return;
    }

    setFormState({ ...formState, [name]: value });
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

   const handleCreateProduct = async() => {
    await addNewProduct({...formState})
  };

  const handleEditProduct = async () => {
    productId && await updateProduct({...formState, id:  productId})
  };
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !product ? handleCreateProduct() : handleEditProduct();
    navigate(`../products`);
  };

  if (!product && !path.includes("createProduct")) {
    return <Typography variant="h6">{"Producto no encontrado :("}</Typography>;
  }

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}
    >
      <Typography variant="h5" gutterBottom>
        {!product ? "Crear Producto" : "Editar Producto"}
      </Typography>
      <Box component="form"  onSubmit={handleSubmit}  noValidate>
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
            name="category_id"
            value={formState.category_id ? formState.category_id : ""}
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
            {!product ? "Crear Producto" : "Editar Producto"}
          </Button>
          <Link to={`../products`}>
            <Button variant="outlined" color="secondary">
              Cancelar
            </Button>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductForm;
