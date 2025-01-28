import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
  id: number;
  name: string;
}

const initialState: Category[] = [
  { id: 1, name: "Cerámica" },
  { id: 2, name: "Madera" },
  { id: 3, name: "Tejidos" },
  { id: 4, name: "Joyería artesanal" },
  { id: 5, name: "Vajillas y utensilios" },
  { id: 6, name: "Cestas y canastos" },
];

const categorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    categoryCreated: (state, action: PayloadAction<Category>) => {
      state.push(action.payload);
    },
    categoryEdited: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      const existingItemIndex = state.findIndex((c) => c.id === category.id);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].name = category.name;
      }
    },
    categoryDeleted: (state, action: PayloadAction<number>) => {
      state = state.filter((category) => category.id != action.payload);
    },
  },
});

export default categorySlice.reducer;

export const {
  
  categoryCreated,
  categoryEdited,
  categoryDeleted,
} = categorySlice.actions;


export const selectAllCategories = (state: RootState) =>  state.category

export const selectCategoryById = (state: RootState, id: number) => state.category.find(c => c.id ===  id)

