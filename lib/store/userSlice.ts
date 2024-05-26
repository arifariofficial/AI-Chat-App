import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  balance: number;
  isTwoFactorEnabled: boolean;
}

const initialState: User = {
  id: "",
  name: null,
  email: "",
  emailVerified: null,
  image: null,
  balance: 0,
  isTwoFactorEnabled: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; id: string }>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
