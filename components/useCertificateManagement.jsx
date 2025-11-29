// useCertificateManagement.js

import { useState, useEffect } from 'react';
// 🛑 تأكد من أن المسار هنا صحيح بالنسبة لموقع ملف UploadService.js
import { UploadService } from "../services/UploadService"; 
// 🛑 نحتاج apiClient للحذف (نفترض وجوده في مسار مشابه)
// إذا كان ملف apiClient موجودًا في 'src/utils/apiClient.js'
// import { api } from "../../utils/apiClient"; // (افترضنا أن هذا غير مطلوب هنا إذا استخدمنا UploadService)
const deleteFileFromApi = async ({ id, filePath }) => {
    console.log(`[API Call]: Deleting file with ID: ${id} and Path: ${filePath}`);
    
    // 💡 استخدام apiClient.delete للحذف (افتراض):
    // const deleteUrl = `/api/Upload/delete-file/${id}`; 
    // const response = await api.delete(deleteUrl, { data: { filePath } });
    // return response.data;

    return true; // نتركها وهمية إذا لم يكن لديك مسار حذف API واضح بعد
};

// 💡 تم حذف دالة uploadFile واستبدالها بالخدمات

export const useCertificateManagement = (
    registrationCertificate, setRegistrationCertificate, 
    additionalCertificates, setAdditionalCertificates,
    setErrors, t
) => {

    const [regCertificateFile, setRegCertificateFile] = useState(null); 

    // --- Utility to get file name from path for display ---
    const getFileNameFromPath = (path) => {
        if (!path) return null;
        const parts = path.split('/');
        return parts[parts.length - 1];
    };
    
    // Effect to initialize regCertificateFile if a path exists
    useEffect(() => {
        if (registrationCertificate && !regCertificateFile) {
            setRegCertificateFile({ name: getFileNameFromPath(registrationCertificate), path: registrationCertificate });
        }
    }, [registrationCertificate]);


    // --- Handlers ---

    const handleUploadRegistrationCertificate = async (e) => {
        const file = e.target.files.length > 0 ? e.target.files[0] : null;
        if (!file) {
            setRegistrationCertificate(""); 
            setRegCertificateFile(null);
            setErrors(prev => ({ ...prev, certificateFile: t.requiredRegistrationCert || "Registration Certificate is required." }));
            return;
        }

        try {
            setRegCertificateFile(file); 
            // 🛑 استخدام خدمة الرفع المُحدَّثة
            const response = await UploadService.uploadRegistrationCertificate(file);
            const path = response.data?.filePath || response.data?.path || response.data;
            
            if (path) {
                setRegistrationCertificate(path); 
                setErrors(prev => ({ ...prev, certificateFile: null })); 
            } else {
                // فشل الرفع حتى لو كان الرد 200 ولكن بدون مسار
                throw new Error("API responded without a file path.");
            }
        } catch (error) {
            console.error(`Upload Failed for ${file.name}:`, error);
            setRegistrationCertificate(""); 
            setRegCertificateFile(null);
            setErrors(prev => ({ ...prev, certificateFile: "Failed to upload certificate. Please try again." }));
        }
    };
    
    const handleDeleteCertificate = async (id, path) => {
        try {
            await deleteFileFromApi({ id, filePath: path });
            const updatedCerts = (additionalCertificates || []).filter(cert => cert.id !== id);
            setAdditionalCertificates(updatedCerts);

            if (updatedCerts.length === 0) {
                setErrors(prevErr => ({ ...prevErr, specialtyCertificates: t.requiredSpecialtyCert || "At least one specialty certificate is required." }));
            }
        } catch (error) {
            console.error("Failed to delete certificate on server:", error);
        }
    };

    const handleAddSpecialtyCertificates = async (newFiles) => {
        const uploadPromises = newFiles.map(async (file) => {
            try {
                // 🛑 استخدام خدمة الرفع المُحدَّثة
                const response = await UploadService.uploadCertification(file);
                
                const filePath = response.data?.filePath || response.data?.path;
                const fileId = response.data?.fileId || `temp-${Date.now() + Math.random()}`; 
                
                if (filePath) {
                   return { id: fileId, path: filePath, name: file.name };
                }
                return null;

            } catch (error) {
                console.error(`Specialty Upload Failed for ${file.name}:`, error);
                return null;
            }
        });
        
        const newUploadedCerts = (await Promise.all(uploadPromises)).filter((cert) => cert !== null);
        const updatedCertificates = [...(additionalCertificates || []), ...newUploadedCerts];
        setAdditionalCertificates(updatedCertificates);

        if (updatedCertificates.length > 0) {
            setErrors(prev => ({ ...prev, specialtyCertificates: null }));
        } else {
            setErrors(prevErr => ({ ...prevErr, specialtyCertificates: t.requiredSpecialtyCert || "At least one specialty certificate is required." }));
        }
    };

    return {
        regCertificateFile,
        handleUploadRegistrationCertificate,
        handleDeleteCertificate,
        handleAddSpecialtyCertificates,
        getFileNameFromPath, 
    };
};