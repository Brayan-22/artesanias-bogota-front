import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import api from "../../api/axios";
import { STATE_STATUS } from "../responseStatus";

enum ACTIONS {
  FIND_ALL_PRODUCTS = "products/findAllProducts",
  FIND_ALL_PRODUCTS_BY_WAREHOUSE_ID = "products/findAllProductsByWarehouseId",
  SAVE_PRODUCT = "products/saveProduct",
  DELETE_PRODUCT = "products/deleteProduct",
}

export interface Product {
  id: number;
  name: string;
  stock: number;
  description: string; 
  price: number;
  category_id: number | null;
  image: string;
  warehouse_id: number;
  status: "available" | "out_of_stock"; 
  created_at: string; 
  updated_at: string; 
}

interface ProductsState {
  products: Product[]; 
  status: STATE_STATUS; 
  error: string | null; 
}

const initialState: ProductsState = {
  products: [],
  status: STATE_STATUS.IDLE,
  error: null,
};

export const findAllProducts = createAsyncThunk(
  ACTIONS.FIND_ALL_PRODUCTS,
  async (warehouseId: number) => {
   try{
    let url = "/products";
    if (warehouseId) {
      url = `products`;
      console.log("productos con wirehouse id igual a : " + warehouseId);
      
    }
    const response = await api.get(url);
    return response.data as Product[];
   }catch(err: any){
      throw err.message;
   }
  }
);

export const deleteProductById = createAsyncThunk(
  ACTIONS.DELETE_PRODUCT,
  async(productId: number) => {
    try{
      const response = await api.delete(`products/${productId}`)
      if(response.status === 200) return productId;
      return `${response.status}: ${response.statusText}`

    }catch(err: any){
      return err.message;
    }
  }

)


const productsSlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Find all products */
      .addCase(findAllProducts.pending, (state) => {
        state.status = STATE_STATUS.LOADING;
      })
      .addCase(findAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = STATE_STATUS.SUCCEEDED;
        state.products = action.payload; 
      })
      .addCase(findAllProducts.rejected, (state, action) => {
        state.status = STATE_STATUS.FAILED;
        state.error = action.error.message || "Failed to fetch products";
      })

     /* Delete product */
     .addCase(deleteProductById.fulfilled, (state, action) =>{
      if(!action.payload){
        console.log('Delete could not complete');
        console.log(action.payload);
        return;
      }
      const productId = action.payload;
      const products = state.products.filter(p => p.id !== productId);
      state.products = products;
    })
  },
});

export default productsSlice.reducer;

export const selectAllProducts = (state: RootState) => state.products.products;

export const selectProductById = (state: RootState, productId: number) => {
  return state.products.products.find((product) => product.id === productId);
};

export const selectAllProductsByWarehouseId = (state: RootState, warehouseId: number) => {
  return state.products.products.filter(
    (product) => product.warehouse_id === warehouseId
  ) || [];
};

