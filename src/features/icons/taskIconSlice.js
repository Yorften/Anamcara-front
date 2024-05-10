import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  icons: [],
};

const taskIconSlice = createSlice({
  name: "taskIcons",
  initialState,
  reducers: {
    setIcons: (state, action) => {
      state.icons = action.payload;
    },
  },
});

export const { setIcons } = taskIconSlice.actions;
export default taskIconSlice.reducer;
