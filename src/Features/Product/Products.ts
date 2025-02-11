import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export interface ProductResponse {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  urlImagen: string;
  id_categoria: string;
}


export interface ProductResquest {
  nombre: string;
  precio: number;
  descripcion: string;
  urlImagen: string;
  id_categoria: string;
}


export interface ProductRequest {
  nombre: string;
  precio: number;
  descripcion: string;
  urlImagen: string;
}

const productAdapter = createEntityAdapter<ProductResponse>();
const initialState = productAdapter.getInitialState();

const BASE_URL = "commerce/catalogo";
export const apiSliceWithProducts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* Obtener catálogo */
    getProducts: builder.query<EntityState<ProductResponse, string>, void>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
      query: () => `${BASE_URL}?page=0&size=10`,
      transformResponse(res: ProductResponse[]) {
        return productAdapter.setAll(initialState, res);
      },

      providesTags: ["Products", "Categories"],
    }),
    /* Obtener un producto del catálogo */
    getProduct: builder.query<ProductResponse, string>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
      query: (productId) => `${BASE_URL}/producto?nombre=${productId}`,
    }),
    /* Organizar catálogo por precio */
    getSortedProductsByPrice: builder.query<EntityState<ProductResponse, string>, string>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
      query: (sortStyle) =>
        `${BASE_URL}?page=0&size=10&sortbyprice=${sortStyle}`,
      transformResponse(res: ProductResponse[]) {
        return productAdapter.setAll(initialState, res);
      },

      providesTags: ["Products", "Categories"],
    }),
    /* Filtrar catálogo por categoría */
    getProductByCategoryId: builder.query<ProductResponse[], { categoryId: number } >({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
      query: ({ categoryId }) =>
        `${BASE_URL}/producto/${categoryId}?page=0&size=10 `,
    }),
    getSortedByPriceProductsByCategoryId: builder.query< ProductResponse[],{ categoryId: string; sortStyle: string } >({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
      query: ({ categoryId, sortStyle }) =>
        `${BASE_URL}/producto/${categoryId}?page=0&size=10&sortbyPrice=${sortStyle} `,
    }),
/* 
    getProductsByShpId: builder.query<ProductResponse[], void>({
        query:(shopId) =>
    }) */
    /* Agregar producto al catálogo */
   /*  addProduct: builder.mutation<ProductResponse, {shopId: number, newProduct: ProductRequest}>({
          query: ({shopId, newProduct}) => ({
            url: `${BASE_URL}/all?page=0&size=10`,
            method: 'POST',
            body: newProduct
          }),
          invalidatesTags: []
        }),
    updateProduct: builder.mutation<ProductResponse, {shopId: number,productId: string, product: ProductRequest}>({
          query: ({shopId, productId, product}) => ({
            url: `${BASE_URL}/all?page=0&size=10`,
            method: 'PATCH',
            body: product
          }),
          invalidatesTags: []
        }),
    deleteProduct: builder.mutation<ProductResponse, {shopId: number,productId: string}>({
          query: ({shopId, productId}) => ({
            url: `${BASE_URL}/all?page=0&size=10`,
            method: 'DELETE',
          }),
          invalidatesTags: []
        }),   
 */
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductByCategoryIdQuery,
 /*  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation */
} = apiSliceWithProducts;


export const selectProductsResult =
  apiSliceWithProducts.endpoints.getProducts.select();

const selectProductsData = createSelector(
  selectProductsResult,
  (result) => result.data ?? initialState
);

export const { selectAll: selectAllProducts, selectById: selectProductById, } =
  productAdapter.getSelectors(selectProductsData);

 /*  export const selectProductsByCategoryId = createSelector(
    selectAllProducts, 
    (_state: RootState, categoryId: number) => categoryId, 
    (products, categoryId) => products.filter((product) => product.category_id === categoryId)
  ); */
  
