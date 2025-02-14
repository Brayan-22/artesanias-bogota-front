
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { apiSlice } from "../api/apiSlice";

  //@ts-expect-error
interface OrderResquest{
    id: string,
    idCliente: string, 
    idStatus: number,
    total: number
}

export interface OrderResponse {
    id: string,
    idCliente: string, 
    idStatus: number,
    total: number
}

export const apiSliceWithOrders = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getOrders: builder.query<OrderResponse[], void>({
        query: () => ({url: `commerce/catalogo?page=0&size=50`,
        }),
        
        providesTags: ["Products", "Categories"],
      }),
      
    }),
  });
  
  export const {
  useGetOrdersQuery
  
  } = apiSliceWithOrders;