import { createSlice } from "@reduxjs/toolkit";
import {
  getStudentProfile,
  updateProfile,
  uploadProfile,
} from "./userService";
import { IUserProfileState, errorMessage } from "../../types/userTypes.ts";
import { toast } from "react-toastify";

const profile = localStorage.getItem("profile");
const initialState: IUserProfileState = {
  profile: profile ? JSON.parse(profile) : null,
  isLoading: false,
  isError: false,
  errorMessage: {
    message: "",
    status: null,
  },
  isSuccess: false,
};

const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = {
        message: "",
        status: null,
      };
      state.isSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStudentProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload.userProfile;
        localStorage.setItem(
          "profile",
          JSON.stringify(action.payload.userProfile)
        );
      })
      .addCase(getStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as errorMessage;
      })
      .addCase(uploadProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload.userProfile;
        localStorage.setItem(
          "profile",
          JSON.stringify(action.payload.userProfile)
        );
        toast.success("Profile photo updated!")
      })
      .addCase(uploadProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as {
          message: string;
          status: number | null;
        };
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.profile = action.payload.userProfile;
        localStorage.setItem(
          "profile",
          JSON.stringify(action.payload.userProfile)
        );
        toast.success("Profile updated!")
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as {
          message: string;
          status: number | null;
        };
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
