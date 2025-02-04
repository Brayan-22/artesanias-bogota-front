import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { STATE_STATUS } from "../responseStatus";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../../app/store";

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface NewCategory {
  name: string;
  description: string;
}
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
interface CategoryState extends EntityState<Category, number> {
  categories: Category[];
  status: STATE_STATUS;
  error: string | null;
}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
const categoryAdapter = createEntityAdapter<Category>({});


/* const initialState: CategoryState = categoryAdapter.getInitialState({
  status: STATE_STATUS.IDLE,
  error: null,
}); */

export const apiSliceWithCategories = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ['Categories'],
    }),
    getCategory: builder.query<Category, number>({
      query: (categoryId) => `/categories/${categoryId}`,
    }),
    addNewCategory: builder.mutation<Category, NewCategory>({
      query: (initialCategory) => ({
        url: "/categories",
        method: "POST",
        body: initialCategory,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: (editedCategory) => ({
        url: `/categories/${editedCategory.id}`,
        method: "PATCH",
        body: editedCategory,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation<Category, string>({
      query: (categoryId) => ({
        url: `/categorys/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});


export const{
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = apiSliceWithCategories

export const selectCategoriesResult = apiSliceWithCategories.endpoints.getCategories.select()


const emptyCategories: Category[] = []

export const selectCategorysResult = apiSliceWithCategories.endpoints.getCategories.select();

export const selectAllcategoriess = createSelector(
  selectCategorysResult,
  categorysResult => categorysResult?.data ?? emptyCategories
)


export const selectcategoryById = createSelector(
  selectAllcategoriess,
  (_state: RootState, categoryId: number) => categoryId,
  (categories, categoryId) => categories.find(category => category.id === categoryId)
)
