import axios from "axios";
import { store } from "@/redux/store";

const api = axios.create({
  baseURL: "https://haseeb-awesome-server.netlify.app/api/",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user?.token;

    console.log(state.user, "++++ USER DATA ++++");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response Received:", response);
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error("Response Error:", error.response);

      // Handle Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else {
      console.error("Network Error:", error);
    }
    return Promise.reject(error);
  }
);

export default api;
