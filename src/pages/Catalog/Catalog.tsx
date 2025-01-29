import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  findAllProducts,
  selectAllProducts,
} from "../../Features/Product/Products.ts";
import { Container } from "@mui/material";
import ProductList from "./ProductList.tsx";

const Catalog = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  // const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    dispatch(findAllProducts());
  }, [products]);

  return (
    <Container sx={{ display: "flex" }}>
      {/*  <ProductSearchCriteria /> */}
      <ProductList products={products} />
    </Container>
  );
};

export default Catalog;
