import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export interface ProductResponse {
  id: string
  nombre: string | null;
  precio: number  | null;
  descripcion: string | null;
  urlImagen: string | null;
  idCategoria: number | null
}



export interface ProductRequest {
  nombre: string | null;
  precio: number  | null;
  descripcion: string | null;
  urlImagen: string | null;
  idCategoria: number | null
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
    getProductsByWarehouseId:builder.query<ProductResponse[], string>({
      query: (idAlmacen) => ({url: `management/inventario/catalogo/almacen/${idAlmacen}`,
      }),
      providesTags: ["Products", "Categories"],
    }),

    /* Catalogo  de una tienda */

    getProductsByShopId:builder.query<ProductResponse[],  string>({
      query: (idTienda) => ({url: `management/tienda/productos/${idTienda}`,
      }),
      
      providesTags: ["Products", "Categories"],
    }),

    // Añadir un nuevo producto a al tienda 
    
    AddProductToShop: builder.mutation<ProductResponse, {newProduct: ProductRequest, shopId: string}>({
      /* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error */
      query: ({newProduct , shopId}) => ({
        url:`management/producto/save`,
        method: "POST",
        body: {...newProduct}
      })
    }),
    updateProductFromShop: builder.mutation<ProductResponse, {updatedProduct: ProductRequest, productId: string}>({
      query: ({updatedProduct,productId}) => ({
        url:`management/producto/update/${productId} `,
        method: "PATCH",
        body: updatedProduct
      })
    }),
    detelteProductFromShop: builder.mutation<ProductResponse, { productId: string, shopId: string}>({
      query: ({shopId, productId}) => ({
        url:`management/tienda/producto/${shopId}`,
        method: "DELETE",
        body:{
          idProducto: productId
        }
      })
    })

    
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductByCategoryIdQuery,
  useGetProductsByWarehouseIdQuery,
  useGetProductsByShopIdQuery,
  useAddProductToShopMutation,
  useUpdateProductFromShopMutation,
  useDetelteProductFromShopMutation

} = apiSliceWithProducts;


export const selectProductsResult =
  apiSliceWithProducts.endpoints.getProducts.select();

const selectProductsData = createSelector(
  selectProductsResult,
  (result) => result.data ?? initialState
);

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productAdapter.getSelectors(selectProductsData);

