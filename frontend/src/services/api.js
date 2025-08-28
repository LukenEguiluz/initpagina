import axios from "axios";
import { config } from "../config";

const API_BASE_URL = config.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(config.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(config.TOKEN_KEY);
      localStorage.removeItem(config.REFRESH_TOKEN_KEY);
      localStorage.removeItem(config.USER_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post("/auth/login/", credentials);
    return response.data;
  },

  register: async (credentials) => {
    const response = await api.post("/auth/register/", credentials);
    return response.data;
  },

  logout: async () => {
    const refresh_token = localStorage.getItem(config.REFRESH_TOKEN_KEY);
    if (refresh_token) {
      await api.post("/auth/logout/", { refresh_token });
    }
    localStorage.removeItem(config.TOKEN_KEY);
    localStorage.removeItem(config.REFRESH_TOKEN_KEY);
    localStorage.removeItem(config.USER_KEY);
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile/");
    return response.data;
  },
};

export const teamAPI = {
  getTeamMembers: async () => {
    const response = await api.get("/api/team/public");
    return response.data;
  },

  getOwners: async () => {
    const response = await api.get("/api/team/owners");
    return response.data;
  },

  getInterns: async () => {
    const response = await api.get("/api/team/interns");
    return response.data;
  },
};

export default api;
