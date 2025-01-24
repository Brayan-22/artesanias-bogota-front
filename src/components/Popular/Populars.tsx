import React from "react";
import { useAppSelector } from "../../app/hooks";
import ProductCard from "../ProductCard/ProductCard";
import { Box, Container, Typography } from "@mui/material";
import { selectAllProducts } from "../../Features/Inventory/Inventory";

const Populars = () => {
  const products = useAppSelector(selectAllProducts);
  return (
    <Box  sx={{ mb: 5, display: "flex", flexDirection: "column", pt:5, m:5 }}>
      <Typography sx={{ fontSize: 'h6.fontSize'}} >PRODUCTOS POPULARES</Typography>

      <Box
        sx={{ display: "flex", maxWidth: "100vw", overflowX: "scroll" }}
      >
        {products.map((prodct) => (
          <ProductCard key={prodct.id} product={prodct} />
        ))}
      </Box>
    </Box>
  );
};

export default Populars;
