import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface userSlice {
  value: number;
}

const initialState: userSlice = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

// export const {} = counterSlice.actions;

export default counterSlice.reducer;
