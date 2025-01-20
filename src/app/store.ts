import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Features/Products/Products"
import inventoryReducer from "../Features/Inventory/Inventory"

export const store =  configureStore({
    reducer: {
        products: productsReducer,
        inventory: inventoryReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
