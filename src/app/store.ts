import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../Features/Inventory/Inventory"
import cartReducer from "../Features/Cart/Cart"

export const store =  configureStore({
    reducer: {
        inventory: inventoryReducer,
        cart: cartReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
