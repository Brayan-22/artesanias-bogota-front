"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Product } from "../../../Features/Inventory/Inventory";
import { useAppDispatch } from "../../../app/hooks";
import { CartItem, itemAddedToCart } from "../../../Features/Cart/Cart";

export type ProductPurchaseProps = {
  product: Product;
};

const ProductPurchase: React.FC<ProductPurchaseProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const initialCartItem: CartItem = {
    id: product.id,
    product: product,
    quantity: 1,
  };
  const [cartItem, setCartItem] = useState(initialCartItem);

  const handleCartItemQuantity = (e) => {
    const cant = e.target.value;
    if (cant >= cartItem.product.stock) {
      alert("Lo sentimos, el producto se ha acabado");
    } else {
      setCartItem({
        ...cartItem,
        quantity: (cartItem.quantity += 1),
      });
    }
  };
  const handleAddProductToCart = (cartItem: CartItem) => {
    if (cartItem.quantity > cartItem.product.stock) {
      alert("el producto se ha agotado");
    } else {
      dispatch(itemAddedToCart(cartItem));
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="h6" sx={{ color: "green" }}>
        ${product.price.toFixed(2)} USD
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          type="number"
          label="Cantidad"
          defaultValue={1}
          value={cartItem.quantity}
          inputProps={{ min: 1 }}
          sx={{ width: "100px" }}
          onClick={(e) => handleCartItemQuantity(e)}
        />
        <Button
          /* variant='outlined' */
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
