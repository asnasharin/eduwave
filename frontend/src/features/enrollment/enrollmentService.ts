import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../Api/api";

export const getEntollments = createAsyncThunk(
  "enrollment/get",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/student/my-coures");
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
