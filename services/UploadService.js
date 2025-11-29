// src/services/UploadService.js (MUST BE CORRECTED)

import { api } from "./apiClient";

export const UploadService = {
  uploadProductImage: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    // 🛑 FIX: CHANGE "/api/Upload/..." TO "/Upload/..."
    return api.post("/Upload/upload-product-image", formData); 
  },
  uploadRegistrationCertificate: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    // 🛑 FIX: CHANGE "/api/Upload/..." TO "/Upload/..."
    return api.post("/Upload/upload-registration-certificate", formData);
  },
  uploadCertification: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    // 🛑 FIX: CHANGE "/api/Upload/..." TO "/Upload/..."
    return api.post("/Upload/upload-certification", formData);
  },
};