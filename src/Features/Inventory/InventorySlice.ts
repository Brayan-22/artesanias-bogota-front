import {
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export interface InventoryResponse {
  id: string;
  idProducto: string;
  idAlmacen: string;
  sucursal: string;
  producto: string;
  cantidad: number;
}

export interface InventoryRequest{
  cantidad: number;
}

const inventoryAdapter = createEntityAdapter<InventoryResponse>();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
const initialState = inventoryAdapter.getInitialState();

const BASE_URL = "inventory";

export const apiSliceWithInventorys = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryByWarewouseId: builder.query<InventoryResponse[],string>({
      query: (warehouseId) => ({
        url: `${BASE_URL}/sucursal/${warehouseId}?page=0&size=10`
      }),
      providesTags: ["Products"]
    }),
    addProductToWarehouseInventory: builder.mutation<InventoryResponse, InventoryRequest>({
      query: (iventoryProduct) => ({
        url: `${BASE_URL}/all?page=0&size=10`,
        method: 'POST',
        body: iventoryProduct
      }),
      invalidatesTags: []
    }),
    updateProductFromWarehouseInventory: builder.mutation<InventoryResponse,{ inventoryId: string, inventory: InventoryRequest}>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
      query: ({inventory, inventoryId}) => ({
        url: `${BASE_URL}/all?page=0&size=10`,
        method: 'PATCH',
      }),
      invalidatesTags: []
    }),
    deleteProductFromWarehouseInventory: builder.mutation<InventoryResponse, string>({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
      query: (iventoryId) => ({
        url: `${BASE_URL}/all?page=0&size=10`,
        method: 'DELETE',
      }),
      invalidatesTags: []
    }),

  }),
});

export const { useGetInventoryByWarewouseIdQuery, useAddProductToWarehouseInventoryMutation, useUpdateProductFromWarehouseInventoryMutation, useDeleteProductFromWarehouseInventoryMutation } = apiSliceWithInventorys; 

