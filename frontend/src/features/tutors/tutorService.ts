import { createAsyncThunk } from "@reduxjs/toolkit";
import { ItutorSearch } from "../../types/tutorTypes";
import api from "../../Api/api";
import { AxiosError } from "axios";

export const getAllTutors = createAsyncThunk(
  "tutor/get",
  async (
    { language, page, qualification, search, sort }: ItutorSearch,
    thunkAPI
  ) => {
    try {
      const { data } = await api.get(
        `/tutor/all?search=${search}&&page=${page}&&language=${language}&&sort=${sort}&&qualification=${qualification}`
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
