import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: Cookies.get("token"),
  isLoading: true,
  userRoles: [],
  userInGuild: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      Cookies.set("token", action.payload);
    },
    setUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearStore: (state) => {
      state.user = null;
      state.token = null;
      state.userRoles = [];
    },
    setUserInGuild: (state, action) => {
      state.userInGuild = action.payload;
    },
  },
});

export const {
  setUser,
  setToken,
  setUserRoles,
  setIsLoading,
  clearStore,
  setUserInGuild,
} = authSlice.actions;
export default authSlice.reducer;
