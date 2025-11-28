import { api } from "./apiClient";

export const AuthService = {
  register: (data) => api.post("/api/Auth/register", data),
  login: (data) => api.post("/api/Auth/login", data),
  logout: (data) => api.post("/api/Auth/logout", data),
  refresh: (data) => api.post("/api/Auth/refresh", data),
  sendOtp: () => api.post("/api/Auth/send-otp"),
  verifyOtp: (data) => api.post("/api/Auth/verify-otp", data),
};
