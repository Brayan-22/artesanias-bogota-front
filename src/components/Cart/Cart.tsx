"use client";
import React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CartProductCard from "./CartProductCarD";
import { useAppSelector } from "../../app/hooks";
import { selectAllProducts } from "../../Features/Inventory/Inventory";
import { Cart as cartSlice, selectCart, selectCartItemsQuantity } from "../../Features/Cart/Cart";
import { Typography } from "@mui/material";

export type CartProps = {
  handleCloseNavMenu: () => void; // Función que se llama al interactuar con el carrito
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Cart = () => {
  const { cartItems, totalAmount } = useAppSelector(selectCart);
  const cartCount = useAppSelector(selectCartItemsQuantity);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList =
    cartItems.length > 0 ? (
      <Box
        sx={{
          width: 250,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          pt: 2,
          overflow: "hidden",
        }}
        role="presentation" /* onClick={toggleDrawer(false)} */
      >
        <Box
          sx={{
            height: "70%",
            overflowY: "scroll",
            mb: 5,
          }}
        >
          {cartItems.map((cartItem) => (
            <CartProductCard cartItem={cartItem} key={cartItem.id} />
          ))}
        </Box>
        {/* 
      <Divider sx={{ mb: 2 }} /> */}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems:'center',
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            ${totalAmount}.00
          </Typography>
          <Button
            sx={{
              backgroundColor: "customColor.success",
              color: "customColor.contrastText",
            }}
          >
            Terminar pedido
          </Button>
        </Box>
      </Box>
    ) : (
      <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
        <Typography variant="body1">
          No se han ingresado productos al carrito
        </Typography>
      </Box>
    );

  return (
    <>
      <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
        <StyledBadge badgeContent={cartCount.toString()} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Cart;
