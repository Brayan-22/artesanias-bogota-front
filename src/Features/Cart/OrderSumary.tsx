import { Box, Divider, Typography } from "@mui/material";
import { selectAllCartItems, selectCart } from "./Cart";
import { useAppSelector } from "../../app/hooks";
import CartProductCard from "../../components/Cart/CartProductCard";

const OrderSumary = () => {
  const cartItems = useAppSelector(selectAllCartItems);
  const totalAmount = useAppSelector(selectCart).totalAmount;
  return (
    <Box
      sx={{
        p: 2,
        border: "2px solid rgba(101, 96, 96, 0.2)",
        borderRadius: "8px",
        boxShadow: "3px 3px 10px rgba(232, 188, 188, 0.2)",
        backgroundColor: "white",
        pb:4,
        width: 500,
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        alignItems: "center"
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center" }}>Resumen de la Compra</Typography>
      <Box
        sx={{
          flexGrow: 1, overflowY: "auto", p: 2 
        }}
      >
        {cartItems.map((cartItem) => (
          <CartProductCard cartItem={cartItem} key={cartItem.id} />
        ))}
      </Box>
      <Divider />
      <Typography variant="h5" sx={{ mb: 1 }}>
        Total: ${totalAmount}.00
      </Typography>
    </Box>
  );
};

export default OrderSumary;
