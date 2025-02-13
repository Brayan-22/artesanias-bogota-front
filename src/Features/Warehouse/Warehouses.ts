import {createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";


export interface WarehouseResponse {
  id:string
  id_ubicación: number
  id_tienda: string
  is_central: boolean
}


export interface WarehouseRequest {
  id_ubicación: number
  id_tienda: string
  is_central: boolean
}



const warehouseAdapter = createEntityAdapter<WarehouseResponse>()

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
const initialState = warehouseAdapter.getInitialState()

const BASE_URL = "";


export const apiSliceWithwarehouses = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  /* Obtener lista de almacenes de una tienda*/
      getaWarehouses: builder.query<WarehouseResponse, string>({
        query: (shopId) => ({ url: `/tienda/${shopId}`}),
        providesTags: [],
      }),
      /* Obtener un almacen*/
      getWarehouse: builder.query<WarehouseResponse, {warehouseId:string, shopId:string}>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
        query: ({warehouseId, shopId}) => `${BASE_URL}/warehouseo?nombre=${warehouseId}`,
      }),
      /* Agregar warehouseo al catálogo */
      addWarehouse: builder.mutation<WarehouseResponse, {shopId: number, newWarehouse: WarehouseRequest}>({
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error    
        query: ({shopId, newWarehouse}) => ({
              url: `${BASE_URL}/all?page=0&size=10`,
              method: 'POST',
              body: newWarehouse
            }),
            invalidatesTags: []
          }),
      updateWarehouse: builder.mutation<WarehouseResponse, {shopId: number,warehouseId: string, warehouse: WarehouseRequest}>({
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error  
        query: ({shopId, warehouseId, warehouse}) => ({
              url: `${BASE_URL}/all?page=0&size=10`,
              method: 'PATCH',
              body: warehouse
            }),
            invalidatesTags: []
          }),
      deleteWarehouse: builder.mutation<WarehouseResponse, {shopId: number,warehouseId: string}>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
            query: ({shopId, warehouseId}) => ({
              url: `${BASE_URL}/all?page=0&size=10`,
              method: 'DELETE',
            }),
            invalidatesTags: []
          }),   
  }),
});

export const {
  useGetaWarehousesQuery,
  useGetWarehouseQuery,
  useAddWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation
} = apiSliceWithwarehouses;


