import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectAllProducts } from "../Features/Product/Products";
import ProductCard from "./ProductCard";

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
