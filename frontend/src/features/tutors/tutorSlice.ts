import { createSlice } from "@reduxjs/toolkit";
import { IinitialState } from "../../types/tutorTypes";
import { getAllTutors } from "./tutorService";

const initialState: IinitialState = {
  count: 0,
  errorMessage: {
    mesage: "",
    status: null,
  },
  isError: false,
  isLoading: false,
  isSuccess: false,
  tutors: [],
};

const tutorsSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = {
        mesage: "",
        status: null,
      };
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTutors.pending, (state) => {
        state.isLoading = true;
        state.tutors = [];
      })
      .addCase(getAllTutors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.count = action.payload.count;
        state.tutors = action.payload.tutors;
      });
  },
});

export const { reset } = tutorsSlice.actions;
const tutorReducer = tutorsSlice.reducer;
export default tutorReducer;
