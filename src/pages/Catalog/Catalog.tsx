import { useGetProductsQuery } from "../../Features/Product/Products.ts";
import { Container } from "@mui/material";
import ProductList from "./ProductList.tsx";
import SearchCriteria from "./SearchCriteria.tsx";

const Catalog = () => {
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (isSuccess) {
    return (
      <Container sx={{ display: "flex" }}>
        <SearchCriteria />
        <ProductList products={products} />
      </Container>
    );
  } else if (isError) {
    return <div>Ha ocurrido un error al momento de cargar los productos</div>;
  }
};

export default Catalog;
