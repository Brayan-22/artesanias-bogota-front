
  import { apiSlice } from "../api/apiSlice";
  
  interface ResponseData {
    clientSecret: string;
    paymentIntentId: string;
  }
 
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const BASE_URL = "";
  export const apiSliceWithProducts = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      
      /* Agregar producto al catálogo */
      updatePaymentIntent: builder.mutation<ResponseData, {paymentIntentId: string, currency: string}>({
            query: ({paymentIntentId, currency}) => ({
              url:`/payment-intents/${paymentIntentId}`,
              method: 'PATCH',
              body: {currency}
            }),
            invalidatesTags: []
          }),
        createPaymentIntent: builder.mutation<ResponseData,{ currency: string}>({
            query: ({currency}) => ({
              url: `/payment-intents`,
              method: 'POST',
              body: {currency}
            }),
            invalidatesTags: []
          }),
      
    }),
  });
  
  export const {
   useUpdatePaymentIntentMutation,
   useCreatePaymentIntentMutation
  } = apiSliceWithProducts;
  
  
  