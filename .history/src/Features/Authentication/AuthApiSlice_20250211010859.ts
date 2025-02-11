import { apiSlice } from "../api/apiSlice";

interface Credentials {
    password: string;
    email: string;
}


interface CustomerData {
nombre: string ;
  apellido: string;
  direccion: string;
  password: string;
  email: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string, refreshToken:string }, Credentials>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation<{ accessToken: string, refreshToken:string }, CustomerData>({
            query: (customerData) => ({
                url: 'auth/register',
                method: 'POST',
                body: { ...customerData}
            })
        }),
    })
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
