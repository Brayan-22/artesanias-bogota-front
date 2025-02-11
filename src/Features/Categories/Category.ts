import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";


export interface CategoryResponse  {
  id: number;
  nombre: string,
  descripcion: string
  
 }

const categoryAdapter = createEntityAdapter<CategoryResponse>();
const initialState = categoryAdapter.getInitialState();


const BASE_URL = "commerce/catalogo";

export const apiSliceWithCategories = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<EntityState<CategoryResponse,number >, void>({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
      query: () => `${BASE_URL}/categoria`,
      transformResponse(res: CategoryResponse[]){
        return categoryAdapter.setAll(initialState, res)
      },
      
    }),
   
  }),
});


export const{
  useGetCategoriesQuery,
} = apiSliceWithCategories



export const selectCategoriesResult = apiSliceWithCategories.endpoints.getCategories.select()



export const selectCategorysResult = apiSliceWithCategories.endpoints.getCategories.select();


const selectCategoriesData = createSelector(
  selectCategoriesResult,
  (result) => result.data ?? initialState
);

export const { selectAll: selectAllCategories, selectById: selectCategoryById } =
  categoryAdapter.getSelectors(selectCategoriesData);
