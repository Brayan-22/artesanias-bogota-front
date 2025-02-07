import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { STATE_STATUS } from "../responseStatus";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../../app/store";

export interface InventoryResponse {
  id: number;
  idProducto: string;
  idAlmacen: string;
  sucursal: string;
  producto: string;
  cantidad: number;
}

export interface InventoryProductResponse{
  idProducto: string;
  idAlmacen: string,
  sucursal: string,
  producto: string,
  cantidad: number
}

interface InventorysState extends EntityState<InventoryResponse, string> {
  status: STATE_STATUS;
  error: string | null;
}

const inventoryAdapter = createEntityAdapter<InventoryResponse>({});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
const initialState: InventorysState = inventoryAdapter.getInitialState({
  status: STATE_STATUS.IDLE,
  error: null,
});

const BASE_URL = "inventory";

export const apiSliceWithInventorys = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventorys: builder.query<InventoryResponse[], void>({
      query: () => `${BASE_URL}/all?page=0&size=10`,

      providesTags: ["Categories"],
    }),
    getAllProducts: builder.query<InventoryProductResponse[], void>({
      query: () => `${BASE_URL}/central?page=0&size=10`,

      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetInventorysQuery, useGetAllProductsQuery } = apiSliceWithInventorys;

const emptyinventorys: InventoryResponse[] = [];

export const selectinventorysResult =
  apiSliceWithInventorys.endpoints.getInventorys.select();

export const selectAllinventorys = createSelector(
  selectinventorysResult,
  (inventorysResult) => inventorysResult?.data ?? emptyinventorys
);

export const selectInventoyByProductId = createSelector(
  selectAllinventorys,
  (_state: RootState, producId: string) => producId,
  (inventorys, producId) =>
    inventorys.find((inventory) => inventory.idProducto === producId)
);
