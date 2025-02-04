import {  EntityState, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { STATE_STATUS } from "../responseStatus";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";

export interface Warehouse {
  id: string
  location_id: number
  store_id: string
  name: string
  is_central: boolean
}

export interface NewWarehouse {
  location_id: number
  store_id: string
  name: string
  is_central: boolean
}

interface WarehousesState extends EntityState<Warehouse, string> {
  status: STATE_STATUS;
  error: string | null;
}

const warehouseAdapter = createEntityAdapter<Warehouse>({})

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
const initialState: WarehousesState = warehouseAdapter.getInitialState({
  status: STATE_STATUS.IDLE,
  error: null,
})


export const apiSliceWithwarehouses = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getwarehouses: builder.query<Warehouse[], void>({
      query: () => "/warehouses",
    }),
    getwarehouse: builder.query<Warehouse, string>({
      query: (warehouseId) => `/warehouses/${warehouseId}`,
    }),
    addNewwarehouse: builder.mutation<Warehouse, NewWarehouse>({
      query: (initialwarehouse) => ({
        url: "/warehouses",
        method: "POST",
        body: initialwarehouse,
      }),
    }),
    updatewarehouse: builder.mutation<Warehouse, Warehouse>({
      query: (editedwarehouse) => ({
        url: `/warehouses/${editedwarehouse.id}`,
        method: "PATCH",
        body: editedwarehouse,
      }),
    }),
    deletewarehouse: builder.mutation<Warehouse, string>({
      query: (warehouseId) => ({
        url: `/warehouses/${warehouseId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetwarehousesQuery,
  useGetwarehouseQuery,
  useAddNewwarehouseMutation,
  useUpdatewarehouseMutation,
  useDeletewarehouseMutation,
} = apiSliceWithwarehouses;

const emptywarehouses: Warehouse[] = []

export const selectwarehousesResult = apiSliceWithwarehouses.endpoints.getwarehouses.select();

export const selectAllwarehouses = createSelector(
  selectwarehousesResult,
  warehousesResult => warehousesResult?.data ?? emptywarehouses
)

export const selectwarehouseById = createSelector(
  selectAllwarehouses,
  (_state: RootState, warehouseId: string) => warehouseId,
  (warehouses, warehouseId) => warehouses.find(warehouse => warehouse.id === warehouseId)
)

