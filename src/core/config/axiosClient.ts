import axios from "axios";
import { useAuthStore } from "../../modules/auth/infrastructure/auth.store";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

// 🔹 Request Interceptor — agrega el token
axiosClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔹 Response Interceptor — detecta 401
axiosClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      //AuthService.logout();
      // aqui quitamos el token
    }
    return Promise.reject(error);
  }
);
