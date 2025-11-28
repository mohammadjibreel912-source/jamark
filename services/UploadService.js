import { api } from "./apiClient";

export const UploadService = {
  uploadProductImage: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/api/Upload/upload-product-image", formData);
  },
  uploadRegistrationCertificate: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/api/Upload/upload-registration-certificate", formData);
  },
  uploadCertification: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/api/Upload/upload-certification", formData);
  },
};
