import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface TState {
  user: User | null | undefined;
  userLoading: boolean;
  error: string;
  signOutMessage: string;
}

const state: TState = {
  user: undefined,
  userLoading: true,
  error: "",
  signOutMessage: "",
};

export const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: state,
  reducers: {
    setAdminUserState: (state: TState, action: PayloadAction<TState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setAdminUserState } = adminUserSlice.actions;
export default adminUserSlice.reducer;
