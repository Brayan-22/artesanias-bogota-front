import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../Features/Inventory/Inventory"
import cartReducer from "../Features/Cart/Cart"
import categoryReducer from "../Features/Categories/Category"

export const store =  configureStore({
    reducer: {
        inventory: inventoryReducer,
        category: categoryReducer,
        cart: cartReducer,
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
