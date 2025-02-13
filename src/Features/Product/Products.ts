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




export const apiSliceWithProducts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<EntityState<ProductResponse, string>, void>({
      query: () => ({url: `commerce/catalogo?page=0&size=50`,
      }),
      transformResponse(res: ProductResponse[]) {
        return productAdapter.setAll(initialState, res);
      },
      providesTags: ["Products", "Categories"],
    }),
    /* Obtener un producto del catálogo */
    getProduct: builder.query<ProductResponse, string>({

      query: (productId) => ({url: `commerce/producto?nombre=${productId}`}),
    }),
    /* Organizar catálogo por precio */
    getSortedProductsByPrice: builder.query<EntityState<ProductResponse, string>, string>({
      
      query: (sortStyle) =>
        ({url:`commerce/catalogo?page=0&size=10&sortbyprice=${sortStyle}`}),
      transformResponse(res: ProductResponse[]) {
        return productAdapter.setAll(initialState, res);
      },

      providesTags: ["Products", "Categories"],
    }),
    /* Filtrar catálogo por categoría */
    getProductByCategoryId: builder.query<ProductResponse[], { categoryId: number } >({

      query: ({ categoryId }) =>
       ({url: `commerce/catalogo/producto/${categoryId}?page=0&size=10 `}),
    }),
    getSortedByPriceProductsByCategoryId: builder.query< ProductResponse[],{ categoryId: string; sortStyle: string } >({
  
      query: ({ categoryId, sortStyle }) =>
        ({url:`commerce/catalogo/producto/${categoryId}?page=0&size=10&sortbyPrice=${sortStyle} `}),
    }),



    /* Catalogo de un almacen */
    getProductsByWarehouseId:builder.query<EntityState<ProductResponse, string>, string>({
      query: (idAlmacen) => ({url: `commerce/catalogo/almacen/${idAlmacen}?page=0&size=50`,
      }),
      transformResponse(res: ProductResponse[]) {
        return productAdapter.setAll(initialState, res);
      },
      providesTags: ["Products", "Categories"],
    }),

    
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductByCategoryIdQuery,
  useGetProductsByWarehouseIdQuery
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

