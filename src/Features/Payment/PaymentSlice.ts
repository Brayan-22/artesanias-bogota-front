
  import { apiSlice } from "../api/apiSlice";
  
  interface ResponseData {
    clientSecret: string;
    paymentIntentId: string;
  }


  export interface OrderItem{

    id:string,
    quantity: number,
    price: number
  }
 

  export type OrderItems = OrderItem[];

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const BASE_URL = "";
  export const apiSliceWithProducts = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      
      /* Agregar producto al catálogo */
      updatePaymentIntent: builder.mutation<ResponseData, {paymentIntentId: string, currency: string, cartItems: OrderItems, totalAmount: number }>({
            query: ({paymentIntentId, currency, cartItems, totalAmount}) => ({
              url:`payment/payment-intents/${paymentIntentId}`,
              method: 'PATCH',
              body: {currency, cartItems, totalAmount}
            }),
            invalidatesTags: []
          }),
        createPaymentIntent: builder.mutation<ResponseData,{ currency: string, cartItems:OrderItems, totalAmount: number}>({
            query: ({currency, cartItems, totalAmount}) => ({
              url: `payment/payment-intents`,
              method: 'POST',
              body: {currency, cartItems, totalAmount}
            }),
            invalidatesTags: []
          }),
      
    }),
  });
  
  export const {
   useUpdatePaymentIntentMutation,
   useCreatePaymentIntentMutation
  } = apiSliceWithProducts;
  
  
  