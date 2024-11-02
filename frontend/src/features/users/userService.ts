import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/api";
import { AxiosError } from "axios";
import { storage } from "../../app/firebase.ts";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { studentProfile } from "../../types/userTypes.ts";

export const getStudentProfile = createAsyncThunk(
  "userProfile/getStudentprofile",
  async (_, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    try {
      switch (user.role) {
        case "STUDENT": {
          const studentResponse = await api.get("/student", {
            withCredentials: true,
          });
          return studentResponse.data;
        }
        case "TUTOR": {
          const tutorResponse = await api.get("/tutor", {
            withCredentials: true,
          });
          return tutorResponse.data;
        }
        case "ADMIN": {
          const adminResponse = await api.get("/admin", {
            withCredentials: true,
          });
          return adminResponse.data;
        }
        default:
          break;
      }
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



export const uploadProfile = createAsyncThunk(
  "userProfile/uploadProfile",
  async (file: File, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    try {
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, "profile/" + filename);
      const snapshot = await uploadBytes(storageRef, file);
      if (snapshot) {
        const url = await getDownloadURL(storageRef);
        let response;
        if (user.role === "STUDENT") {
          response = await api.patch(
            "/student/updateProfilePicture",
            { url },
            { withCredentials: true }
          );
        } else if (user.role === "TUTOR") {
          response = await api.patch(
            "/tutor/updateProfilePicture",
            { url },
            { withCredentials: true }
          );
        } else if (user.role === "ADMIN") {
          response = await api.patch(
            "/admin/updateProfilePicture",
            { url },
            { withCredentials: true }
          );
        }
        return response?.data;
      }
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



export const updateProfile = createAsyncThunk(
  "userProfile/updateProfile",
  async (data: studentProfile, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    try {
      if (user.role === "STUDENT") {
        const response = await api.post(
          "/student",
          { data },
          { withCredentials: true }
        );
        return response.data;
      } else if (user.role === "TUTOR") {
        const response = await api.post(
          "/tutor",
          { data },
          { withCredentials: true }
        );
        return response.data;
      }
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
