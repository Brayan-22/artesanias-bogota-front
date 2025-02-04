import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductPurchase from "./ProductPurchase";
import {
  useGetProductQuery,
} from "../../../Features/Product/Products";

const ProductPage = () => {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    isSuccess,
  } = useGetProductQuery(productId!);

  if (isLoading) {
    return (
      <Container>
        <Typography variant="h6">Cargando...</Typography>
      </Container>
    );
  } else if (isSuccess) {
    return (
      <Container sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
          }}
        >
          {/* Galería de imágenes del producto */}
          <Box sx={{ flex: 1, mr: 3 }}>
            <img src={product.image} />
          </Box>

          {/* Información del producto */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}
          >
            <ProductPurchase product={product} />
            <ProductDetails description={product.description} />
          </Box>
        </Box>
      </Container>
    );
  } else {
    <Container>
      <Typography variant="h6">Ha ocurrido un error al intentar localizar el producto</Typography>
    </Container>;
  }
};

export default ProductPage;
