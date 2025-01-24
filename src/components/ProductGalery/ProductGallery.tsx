import React from "react";
import { Product } from "../../Features/Products/Products";
import ProductCard from "../ProductCard/ProductCard";
import { Container } from "@mui/material";

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
