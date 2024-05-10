import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

const videoSlice = createSlice({
  name: "vid",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const { setVideos } = videoSlice.actions;
export default videoSlice.reducer;
