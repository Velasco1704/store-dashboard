import { createSlice } from "@reduxjs/toolkit";
import { InitialStateTypes } from "src/interfaces/initialState.interface";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateTypes = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, actions: PayloadAction<string>) => {
      state.token = actions.payload;
    },
    deleteToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, deleteToken } = userSlice.actions;
export default userSlice.reducer;
