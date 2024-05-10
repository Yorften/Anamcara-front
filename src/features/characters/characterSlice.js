import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
  loading: true,
};

const characterSlicelice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    setLoading: (state,action) =>{
      state.loading = action.payload;
    }
  },
});

export const { setCharacters, setLoading } = characterSlicelice.actions;
export default characterSlicelice.reducer;
