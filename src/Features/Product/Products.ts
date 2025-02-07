import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
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

export interface ProductResponse {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  urlImagen: string;
}

interface ProductsState extends EntityState<ProductResponse, string> {
  status: STATE_STATUS;
  error: string | null;
}

const productAdapter = createEntityAdapter<ProductResponse>({});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
const initialState: ProductsState = productAdapter.getInitialState({
  status: STATE_STATUS.IDLE,
  error: null,
});

const BASE_URL = "commerce/catalogo";

export const apiSliceWithProducts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => `${BASE_URL}?page=0&size=10`,

      providesTags: ["Products", "Categories"],
    }),
    getProduct: builder.query<Product, string>({
      query: (productId) => `${BASE_URL}/producto?nombre=${productId}`,
    }),
    getSortedProductsByPrice: builder.query<ProductResponse[], void>({
      query: (sortStyle) =>
        `${BASE_URL}?page=0&size=10&sortbyprice=${sortStyle}`,
    }),
    getProductByCategoryId: builder.query<ProductResponse[], {categoryId:number}>({
      query: ({categoryId}) =>
        `${BASE_URL}/producto/${categoryId}?page=0&size=10 `,
    }),
    getSortedByPriceProductsByCategoryId: builder.query<ProductResponse[], {categoryId: string, sortStyle: string}>({
      query: ({categoryId, sortStyle}) =>
        `${BASE_URL}/producto/${categoryId}?page=0&size=10&sortbyPrice=${sortStyle} `,
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
  useGetProductByCategoryIdQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSliceWithProducts;

const emptyProducts: ProductResponse[] = [];

export const selectProductsResult =
  apiSliceWithProducts.endpoints.getProducts.select();

export const selectAllProducts = createSelector(
  selectProductsResult,
  (productsResult) => productsResult?.data ?? emptyProducts
);

export const selectProductById = createSelector(
  selectAllProducts,
  (_state: RootState, productId: string) => productId,
  (products, productId) => products.find((product) => product.id === productId)
);
