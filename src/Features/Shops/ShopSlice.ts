import { EntityState, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { STATE_STATUS } from "../responseStatus";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";


export interface shop {
  id: string
  location_id: number
  name: string
}

export interface NewShop {
  location_id: number
  name: string
}

interface shopsState extends EntityState <shop, string>{
  status: STATE_STATUS;
  error: string | null;
}

const shopAdapter = createEntityAdapter<shop>({});

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
const initialState: shopsState = shopAdapter.getInitialState({
  status: STATE_STATUS.IDLE,
  error: null,
});

export const apiSliceWithShops = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getshops: builder.query<shop[], void>({
      query: () => "/shops",
      providesTags: ['Shops'],
    }),
    getshop: builder.query<shop, string>({
      query: (shopId) => `/shops/${shopId}`,
    }),
  }),
});

export const {
  useGetshopsQuery,
  useGetshopQuery,
} = apiSliceWithShops;

const emptyshops: shop[] = []

export const selectShopsResult = apiSliceWithShops.endpoints.getshops.select();

export const selectAllshops = createSelector(
  selectShopsResult,
  shopsResult => shopsResult?.data ?? emptyshops
)

export const selectshopById = createSelector(
  selectAllshops,
  (_state: RootState, shopId: string) => shopId,
  (shops, shopId) => shops.find(shop => shop.id === shopId)
)

