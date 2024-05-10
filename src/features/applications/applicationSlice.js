import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplication: (state, action) => {
      state.applications = action.payload;
    },
  },
});

export const { setApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
