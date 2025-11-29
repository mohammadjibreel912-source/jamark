import React, { useEffect, useState, useContext, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Step4FormFields from "./Step4FormFields"; 
// Import Components
import Modal from "../Modal"; 
import AddressForm from "../AddressForm"; 
import DropzoneUploader from "../DropzoneUploader"; 
import MapSelector from "../MapSelector"; 
import CertificateUpload from "../CertificateUpload"; 
// Import dependencies
import { LookupsService } from "../../services/LookupsService"; 
import { LanguageContext } from "../../context/LanguageContext";
import styles from "../../styles/Step4.module.css"; 

// 🛑 GoogleMapLoader remains here as it manages the map script loading
function GoogleMapLoader({ children, googleMapsApiKey, libraries }) {
    const mapApiKey = googleMapsApiKey || import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: mapApiKey,
        libraries: libraries || ["places"],
        language: "ar",
    });

    if (loadError) {
        return (
            <div style={{ padding: "20px", color: "red", textAlign: "center", fontSize: "16px" }}>
                فشل تحميل الخريطة. الرجاء التحقق من مفتاح API.
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div style={{ padding: "20px", textAlign: "center", fontSize: "16px", color: "#666" }}>
                جاري تحميل الخريطة...
            </div>
        );
    }

    return children;
}

// Global constants & conceptual API paths
const API_BASE_PATH = "/api/Upload";
const REGISTRATION_CERT_URL = `${API_BASE_PATH}/upload-registration-certificate`;
const SPECIALTY_CERT_URL = `${API_BASE_PATH}/upload-certification`;

// 🛑 Conceptual Deletion API path/function
const deleteFileFromApi = async ({ id, filePath }) => {
    console.log(`[API Call]: Deleting file with ID: ${id} and Path: ${filePath}`);
    return true;
};

