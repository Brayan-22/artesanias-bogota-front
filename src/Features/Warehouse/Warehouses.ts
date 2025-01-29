import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { STATE_STATUS } from "../responseStatus";

enum ACTIONS {
  FIND_ALL_WAREHOUSES = "warehouses/findAllWarehouses",
}

export interface WareHouse {
  id: number;
  name: string;
  location: string;
  manager_id: string;
}

interface WarehousesState {
  warehouses: WareHouse[]; 
  status: STATE_STATUS; 
  error: string | null; 
}

const initialState: WarehousesState = {
  warehouses: [],
  status: STATE_STATUS.IDLE,
  error: null,
};

export const fetchWarehouses = createAsyncThunk<WareHouse[]>(
  ACTIONS.FIND_ALL_WAREHOUSES,
  async () => {
    const response = await api.get("/warehouses/all");
    return response.data as WareHouse[]; 
  }
);

const warehousesSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarehouses.pending, (state) => {
        state.status = STATE_STATUS.LOADING;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action: PayloadAction<WareHouse[]>) => {
        state.status = STATE_STATUS.SUCCEEDED;
        state.warehouses = action.payload; 
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.status = STATE_STATUS.FAILED;
        state.error = action.error.message || "Failed to fetch warehouses"; 
      });
  },
});

export default warehousesSlice.reducer;

