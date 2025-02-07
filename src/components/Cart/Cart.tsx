import React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useAppSelector } from "../../app/hooks";
import { selectCart, selectCartItemsQuantity } from "../../Features/Cart/Cart";
import { Typography } from "@mui/material";
import CartProductCard from "./CartProductCard";
import { Link } from "react-router";

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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          pt: 2,
          overflow: "scroll",
          ml: 2,
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            ${totalAmount}.00
          </Typography>
        </Box>
        <Link to="/customer/1/order">
          <Button
            sx={{
              backgroundColor: "customColor.success",
              color: "customColor.contrastText",
            }}
          >
            Terminar pedido
          </Button>
        </Link>
      </Box>
    ) : (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Asegura que esté centrado verticalmente
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#757575", // Color gris llamativo
            textTransform: "uppercase", // Texto en mayúsculas
            mb: 2, // Espaciado inferior
          }}
        >
          No se han ingresado
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#757575",
            textTransform: "uppercase",
          }}
        >
          Productos al carrito
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
      <Drawer
        sx={{ p: 4 }}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Cart;
