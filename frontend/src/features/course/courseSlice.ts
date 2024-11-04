import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../types/courseType";
import { getAllCourses } from "./courseService"

const initialState: initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: {
    status: null,
    message: "",
  },
  count: 0,
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = {
        status: null,
        message: "",
      };
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
        state.courses = [];
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = action.payload.courses;
        state.count = action.payload.count;
      });
  },
});

export const { reset } = courseSlice.actions;
const courseReducer = courseSlice.reducer;
export default courseReducer;
