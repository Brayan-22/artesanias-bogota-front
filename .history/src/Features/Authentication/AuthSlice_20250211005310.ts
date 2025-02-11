import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthState {
  id:string | null,
  rol: string | null,
}

const initialState: AuthState = {
  id:null,
  rol: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { id, rol} = action.payload;
      state.id = id;
      state.rol = rol;
    
      //state.token = accessToken;
    },
    logOut: (state) => {
      localStorage.removeItem("accessToken")
      state.nombre = null
      state.apellido = null
      state.direccion = null
      state.password = null
      state.email = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentNombre = (state: RootState) => state.auth.nombre;
export const selectCurrentApellido = (state: RootState) => state.auth.apellido;
export const selectCurrentDireccion = (state: RootState) => state.auth.direccion;
export const selectCurrentEmail = (state: RootState) => state.auth.email;
