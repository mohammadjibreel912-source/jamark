import { api } from "./apiClient";

export const TestService = {
  getSecure: () => api.get("/api/Test/secure"),
  getSecureType: () => api.get("/api/Test/secure/type"),
  getPublic: () => api.get("/api/Test/public"),
};
