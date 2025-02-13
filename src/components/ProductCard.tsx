import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import {  ProductResponse } from "../Features/Product/Products";

export const defaultImg = new URL("images/product1.jpg",import.meta.env.VITE_CLOUD_FRONT_URL).href


export type PorductCardProps = {
  product: ProductResponse;
};

const ProductCard: React.FC<PorductCardProps> = ({ product }) => {
  return (
    <Link to={`${product.id}`}>
      <Card sx={{ width: 250, maxWidth:250, marginLeft: ".4rem", mt: 1 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.urlImagen || defaultImg}
            alt="green iguana"
            sx={{height: 200, width: 500}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ${product.precio}.00 USD
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Ver más
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default ProductCard;
