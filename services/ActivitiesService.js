import { api } from "./apiClient";

export const ActivitiesService = {
  getActivities: (search) => api.get("/api/Activities", { params: { search } }),
};
