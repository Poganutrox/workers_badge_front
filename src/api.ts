import axios from "axios";
import { getToken, isTokenExpired, logout } from "./services/AuthService";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      if (isTokenExpired()) {
        console.warn("El token ha expirado, cerrando sesión...");
        logout();
        window.location.href = "/login";
        return Promise.reject(new Error("El token ha expirado"));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error))
);

export default api;
