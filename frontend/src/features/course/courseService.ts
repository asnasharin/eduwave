import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISearch } from "../../types/courseType";
import api from "../../Api/api";
import { AxiosError } from "axios";

export const getAllCourses = createAsyncThunk(
  "course/get",
  async ({ search, category, language, sort, page }: ISearch, thunkAPI) => {
    try {
      const { data } = await api.get(
        `/course?page=${page}&&search=${search}&&sort=${sort}&&category=${category}&&language=${language}`
      );
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
