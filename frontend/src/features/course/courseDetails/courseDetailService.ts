import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../Api/api";
import { AxiosError } from "axios";

export const getCourseDetails = createAsyncThunk(
  "courseDetails/getdetails",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await api.get(`/course/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        error: Error,
        statusCode: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);
