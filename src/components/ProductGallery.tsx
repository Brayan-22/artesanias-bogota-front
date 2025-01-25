import React from "react";
import { Container } from "@mui/material";
import { Product } from "../Features/Inventory/Inventory";
import ProductCard from "./ProductCard";

interface ProductGalleryProps {
  products: Product[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
  return (
    <Container sx={{display:'flex', mb:2, mx:'auto', flexWrap:'wrap', justifyContent:'center'}}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductGallery;
