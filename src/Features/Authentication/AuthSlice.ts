import { createSlice,  PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthState {
  user: string | null;
  token: string | null;
  testMode: TestMode;
}

export interface TestMode {
  mode: "guest" | "customer" | "admin" | "manager";
}

const initialState: AuthState = {
  user: null,
  token: null,
  testMode: { mode: "guest" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setTestMode: (state, action: PayloadAction<TestMode>) => {
      state.testMode = action.payload;
    },
  },
});

export const { setCredentials, logOut, setTestMode } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurretTestMode = (state: RootState) => state.auth.testMode
