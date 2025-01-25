"use client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../Features/Inventory/Inventory";

export type PorductCardProps = {
  product: Product;
};

const ProductCard: React.FC<PorductCardProps> = ({ product }) => {
  return (
    <Link to={`${product.id}`}>
      <Card sx={{ width: 250, marginLeft: ".4rem", mt: 1 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ${product.price}.00 USD
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
