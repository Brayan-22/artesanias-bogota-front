import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAllProducts } from "../../Features/Inventory/Inventory";
import { Container } from "@mui/material";
import ProductSearchCriteria from "../../components/ProductSearchCriteria";
import ProductGallery from "./ProductPage/ProductGallery";

const Catalog = () => {
  const products = useAppSelector(selectAllProducts);
  return (
    <Container sx={{display:'flex'}}>
      <ProductSearchCriteria />
      
      <ProductGallery products={products} />
    </Container>
  );
};

export default Catalog;
