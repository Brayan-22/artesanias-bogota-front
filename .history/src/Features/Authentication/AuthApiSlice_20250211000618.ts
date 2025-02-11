import { apiSlice } from "../api/apiSlice";

interface Credentials {
    username: string;
    password: string;
    email: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToke: string, refreshToken: string }, Credentials>({
            query: (credentials) => ({
                url: 'auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
});

export const { useLoginMutation } = authApiSlice;
