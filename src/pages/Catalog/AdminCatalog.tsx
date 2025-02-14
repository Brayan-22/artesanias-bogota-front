import {  useGetProductsByWarehouseIdQuery } from "../../Features/Product/Products.ts";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import ProductList from "./ProductList.tsx";
import SearchCriteria from "./SearchCriteria.tsx";
import { useParams } from "react-router-dom";

const AdminCatalog = () => {
  
    const {warehouseId} = useParams()
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
  } =  useGetProductsByWarehouseIdQuery(warehouseId!)
    




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

export default AdminCatalog;
