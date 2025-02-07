import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductPurchase from "./ProductPurchase";
import {
  selectProductById,
  useGetProductsQuery,
} from "../../../Features/Product/Products";
import { useAppSelector } from "../../../app/hooks";
import { defaultImg } from "../../../components/ProductCard";
import {
  selectInventoyByProductId,
  useGetInventorysQuery,
} from "../../../Features/Inventory/InventorySlice";

const ProductPage = () => {
  const { productId } = useParams();

  const { isLoading: isLoadingProducts, isSuccess: isSuccessProducts } =
    useGetProductsQuery();

  const product = useAppSelector((state) =>
    selectProductById(state, productId!)
  );

  const { isLoading: isLoadingInventory, isSuccess: isSuccessInventory } =
    useGetInventorysQuery();

  const inventoryProduct = useAppSelector((state) =>
    selectInventoyByProductId(state, productId!)
  );

  console.log("inventario del produto", inventoryProduct);

  if (isLoadingProducts && isLoadingInventory) {
    return (
      <Typography variant="h6" sx={{ mb: 2 }}>
        Cargando...
      </Typography>
    );
  } else if (isSuccessProducts && isSuccessInventory) {
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
            <img src={defaultImg} />
          </Box>

          {/* Información del producto */}

          {product && inventoryProduct ? (
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}
            >
              es es el producto {product.nombre}
              <ProductPurchase
                inventoryProduct={inventoryProduct}
                product={product}
              />
              <ProductDetails description={product.descripcion} />
            </Box>
          ) : (
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ha ocurrido un error al proporcionar los datos del producto :c
            </Typography>
          )}
        </Box>
      </Container>
    );
  } else {
    return (
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ha ocurrido un error al momento de cargar los productos
      </Typography>
    );
  }
};

export default ProductPage;
