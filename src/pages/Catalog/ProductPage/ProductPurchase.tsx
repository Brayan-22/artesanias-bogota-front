import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ProductResponse } from "../../../Features/Product/Products";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  CartItem,
  itemAddedToCart,
  selectCart,
} from "../../../Features/Cart/Cart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type ProductPurchaseProps = {
  product: ProductResponse;
};

const ProductPurchase: React.FC<ProductPurchaseProps> = ({ product }) => {
  const dispatch = useAppDispatch();


  
 
  const initialCartItem: CartItem = {
    id: product.id,
    product: product,
    quantity: 1,
  };

  const currentCart = useAppSelector(selectCart);

  const [cartItem, setCartItem] = useState(initialCartItem);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);

    /*  if (quantity > inventoryProduct.cantidad) {
      alert("Lo sentimos, no hay suficiente stock");
      return;
    } */

    setCartItem({
      ...cartItem,
      quantity: quantity > 0 ? quantity : 1,
    });
  };

  const handleAddProductToCart = () => {
    console.log("productos del carrito", currentCart.cartItems);

    console.log(cartItem.quantity);
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
    const currentProduct = currentCart.cartItems.find(
      (c) => c.id === cartItem.id
    );
    /*  if (
      currentProduct?.quantity &&
      currentProduct.quantity > inventoryProduct.cantidad
    ) {
      alert(
        "La unidades que intenta llevar sobrepasan las existencias del producto"
      );
    } else {
    } */
    dispatch(itemAddedToCart(cartItem));
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">{product.nombre}</Typography>
      {/* <Typography variant="body2">Categoría: {product.category_id ? "category" : "N/A"}</Typography> */}
      <Typography variant="h6" sx={{ color: "green" }}>
        {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error */}
        ${product.precio.toFixed(2)} USD
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          type="number"
          label="Cantidad"
          value={cartItem.quantity}
          inputProps={{ min: 1 }}
          sx={{ width: "100px" }}
          onChange={handleQuantityChange}
        />
        <Button
          sx={{
            backgroundColor: "customColor.success",
            color: "customColor.contrastText",
          }}
          onClick={handleAddProductToCart}
        >
          Añadir al carrito
        </Button>
      </Stack>

      {/*  <Typography>Quedan: {inventoryProduct.cantidad} disponibles.</Typography>
       */}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Disponibilidad en tienda</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Disponible en: {/* {inventoryProduct.sucursal} */}{" "}
          {/* / almacen: {inventoryProduct.idAlmacen} */}
          {/* <StoreMap stores={stores} /> */}
         
        </AccordionDetails>
      </Accordion>
      {/* <MapWithMarkers addresses={addresses} /> */}
    </Box>
  );
};

export default ProductPurchase;
