import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:5000/api";

const data = JSON.parse(localStorage.getItem("user") as string);
const user = data as { id: string; email: string; role: string };

const axios_instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: user ? `Bearer ${user.role}` : "",
  },
});

axios_instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.message === "Account has been blocked") {
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      Cookies.remove("token");
    }
    return Promise.reject(error);
  }
);

export default axios_instance;
