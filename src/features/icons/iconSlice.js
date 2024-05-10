import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  icons: [],
};

const iconSlice = createSlice({
  name: "icon",
  initialState,
  reducers: {
    setIcons: (state, action) => {
      state.icons = action.payload;
    },
  },
});

export const { setIcons } = iconSlice.actions;
export default iconSlice.reducer;
