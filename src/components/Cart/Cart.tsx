import React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useAppSelector } from "../../app/hooks";
import { selectCart, selectCartItemsQuantity } from "../../Features/Cart/Cart";
import { Typography, Divider } from "@mui/material";
import CartProductCard from "./CartProductCard";
import { Link, useParams } from "react-router";

const StyledBadge = styled(Badge)(({ theme }) => ({
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
   const {warehouseId} = useParams()
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
        <StyledBadge badgeContent={cartCount.toString()} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            alignItems: "center",
          }}
        >
          {cartItems.length > 0 ? (
            <>
              <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
                {cartItems.map((cartItem) => (
                  <CartProductCard cartItem={cartItem} key={cartItem.id} />
                ))}
              </Box>
              <Divider />
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Total: ${totalAmount.toFixed(2)}
                </Typography>
                <Link
                  to={!location.pathname.includes("/admin") ? "/customer/order"  : `/admin/warehouse/${warehouseId}/order` }
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "customColor.success",
                      color: "customColor.contrastText",
                    }}
                  >
                    Finalizar compra
                  </Button>
                </Link>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#757575",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                No hay productos en el carrito
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
