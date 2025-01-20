import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Product } from "../Products/Products";


export interface Inventory {
  id: number;
  products: Product[]
}

const initialState: Inventory =  {
    id: 0,
    products: [ {
      id: 1,
      name: "Mochila Wayuu",
      description:
        "Mochila tejida a mano por la comunidad Wayuu, hecha con hilos de algodón y diseños tradicionales.",
      price: 45.0,
      stock: 100,
      category: "radom"
    },
    {
      id: 2,
      name: "Sombrero Vueltiao",
      description:
        "Sombrero tradicional de la cultura zenú, tejido a mano con caña fleha.",
      price: 60.0,
      stock: 50,
      category: "radom"
    },
    {
      id: 3,
      name: "Cerámica Tairona",
      description:
        "Figura de cerámica hecha a mano inspirada en las formas de la cultura Tairona.",
      price: 30.0,
      stock: 75,
      category: "radom"
    },
    {
      id: 4,
      name: "Cesta Embera",
      description:
        "Cesta tejida a mano por la comunidad Embera, ideal para decoración o almacenamiento.",
      price: 25.0,
      stock: 150,
      category: "radom"
    },
    {
      id: 5,
      name: "Collares Kogi",
      description:
        "Collares hechos a mano por la comunidad Kogi, elaborados con semillas y piedras naturales.",
      price: 35.0,
      stock: 80,
      category: "radom"
    },]
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    
    deletedInventoryProduct: (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id != action.payload)
    }
  },
});

export default inventorySlice.reducer


export const {deletedInventoryProduct} = inventorySlice.actions

export const selectInventory = (state: RootState) => state.inventory

export const selectInventoryProduct = (state: RootState, productId:number) => state.inventory.products.find((product) => product.id == productId);