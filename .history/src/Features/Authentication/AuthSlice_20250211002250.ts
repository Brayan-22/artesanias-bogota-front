import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthState {
  nombre: string | null;
  apellido: string | null;
  direccion: string | null;
  password: string | null;
  email: string | null;
}

const initialState: AuthState = {
  nombre: null,
  apellido: null,
  direccion: null,
  password: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userData } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
