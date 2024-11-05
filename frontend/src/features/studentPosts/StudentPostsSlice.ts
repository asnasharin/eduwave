import { createSlice } from "@reduxjs/toolkit";
import { IStudentPost } from "../../types/postsType";
import {
  getStudentPosts,
  deleteStudentPosts,
  createStudentPosts,
  updateStudentPosts,
} from "./StudentPostsService";
import { errorMessage } from "../../types/authTypes";
import { toast } from "react-toastify";

const initialState: IStudentPost = {
  isLoading: false,
  erroMessage: {
    message: "",
    status: null,
  },
  isSuccess: false,
  isError: false,
  isUpdated: false,
  posts: [],
};

const studentPostSlice = createSlice({
  name: "studentPost",
  initialState,
  reducers: {
    reset: (state) => {
      state.erroMessage = {
        message: "",
        status: null,
      };
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload.posts;
      })
      .addCase(getStudentPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.erroMessage = action.payload as errorMessage;
      })
      .addCase(createStudentPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudentPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload.udatedUser);
        toast.success("Post created successfully!");
      })
      .addCase(createStudentPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.erroMessage = action.payload as errorMessage;
      })
      .addCase(deleteStudentPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudentPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (e) => e._id !== action.payload.post._id
        );
        toast.success("post deleted successfully!");
      })
      .addCase(deleteStudentPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.erroMessage = action.payload as errorMessage;
      })
      .addCase(updateStudentPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudentPosts.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdated = true;
        toast.success("Post updated Succesfully!");
      });
  },
});

export const { reset } = studentPostSlice.actions;
export default studentPostSlice.reducer;
