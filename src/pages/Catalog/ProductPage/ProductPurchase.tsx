import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Product } from "../../../Features/Product/Products";
import { useAppDispatch } from "../../../app/hooks";
import { CartItem, itemAddedToCart } from "../../../Features/Cart/Cart";

export type ProductPurchaseProps = {
  product: Product;
};

const ProductPurchase: React.FC<ProductPurchaseProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const initialCartItem: CartItem = {
    id: Number(product.id),
    product: product,
    quantity: 1,
  };
  const [cartItem, setCartItem] = useState(initialCartItem);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);

    if (quantity > product.stock) {
      alert("Lo sentimos, no hay suficiente stock");
      return;
    }

    setCartItem({
      ...cartItem,
      quantity: quantity > 0 ? quantity : 1, // Evitar cantidad negativa o cero
    });
  };

  const handleAddProductToCart = (cartItem: CartItem) => {
    if (cartItem.quantity > cartItem.product.stock) {
      alert("El producto se ha agotado");
    } else {
      dispatch(itemAddedToCart(cartItem));
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="body2">Categoría: {product.category_id ? "category" : "N/A"}</Typography>
      <Typography variant="h6" sx={{ color: "green" }}>
        ${product.price.toFixed(2)} USD
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          type="number"
          label="Cantidad"
          value={cartItem.quantity}
          inputProps={{ min: 1 }}
          sx={{ width: "100px" }}
          onChange={handleQuantityChange} // Usamos onChange para capturar cambios en la cantidad
        />
        <Button
          sx={{
            backgroundColor: "customColor.success",
            color: "customColor.contrastText",
          }}
          onClick={() => handleAddProductToCart(cartItem)}
        >
          Añadir al carrito
        </Button>
      </Stack>

      <Typography>Quedan {cartItem.product.stock} disponibles.</Typography>

      <Button variant="outlined" color="primary">
        Disponibilidad en tienda
      </Button>
    </Box>
  );
};

export default ProductPurchase;
