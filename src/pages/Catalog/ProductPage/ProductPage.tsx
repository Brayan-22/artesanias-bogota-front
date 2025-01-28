"use client";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { selectInventoryProduct } from "../../../Features/Inventory/Inventory";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import ProductGallery from "../ProductList.tsx";
import ProductDetails from "./ProductDetails";
import ProductPurchase from "./ProductPurchase";

export type ProductPageProps = {
  // Define any additional props if necessary
};

const ProductPage: React.FC<ProductPageProps> = () => {
  const { productId } = useParams();
  const product = useAppSelector((store) =>
    selectInventoryProduct(store, parseInt(productId || "0"))
  );

  if (!product) {
    return (
      <Container>
        <Typography variant="h6">Producto no encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 1,
        }}
      >
        {/* Galería de imágenes del producto */}
        <Box sx={{ flex: 1, mr: 3 }}>
          <img src= {product.image}/>
        </Box>

        {/* Información del producto */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <ProductPurchase product={product}/>
		  <ProductDetails description = {product.description}/>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductPage;
