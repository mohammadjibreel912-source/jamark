// src/services/LookupsService.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/Lookups", // لاحظ اننا استخدمنا المسار النسبي
  headers: { "Content-Type": "application/json" },
});

// Generic GET
const apiGet = (url) => axiosInstance.get(url).then((res) => res.data);

export const LookupsService = {
  getCompanyTypes: () => apiGet("/company-types"),
  getCompanyForms: () => apiGet("/company-forms"),
  getManagementMethods: () => apiGet("/management-methods"),
  getFactoryActivitiesWithExamples: () => apiGet("/factory-activities-with-examples"),
  getCurrencies :() =>apiGet("/currencies"),
};
