import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Product, selectAllProducts } from "../../Features/Inventory/Inventory";
import { Container } from "@mui/material";
import ProductSearchCriteria from "../../components/ProductSearchCriteria";
import ProductList from "./ProductList.tsx";

const Catalog = () => {
  const initialProducts = useAppSelector(selectAllProducts);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <Container sx={{ display: "flex" }}>
      <ProductSearchCriteria />
      <ProductList products={products} />
    </Container>
  );
};

export default Catalog;
