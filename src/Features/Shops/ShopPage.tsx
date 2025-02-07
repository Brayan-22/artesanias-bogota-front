import { Box } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import StoreOptions from "./ShopOptions";
import { defaultShop} from "./ShopSlice";

const ShopPage = ({}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { shopId } = useParams();
  //const {data: shop, isSuccess, isLoading} = useGetshopQuery(shopId!)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const shop = defaultShop;

  return (
    <Box sx={{ display: "flex" }}>
      <StoreOptions />
      {<Outlet />}
    </Box>
  );

  /* if(isLoading){
    return <h6>Cargando...</h6>
  }else if(isSuccess){
    return (
      <Box sx={{ display: "flex" }}>
        <StoreOptions />
        {<Outlet />}
      </Box>
    );
  }else{
    return <h6>Lo sentimos, la tienda a la que intenta acceder no se encuentra disponible </h6>
  }
  */
};

export default ShopPage;
