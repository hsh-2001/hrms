import axios from "axios";
import { store, logout } from "../store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error("Network error: Unable to connect to the server");
      store.dispatch(logout());
      return Promise.reject(new Error("Unable to connect to the server. Please check your connection."));
    }

    if ([401].includes(error.response?.status)) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


export default api;