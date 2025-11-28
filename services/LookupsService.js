// src/services/LookupsService.js

import axios from "axios";

// 🔥 التعديل: نستخدم مساراً نسبياً يبدأ بـ '/api' فقط،
// وسيقوم الـ Proxy بتحويله إلى العنوان الكامل 'http://165.227.20.222'
// مما يحل مشكلة CORS في بيئة التطوير.
const axiosInstance = axios.create({
  // افترض أن إعداد الـ Proxy في vite.config.js يعيد توجيه '/api' إلى الخادم
  baseURL: "/api/Lookups", 
  headers: { "Content-Type": "application/json" },
});

// Generic GET
const apiGet = (url) => axiosInstance.get(url).then((res) => res.data);

export const LookupsService = {
  /**
   * يجلب أنواع الشركات المتاحة.
   * المسار الفعلي: /api/Lookups/company-types
   */
  getCompanyTypes: () => apiGet("/company-types"),

  /**
   * يجلب أشكال الشركات المتاحة.
   * المسار الفعلي: /api/Lookups/company-forms
   */
  getCompanyForms: () => apiGet("/company-forms"),

  /**
   * يجلب طرق الإدارة المتاحة.
   * المسار الفعلي: /api/Lookups/management-methods
   */
  getManagementMethods: () => apiGet("/management-methods"),

  /**
   * يجلب أنشطة المصانع مع أمثلة.
   * المسار الفعلي: /api/Lookups/factory-activities-with-examples
   */
  getFactoryActivitiesWithExamples: () => apiGet("/factory-activities-with-examples"),

  /**
   * يجلب العملات المتاحة.
   * المسار الفعلي: /api/Lookups/currencies
   */
  getCurrencies: () => apiGet("/currencies"),
};