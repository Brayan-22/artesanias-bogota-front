import React from "react";
import { useAppSelector } from "../../app/hooks";
import ProductGallery from "../../components/ProductGalery/ProductGallery";
import { ProductSearchCriteria } from "../../components/ProductSearchCriteria";
import { Container } from "@mui/material";
import { selectAllProducts } from "../../Features/Inventory/Inventory";

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
