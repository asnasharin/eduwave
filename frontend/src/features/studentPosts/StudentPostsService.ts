import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/api";
import { AxiosError } from "axios";
import { post } from "../../types/postsType";

export const getStudentPosts = createAsyncThunk(
  "studentPost/getPosts",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/student/posts", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        message: Error || axiosError.message,
        status: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export const createStudentPosts = createAsyncThunk(
  "studentPost/createPosts",
  async (formDate: post, thunkAPI) => {
    try {
      const response = await api.post(
        "/student/posts",
        { formDate },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        message: Error || axiosError.message,
        status: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export const updateStudentPosts = createAsyncThunk(
  "studentPost/updatePost",
  async (formData: post, thunkAPI) => {
    try {
      const response = await api.put(
        `/student/posts/${formData._id}`,
        { formData },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        message: Error || axiosError.message,
        status: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export const deleteStudentPosts = createAsyncThunk(
  "studentPost/deletePost",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.patch(
        `/student/posts/${id}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        message: Error || axiosError.message,
        status: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);
