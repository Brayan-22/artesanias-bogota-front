import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../app/hooks";
import { CartItem, itemDeletedFromCart } from "../../Features/Cart/Cart";

export type CartProductCardProps = {
  cartItem: CartItem
}


const CartProductCard:React.FC<CartProductCardProps> = ({cartItem}) => {
  const dispatch = useAppDispatch()

  const handleDeleteCartItem = (cartItemId: number) => {
    dispatch(itemDeletedFromCart(cartItemId))
  }
  

  return (
    <Card sx={{ maxWidth: 200, mb:2}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={cartItem.product.image}
          alt="green iguana"
        />
        <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Typography gutterBottom variant="body1" component="div">
            {cartItem.product.name} x {cartItem.quantity}
          </Typography>

          <Typography gutterBottom variant="body1" component="div">
            ${cartItem.product.price * cartItem.quantity}.00 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{display:'flex', justifyContent:'space-evenly'}}>
       {/*  <EditIcon /> */}
        <DeleteIcon sx={{cursor:'pointer'}}  onClick = {()=>handleDeleteCartItem(cartItem.id)}/>
      </CardActions>
    </Card>
  );
};

export default CartProductCard;
