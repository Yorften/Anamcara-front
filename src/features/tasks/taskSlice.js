import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  custom: [],
};

const taskSlicelice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setCustom: (state, action) => {
      state.custom = action.payload;
    },
  },
});

export const { setTasks, setCustom } = taskSlicelice.actions;
export default taskSlicelice.reducer;