const Step4 = ({ 
    isFactory = false, 
    onNext, 
    googleMapsApiKey, 
    
    // PROPS: Step 4 Fields (values and setters)
    addressInfo, setAddressInfo, 
    establishmentLocation, setEstablishmentLocation, 
    foundingYear, setFoundingYear, 
    capital, setCapital, 
    notes, setNotes, 
    
    // PROPS: Certificate Paths (values and setters)
    registrationCertificate, setRegistrationCertificate, 
    additionalCertificates, setAdditionalCertificates, // Array of {id, path, name} objects
    
    fieldErrors // Errors passed from parent StepperPage
}) => { 
    const { translations, language } = useContext(LanguageContext);
    const t = translations.step4 || {};

    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("JOD");

    // Modal State
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isUploaderModalOpen, setIsUploaderModalOpen] = useState(false);
    const [isManagerModalOpen, setIsManagerModalOpen] = useState(false); 
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    
    // Local state to hold File objects for display/management *before* upload
    const [regCertificateFile, setRegCertificateFile] = useState(null); 
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const [errors, setErrors] = useState({}); // Local errors for validation feedback

    const primaryTermEn = isFactory ? "Factory" : "Company";
    const primaryTermAr = isFactory ? "المصنع" : "الشركة";

    // --- Utility to get file name from path for display ---
    const getFileNameFromPath = (path) => {
        if (!path) return null;
        const parts = path.split('/');
        return parts[parts.length - 1];
    };

    // --- Validation Function ---
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        
        if (!addressInfo || Object.keys(addressInfo).length === 0) { 
            newErrors.addressInfo = t.requiredAddress || `${primaryTermEn} address is required.`;
            isValid = false;
        }
        if (!establishmentLocation) {
            newErrors.establishmentLocation = t.requiredLocation || `${primaryTermEn} location is required.`;
            isValid = false;
        }
        if (!registrationCertificate) { 
            newErrors.certificateFile = t.requiredRegistrationCert || "Registration Certificate upload is required.";
            isValid = false;
        }
        
        if (!additionalCertificates || additionalCertificates.length === 0) {
            newErrors.specialtyCertificates = t.requiredSpecialtyCert || "At least one specialty certificate is required.";
            isValid = false;
        }
        if (!capital || capital <= 0) {
            newErrors.capital = t.requiredCapital || "Capital must be a positive number.";
            isValid = false;
        }
        if (!foundingYear || foundingYear < 1900 || foundingYear > new Date().getFullYear()) {
            newErrors.foundationYear = t.invalidYear || "Invalid foundation year.";
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    // --- Effects & Lookups ---
    useEffect(() => {
        if (registrationCertificate && !regCertificateFile) {
            setRegCertificateFile({ name: getFileNameFromPath(registrationCertificate), path: registrationCertificate });
        }
        
        const fetchCurrencies = async () => {
            try {
                const currencyList = await LookupsService.getCurrencies();
                const baseUrl = import.meta.env.VITE_ASSETS_BASE_URL || import.meta.env.BASE_URL || "";
                const normalizeIcon = (icon) => {
                    if (!icon) return "";
                    if (icon.startsWith("http") || icon.startsWith("//")) return icon;
                    if (icon.startsWith("/")) {
                        const prefix = baseUrl.replace(/\/$/, "");
                        return `${prefix}${icon}`;
                    }
                    return `${baseUrl}${icon}`;
                };
                const mapped = (currencyList || []).map(c => ({
                    ...c,
                    icon: normalizeIcon(c.icon || c.flag || "")
                }));
                setCurrencies(mapped);
            } catch (err) {
                console.error("Error fetching currencies:", err);
            }
        };
        fetchCurrencies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationCertificate]);

    // Persistence effect
    useEffect(() => {
        const dataToPersist = {
            addressInfo,
            establishmentLocation,
            foundingYear,
            capital,
            notes,
            registrationCertificate,
            additionalCertificates,
        };
        try {
            localStorage.setItem("registrationFormData", JSON.stringify(dataToPersist));
        } catch (e) {
            console.error("Could not save to localStorage:", e);
        }
    }, [addressInfo, establishmentLocation, foundingYear, capital, notes, registrationCertificate, additionalCertificates]);

    // Input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "capital") setCapital(Number(value));
        else if (name === "notes") setNotes(value);
        else if (name === "foundingYear") setFoundingYear(Number(value));

        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    // Modals / dropdowns
    const handleOpenAddressModal = () => setIsAddressModalOpen(true);
    const handleCloseAddressModal = () => setIsAddressModalOpen(false);
    const handleOpenMapModal = () => setIsMapModalOpen(true);
    const handleCloseMapModal = () => setIsMapModalOpen(false);

    const handleSaveAddress = (addressData) => {
        if (!addressData || Object.keys(addressData).length === 0) return;
        setAddressInfo(addressData); 
        setErrors(prev => ({ ...prev, addressInfo: null }));
        handleCloseAddressModal();
    };

    const handleSaveLocation = (locationData) => {
        setEstablishmentLocation(locationData); 
        setErrors(prev => ({ ...prev, establishmentLocation: null }));
        handleCloseMapModal();
    };
    
    const handleYearIconClick = () => {
        setIsYearDropdownOpen(prev => !prev);
        if (isDropdownOpen) setIsDropdownOpen(false);
    };

    const handleSelectYear = (year) => {
        setFoundingYear(year); 
        setErrors(prev => ({ ...prev, foundationYear: null }));
        setIsYearDropdownOpen(false);
    };
    
    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
        if (isYearDropdownOpen) setIsYearDropdownOpen(false);
    };

    const handleSelectCurrency = (currencyCode) => {
        setSelectedCurrencyCode(currencyCode);
        setIsDropdownOpen(false);
    };

    // Certificate handlers (unchanged)
    const handleDeleteCertificate = async (id, path) => {
        try {
            await deleteFileFromApi({ id, filePath: path });
            const updatedCerts = (additionalCertificates || []).filter(cert => cert.id !== id);
            setAdditionalCertificates(updatedCerts);
            try {
                const dataToPersist = {
                    addressInfo,
                    establishmentLocation,
                    foundingYear,
                    capital,
                    notes,
                    registrationCertificate,
                    additionalCertificates: updatedCerts,
                };
                localStorage.setItem("registrationFormData", JSON.stringify(dataToPersist));
            } catch (e) {
                console.error("Could not save to localStorage:", e);
            }
            if (updatedCerts.length === 0) {
                setErrors(prevErr => ({ ...prevErr, specialtyCertificates: t.requiredSpecialtyCert || "At least one specialty certificate is required." }));
            }
        } catch (error) {
            console.error("Failed to delete certificate on server:", error);
        }
    };

    const handleOpenUploaderModal = () => { setIsManagerModalOpen(false); setIsUploaderModalOpen(true); };
    const handleCloseUploaderModal = () => { setIsUploaderModalOpen(false); if (additionalCertificates && additionalCertificates.length > 0) setIsManagerModalOpen(true); };
    const handleOpenManagerModal = () => { setIsManagerModalOpen(false); setIsUploaderModalOpen(true); };
    const handleCloseManagerModal = () => setIsManagerModalOpen(false);

    // Upload helpers (unchanged)
    const uploadFile = async (file, url) => {
        if (!file) return null;
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch(url, { method: "POST", body: formData });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
            }
            const result = await response.json();
            const filePath = result.filePath || result.path || result;
            if (url === SPECIALTY_CERT_URL) {
                const fileId = result.fileId || `temp-${Date.now() + Math.random()}`; 
                return { id: fileId, path: filePath, name: file.name };
            }
            return filePath;
        } catch (error) {
            console.error(`Upload Failed for ${file.name} to ${url}:`, error);
            return null;
        }
    };

    const handleImmediateSwitchToManager = async (newFiles) => {
        const uploadPromises = newFiles.map((file) => uploadFile(file, SPECIALTY_CERT_URL));
        const newUploadedCerts = (await Promise.all(uploadPromises)).filter((cert) => cert !== null);
        const updatedCertificates = [...(additionalCertificates || []), ...newUploadedCerts];
        setAdditionalCertificates(updatedCertificates);
        try {
            const dataToPersist = { addressInfo, establishmentLocation, foundingYear, capital, notes, registrationCertificate, additionalCertificates: updatedCertificates };
            localStorage.setItem("registrationFormData", JSON.stringify(dataToPersist));
        } catch (e) {
            console.error("Could not save certificates to localStorage:", e);
        }
        setErrors(prev => ({ ...prev, specialtyCertificates: null }));
        setIsUploaderModalOpen(false); 
        setIsManagerModalOpen(true);
    };

    const handleUploadRegistrationCertificate = async (e) => {
        const file = e.target.files.length > 0 ? e.target.files[0] : null;
        if (file) {
            setRegCertificateFile(file); 
            const path = await uploadFile(file, REGISTRATION_CERT_URL); 
            if (path) {
                setRegistrationCertificate(path); 
                setErrors(prev => ({ ...prev, certificateFile: null })); 
                try {
                    const dataToPersist = { addressInfo, establishmentLocation, foundingYear, capital, notes, registrationCertificate: path, additionalCertificates };
                    localStorage.setItem("registrationFormData", JSON.stringify(dataToPersist));
                } catch (e) {
                    console.error("Could not save to localStorage:", e);
                }
            } else {
                setRegistrationCertificate(""); 
                setRegCertificateFile(null);
                setErrors(prev => ({ ...prev, certificateFile: "Failed to upload certificate." }));
            }
        } else {
            setRegistrationCertificate(""); 
            setRegCertificateFile(null);
            setErrors(prev => ({ ...prev, certificateFile: t.requiredRegistrationCert || "Registration Certificate is required." }));
        }
    };

    const handleFinalUploadAndSave = () => { setIsManagerModalOpen(false); };

    const handleLocalValidationAndNext = () => {
        if (validateForm()) { if (onNext) onNext(); } else { console.log("Validation failed in Step 4."); }
    };

    const titleText = language === "ar" ? `توثيق  ${primaryTermAr}` : `${primaryTermEn} Address & Documentation Details`;

    // compute baseUrl for icons to pass to the child
    const baseUrl = import.meta.env.VITE_ASSETS_BASE_URL || import.meta.env.BASE_URL || "";

    return (
        <div className={styles.factoryFormContainer} style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
            <h2 className={styles.formTitle}>{titleText}</h2>

            <Step4FormFields
                language={language}
                t={t}
                primaryTermAr={primaryTermAr}
                primaryTermEn={primaryTermEn}

                // Values
                addressInfo={addressInfo}
                establishmentLocation={establishmentLocation}
                foundingYear={foundingYear}
                capital={capital}
                notes={notes}
                registrationCertificate={registrationCertificate}
                regCertificateFile={regCertificateFile}
                additionalCertificates={additionalCertificates}
                currencies={currencies}
                isDropdownOpen={isDropdownOpen}
                isYearDropdownOpen={isYearDropdownOpen}
                errors={errors}

                // Handlers
                onOpenAddressModal={handleOpenAddressModal}
                onOpenMapModal={handleOpenMapModal}
                onUploadRegistrationCertificate={handleUploadRegistrationCertificate}
                onOpenManagerModal={handleOpenManagerModal}
                onHandleChange={handleChange}
                onSelectYear={handleSelectYear}
                onHandleYearIconClick={handleYearIconClick}
                onToggleDropdown={toggleDropdown}
                onSelectCurrency={handleSelectCurrency}
                onDeleteCertificate={handleDeleteCertificate}

                // additional props
                selectedCurrencyCode={selectedCurrencyCode}
                baseUrl={baseUrl}
            />

          
            {isAddressModalOpen && (
                <Modal isOpen={isAddressModalOpen} onClose={handleCloseAddressModal} title={t.addressModalTitle || "Enter Establishment Address"}>
                    <AddressForm onSave={handleSaveAddress} initialData={addressInfo} translations={translations.addressModal} language={language} />
                </Modal>
            )}

            {isMapModalOpen && (
                <Modal isOpen={isMapModalOpen} onClose={handleCloseMapModal} title={t.mapModalTitle || "Select Establishment Location"}>
                    <GoogleMapLoader googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
                        <MapSelector onSave={handleSaveLocation} initialLocation={establishmentLocation} translations={translations.mapModal} language={language} />
                    </GoogleMapLoader>
                </Modal>
            )}

            {isUploaderModalOpen && (
                <Modal isOpen={isUploaderModalOpen} onClose={handleCloseUploaderModal} title={t.uploaderModalTitle || "Upload Specialty Certificates"}>
                    <DropzoneUploader onFilesAdded={handleImmediateSwitchToManager} onClose={handleCloseUploaderModal} />
                </Modal>
            )}

            {isManagerModalOpen && (
                <Modal isOpen={isManagerModalOpen} onClose={handleCloseManagerModal} title={t.managerModalTitle || "Manage Specialty Certificates"}>
                    <CertificateUpload savedPaths={additionalCertificates || []} onDeleteFile={handleDeleteCertificate} onOpenUploader={handleOpenUploaderModal} onSave={handleFinalUploadAndSave} onClose={handleCloseManagerModal} />
                </Modal>
            )}
        </div>
    );
};

export default Step4;