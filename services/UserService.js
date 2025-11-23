import { api } from "./apiClient";

export const UserService = {
  updatePassword: (data) => api.put("/api/User/update-password", data),
  checkEmail: (email) => api.get("/api/User/check-email", { params: { email } }),
};
