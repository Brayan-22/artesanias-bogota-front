import { apiSlice } from "../api/apiSlice";

interface Credentials {
    email: string;
    token: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ token: string }, Credentials>({
            query: (credentials) => ({
                url: 'auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
});

export const { useLoginMutation } = authApiSlice;
