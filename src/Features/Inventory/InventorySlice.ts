
import { apiSlice } from "../api/apiSlice";

export interface InventoryResponse {
  idProducto: string;
  idAlmacen: string;
  producto: string;
  cantidad: number;
}

export interface InventoryRequest{
  idProducto: string;
  idAlmacen: string;
  cantidad: number;
}


const BASE_URL = "management";

export const apiSliceWithInventorys = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryByWarewouseId: builder.query<InventoryResponse[],string>({
      query: (warehouseId) => ({
        url: `${BASE_URL}/inventario/almacen/${warehouseId}`
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
    updateProductFromWarehouseInventory: builder.mutation<InventoryResponse,{ inventory: InventoryRequest}>({
      query: ({inventory}) => ({
        url: `${BASE_URL}/inventario/almacen`,
        method: 'PATCH',
        body: inventory
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

