import { createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store';
import {  logOut, setCredentials } from '../Authentication/AuthSlice';


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
    const token = getState().auth.token
    if (token) {
        headers.set("authorization", `Bearer ${token}`)
    }
    return headers
}
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: any, 
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if ((result.error as FetchBaseQueryError)?.status === 403) {
      console.log('sending refresh token');
      const refreshResult = await baseQuery('/refresh', api, extraOptions);
      console.log(refreshResult);

      if (refreshResult?.data) {
          const state = api.getState() as RootState;
          const user = state.auth.user;
          api.dispatch(setCredentials({ ...refreshResult.data, user }));
          result = await baseQuery(args, api, extraOptions);
      } else {
          api.dispatch(logOut());
      }
  }

  return result;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products', 'Categories', 'Shops'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  endpoints: (builder) => ({})
});
