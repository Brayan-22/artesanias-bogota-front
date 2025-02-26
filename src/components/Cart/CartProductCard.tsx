import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../app/hooks";
import { CartItem, itemDeletedFromCart } from "../../Features/Cart/Cart";
import { CardActionArea } from "@mui/material";
import { Link, useParams } from "react-router-dom";

export type CartProductCardProps = {
  cartItem: CartItem;
};

const CartProductCard: React.FC<CartProductCardProps> = ({ cartItem }) => {
  const dispatch = useAppDispatch();
  const {warehouseId} = useParams();

  const handleDeleteCartItem = (cartItemId: string) => {
    dispatch(itemDeletedFromCart(cartItemId));
  };

  const rol = "admin"
  
  return (
    <Card sx={{ maxWidth: 200, mb: 2 }}>
      
      <Link to={!(rol == "admin") ? `products/${cartItem.id}` : `admin/warehouse/${warehouseId}/products/${cartItem.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
            image={cartItem.product.urlImagen}
            alt="green iguana"
            sx={{ height:"140"}}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="body1" component="div">
              {cartItem.product.nombre} x {cartItem.quantity}
            </Typography>

            <Typography gutterBottom variant="body1" component="div">
              {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error */}
              ${cartItem && cartItem.product.precio * cartItem.quantity}.00
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {/*  <EditIcon /> */}
        <DeleteIcon
          sx={{ cursor: "pointer" }}
          onClick={() => handleDeleteCartItem(cartItem.id)}
        />
      </CardActions>
    </Card>
  );
};

export default CartProductCard;
