import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { STATE_STATUS } from "../responseStatus";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../../app/store";



export interface Product {
  id: string;
  name: string;
  stock: number;
  description: string;
  price: number;
  category_id: number | null;
  image: string;
  warehouse_id: string;
  status: "available" | "out_of_stock";
  created_at: string;
  updated_at: string;
}

export interface NewProduct {
  name: string;
  stock: number;
  description: string;
  price: number;
  category_id: number | null;
  image: string;
  warehouse_id: string;
  status: "available" | "out_of_stock";
  created_at: string;
  updated_at: string;
}

interface ProductsState extends EntityState<Product, string> {
  status: STATE_STATUS;
  error: string | null;
}

const productAdapter = createEntityAdapter<Product>({});

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
const initialState: ProductsState = productAdapter.getInitialState({
  status: STATE_STATUS.IDLE,
  error: null,
});

export const apiSliceWithProducts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products", "Categories"],
    }),
    getProduct: builder.query<Product, string>({
      query: (productId) => `/products/${productId}`,
    }),
    addNewProduct: builder.mutation<Product, NewProduct>({
      query: (initialProduct) => ({
        url: "/products",
        method: "POST",
        body: initialProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (editedProduct) => ({
        url: `/products/${editedProduct.id}`,
        method: "PATCH",
        body: editedProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<Product, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSliceWithProducts;

const emptyProducts: Product[] = []

export const selectProductsResult = apiSliceWithProducts.endpoints.getProducts.select();

export const selectAllProducts = createSelector(
  selectProductsResult,
  productsResult => productsResult?.data ?? emptyProducts
)

export const selectProductById = createSelector(
  selectAllProducts,
  (_state: RootState, productId: string) => productId,
  (products, productId) => products.find(product => product.id === productId)
)

