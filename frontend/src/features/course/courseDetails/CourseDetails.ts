import { createSlice } from "@reduxjs/toolkit";
import { ICourseDetails } from "../../../types/courseType";
import { getCourseDetails } from "./courseDetailService";

const initialState: ICourseDetails = {
  isError: false,
  isSuccess: false,
  course: null,
  errorMessage: {
    message: "",
    status: null,
  },
  isLoading: false,
};

const couresDetailsSlice = createSlice({
  name: "coureDetails",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = {
        message: "",
        status: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload.course;
      });
  },
});

export const { reset } = couresDetailsSlice.actions;
const courseDetailReducer = couresDetailsSlice.reducer;
export default courseDetailReducer;
