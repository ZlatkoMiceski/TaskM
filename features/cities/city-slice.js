import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "city",
  initialState: { cityOrigin: "", cityDestination: "", cityOption: "" },
  reducers: {
    setCityOfOrigin(state, action) {
      state.cityOrigin = action.payload;
    },
    setCityOfDestination(state, action) {
      state.cityDestination = action.payload;
    },
    setCityOfOption(state, action) {
      state.cityOption = action.payload;
    },
  },
});


export const cityActions = citySlice.actions;

export default citySlice.reducer;
