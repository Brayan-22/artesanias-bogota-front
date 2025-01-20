import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAllProducts } from "../../Features/Products/Products";
import ProductGallery from "../../components/ProductGalery/ProductGallery";
import { ProductSearchCriteria } from "../../components/ProductSearchCriteria";
import { Container } from "@mui/material";

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
