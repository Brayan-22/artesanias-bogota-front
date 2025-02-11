import {  selectAllProducts,  useGetProductsQuery } from "../../Features/Product/Products.ts";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import ProductList from "./ProductList.tsx";
import SearchCriteria from "./SearchCriteria.tsx";
import { useAppSelector } from "../../app/hooks.ts";

const Catalog = () => {
  const {
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery();

  const products = useAppSelector(selectAllProducts)



  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent:'center' }}>
      <CircularProgress />
    </Box>
    );
  } else if (isSuccess) {

    return (
      <Container sx={{ display: "flex" }}>
        <SearchCriteria />
        <ProductList products={products} />
      </Container>
    );
  } else if (isError) {
    return (
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ha ocurrido un error al momento de cargar los productos
      </Typography>
    );
  }
};

export default Catalog;
