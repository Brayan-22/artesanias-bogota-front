import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthState {
  id:string | null,
  rol: string | null,
  token: string | null,
}

const initialState: AuthState = {
  id:null,
  rol: null,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { id, rol} = action.payload;
      state.id = id;
      state.rol = rol;
      state.token = token
    
      //state.token = accessToken;
    },
    logOut: (state) => {
      localStorage.removeItem("accessToken")
      state.id = null
      state.rol = null
      state.token = null
      
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentRol = (state: RootState) => state.auth.rol;

