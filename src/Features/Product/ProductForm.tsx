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
import { selectAllCategories, useGetCategoriesQuery } from "../Categories/Category";
import {
} from "../Inventory/InventorySlice";
import { useAppSelector } from "../../app/hooks";
import { ProductRequest, selectProductById, useAddProductToShopMutation, useGetProductsByShopIdQuery, useUpdateProductFromShopMutation } from "./Products";

const ProductForm = () => {
  const { shopId,productId } = useParams();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const {} = useGetProductsByShopIdQuery(shopId!)
  const product = useAppSelector((state) => selectProductById(state, productId!)) 
  
  const {} = useGetCategoriesQuery()
  const categories = useAppSelector(selectAllCategories)
  

  const [addProductToShop] = useAddProductToShopMutation()
  const [updateProductFromShop] = useUpdateProductFromShopMutation()

  const [preview, setPreview] = useState<string>(product?.urlImagen || "");

  const [formState, setFormState] = useState<ProductRequest | null>({
    nombre: product ? product.nombre : "",
    precio: product ? product.precio :  0,
    descripcion: product ? product.descripcion : "",
    urlImagen: product ? product.urlImagen : "",
    idCategoria: product ? product.idCategoria : 0

  });
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  if (name === "precio") {
    // Validar solo números positivos (sin espacios, letras, ni caracteres especiales)
    if (!/^\d*$/.test(value) || Number(value) < 0) {
      return;
    }
  }

  setFormState((prevState) =>
    prevState ? { ...prevState, [name]: name === "idCategoria" ? Number(value) : value } : null
  );
};


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setPreview(result);
          setFormState((prevState) =>
            prevState && { ...prevState, urlImagen: result } 
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleCreateProduct = async () => {
    let res = null
     formState && shopId && (
      res =  await addProductToShop({ shopId: shopId, newProduct: {...formState}})
    )
    if(res){
      if(res.data)
        alert("El producto se ha añadido de manera correcta")
      }
    
  };

  const handleEditProduct = async () => {
    formState && shopId &&  productId && (
      await updateProductFromShop({  productId: productId, updatedProduct: {...formState}})
    )
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !product ? handleCreateProduct() : handleEditProduct();
    //navigate(`../products`);
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
            name="nombre"
            value={formState?.nombre}
            onChange={handleInputChange}
            required
          />
         

            <TextField
              fullWidth
              label="Precio"
              name="precio"
              type="number"
              value={formState && formState.precio}
              onChange={handleInputChange}
              required
            />
          </Stack>
          <NativeSelect
            sx={{ mb: 5 , mt: 2}}
            name="idCategoria"
       
            value={formState?.idCategoria}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))} 
          </NativeSelect>
          <Stack>
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
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
