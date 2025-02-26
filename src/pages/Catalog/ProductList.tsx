import { Box } from "@mui/material";
import {  ProductResponse } from "../../Features/Product/Products";
import ProductCard from "../../components/ProductCard";

export type ProductListProps = {
  products: ProductResponse[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        mb: 2,
        mx: "auto",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductList;
