import { createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";


export interface shopResponse {
  id: string
  id_ubicacion: number
  nombre: string
}

export interface ShopRequest {
  id_ubicacion: number
  nombre: string
}

export const defaultShop = {
  id:1,
  nombre:"todo a mil",
  ubicación: "calle 54 blabla"
}


const shopAdapter = createEntityAdapter<shopResponse>({});
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
const initialState = shopAdapter.getInitialState();

export const apiSliceWithShops = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getshop: builder.query<shopResponse, string>({
      query: (shopId) => ({url: `/shops/${shopId}`}),
    }),
  }),
});

export const {
  useGetshopQuery,
} = apiSliceWithShops;

