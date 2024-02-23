import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    saveLogin: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveLogin } = loginSlice.actions;

export default loginSlice.reducer;
