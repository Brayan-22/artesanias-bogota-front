import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Product/Products";
import warehouseReducer from "../Features/Warehouse/Warehouses";
import cartReducer from "../Features/Cart/Cart";
import categoryReducer from "../Features/Categories/Category";

export const store = configureStore({
  reducer: {
    products: productReducer,
    warehouse: warehouseReducer,
    category: categoryReducer,
    cart: cartReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
