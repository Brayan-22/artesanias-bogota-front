import { ProductResponse, useGetProductsQuery } from "../../Features/Product/Products.ts";
import { Container, Typography } from "@mui/material";
import ProductList from "./ProductList.tsx";
import SearchCriteria from "./SearchCriteria.tsx";
import { useEffect, useState } from "react";

const Catalog = () => {
  
  const [fetchProducts, setFetchProducts] = useState<ProductResponse[]>([])

 const filterProductsByCategory = (filteredProducts: ProductResponse[]) =>{
  setFetchProducts(filteredProducts)
 }

  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery();


  useEffect(() => {
    setFetchProducts(products);
  }, [products]);



  if (isLoading) {
    return (
      <Typography variant="h6" sx={{ mb: 2 }}>
        Cargando...
      </Typography>
    );
  } else if (isSuccess) {

    return (
      <Container sx={{ display: "flex" }}>
        <SearchCriteria fetchProducts={fetchProducts} filterProductsByCategory={filterProductsByCategory} />
        <ProductList products={fetchProducts} />
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
