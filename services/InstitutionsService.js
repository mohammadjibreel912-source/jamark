import { api } from "./apiClient";

export const InstitutionsService = {
  register: (data) => api.post("/api/Institutions/register", data),
};
