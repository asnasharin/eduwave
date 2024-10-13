import { createSlice } from "@reduxjs/toolkit";
import { AuthInterface, errorMessage } from "../../types/authTypes";
import { signup, login, googleAuth } from "./authService";
import Cookies from "js-cookie";

const user = localStorage.getItem("user");
const initialState: AuthInterface = {
  user: user ? JSON.parse(user) : null,
  isError: false,
  errorMessage: {
    message: "",
    status: null,
  },
  isLoading: false,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = {
        message: "",
        status: null,
      };
      state.isSuccess = false;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      Cookies.remove("token");
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.user = action.payload.user;
        Cookies.set("token", action.payload.tocken, { expires: 2 });
        window.location.reload();
      })
      .addCase(signup.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload as errorMessage;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        Cookies.set("token", action.payload.tocken, { expires: 2 });
        window.location.reload();
      })
      .addCase(login.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as errorMessage;
      })
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        Cookies.set("token", action.payload.tocken, { expires: 2 });
        window.location.reload();
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as errorMessage;
      });
    },
});
   
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
