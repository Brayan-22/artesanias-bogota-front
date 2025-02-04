import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/Cart";
import { apiSlice } from "../Features/api/apiSlice";
import { listenerMiddleware } from "./listenerMiddleware";
import authReducer from "../Features/Authentication/AuthSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath] : apiSlice.reducer
  },
  middleware: getDefaultMiddleware=> 
    getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
    .concat(apiSlice.middleware),
    
  devTools: true
  
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
