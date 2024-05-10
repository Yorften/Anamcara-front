import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

const imageSlice = createSlice({
  name: "img",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const { setImages } = imageSlice.actions;
export default imageSlice.reducer;
