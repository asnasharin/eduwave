import { createSlice } from "@reduxjs/toolkit";
import { IinitialState } from "../../types/enrollmentType";
import { getEntollments } from "./enrollmentService";
import { errorMessage } from "../../types/authTypes";

const initialState: IinitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  enrollments: [],
  errorMessage: {
    message: "",
    status: null,
  },
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = {
        message: "",
        status: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEntollments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEntollments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enrollments = action.payload.enrollments;
      })
      .addCase(getEntollments.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload as errorMessage;
      });
  },
});

export const { reset } = enrollmentSlice.actions;
const enrollmentReducer = enrollmentSlice.reducer;
export default enrollmentReducer;
