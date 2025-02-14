import { apiSlice } from "../api/apiSlice";


export interface WarehouseResponse {
  idAlmacen:string
  direccion: number
  nombreTienda: string
  central: boolean
}


export interface WarehouseRequest {
  direccion: number,
  central: boolean
}


const BASE_URL = "";


export const apiSliceWithwarehouses = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  /* Obtener lista de almacenes de una tienda*/
      getaWarehouses: builder.query<WarehouseResponse[], string>({
        query: (shopId) => ({ url: `management/almacen/tienda/${shopId}`}),
        providesTags: [],
      }),
      
      /* Agregar warehouseo al catálogo */
      addWarehouse: builder.mutation<WarehouseResponse, {shopId: number, newWarehouse: WarehouseRequest}>({
      
        query: ({shopId, newWarehouse}) => ({
              url: `${BASE_URL} ${shopId}/all?page=0&size=10`,
              method: 'POST',
              body: newWarehouse
            }),
            invalidatesTags: []
          }),
      updateWarehouse: builder.mutation<WarehouseResponse, {shopId: number,warehouseId: string, warehouse: WarehouseRequest}>({
        
        query: ({shopId, warehouseId, warehouse}) => ({
              url: `${BASE_URL} ${shopId}${warehouseId} ${ warehouse}/all?page=0&size=10`,
              method: 'PATCH',
              body: warehouse
            }),
            invalidatesTags: []
          }),
      deleteWarehouse: builder.mutation<WarehouseResponse, {shopId: number,warehouseId: string}>({
            query: ({shopId, warehouseId}) => ({
              url: `${BASE_URL} ${shopId} ${warehouseId}/all?page=0&size=10`,
              method: 'DELETE',
            }),
            invalidatesTags: []
          }),   
  }),
});

export const {
  useGetaWarehousesQuery,
  /* useGetWarehouseQuery, */
  useAddWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation
} = apiSliceWithwarehouses;


