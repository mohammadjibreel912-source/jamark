<<<<<<< HEAD
import React, { useEffect, useState, useContext, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
// Import Icons
=======
// src/components/Step4.jsx

import React, { useEffect, useState, useContext, useRef } from "react";
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
import calendarIcon from "../../src/assets/calendarIcon.png";
import mapIcon from "../../src/assets/mapIcon.png";
import uploadIcon from "../../src/assets/uploadIcon.png";
import plusIcon from "../../src/assets/plusIcon.png";
<<<<<<< HEAD
import downArrowIcon from "../../src/assets/downArrowIcon.png";
import defaultFlagIcon from "../../src/assets/defaultFlagIcon.png";
import styles from "../../styles/Step4.module.css";

// Import Components (These paths should be correct based on your original file)
=======
import downArrowIcon from "../../src/assets/building.png";
import defaultFlagIcon from "../../src/assets/background.jpg";
import "../../styles/step4.css";

// --- Import necessary components ---
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
import Modal from "../Modal";
import AddressForm from "../AddressForm";
import DropzoneUploader from "../DropzoneUploader";
import MapSelector from "../MapSelector";
<<<<<<< HEAD
import CertificateUpload from "../CertificateUpload";
=======
// -----------------------------------
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524

import { LookupsService } from "../../services/LookupsService";
import { LanguageContext } from "../../context/LanguageContext";

<<<<<<< HEAD
const API_BASE_URL = "http://165.227.20.222/api/Upload";
const REGISTRATION_CERT_URL = `${API_BASE_URL}/upload-registration-certificate`;
const SPECIALTY_CERT_URL = `${API_BASE_URL}/upload-certification`;
const BASE_URL = "https://corplatform.sfo3.digitaloceanspaces.com/";

const CurrencyDropdown = ({ currencies, selectedCode, onSelect, language }) => {
    const getCurrencyName = (cur) => {
        if (language === "ar" && cur.nameAr) return cur.nameAr;
        if (cur.name) return cur.name;
        return cur.code;
    };

    return (
        <div 
            className={styles.dropdownList}
            style={{ 
                [language === "ar" ? "right" : "left"]: 0,
            }}
        >
            {currencies.map((cur) => (
                <div
                    key={cur.code}
                    onClick={() => onSelect(cur.code)}
                    className={`${styles.dropdownItem} ${cur.code === selectedCode ? styles.dropdownItemSelected : ""}`}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            cur.code === selectedCode ? "#d0f0ff" : "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            cur.code === selectedCode ? "#e0f7ff" : "white")
                    }
                >
                    <span className={styles.currencyCodeText}>{cur.code}</span>
                    <span
                        className={styles.currencyNameText}
                        dir={language} 
                    >
                        ({getCurrencyName(cur)})
                    </span>
                </div>
            ))}
        </div>
    );
};

// --- 2. Google Map Loader Wrapper ---
function GoogleMapLoader({ children, googleMapsApiKey, libraries }) {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey,
        libraries,
        language: "ar",
    });

    if (loadError) {
        return <div>فشل تحميل الخريطة. الرجاء التحقق من مفتاح API.</div>;
    }

    if (!isLoaded) {
        return <div>جاري تحميل الخريطة...</div>;
    }

    return children;
}

// --- 3. Component for Custom Year Picker Dropdown ---
const YearDropdown = ({ selectedYear, onSelect, language }) => {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    return (
        <div
            className={styles.yearDropdownList}
            style={{
                [language === "ar" ? "right" : "left"]: 0,
            }}
        >
            {years.map((year) => (
                <div
                    key={year}
                    onClick={() => onSelect(year)}
                    className={`${styles.yearDropdownItem} ${year === selectedYear ? styles.yearDropdownItemSelected : ""}`}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            year === selectedYear ? "#d0f0ff" : "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            year === selectedYear ? "#e0f7ff" : "white")
                    }
                >
                    {year}
                </div>
            ))}
        </div>
    );
};

// --- 4. Main Component Step4 (with onNext and googleMapsApiKey props) ---
const Step4 = ({ step, isFactory = false, onNext, googleMapsApiKey }) => { // MODIFIED: Added props
    const { translations, language } = useContext(LanguageContext);
    const t = translations.step4 || {};

    const dropdownRef = useRef(null);
    const yearDropdownRef = useRef(null);

    const [currencies, setCurrencies] = useState([]);
    
    // Modal States
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isUploaderModalOpen, setIsUploaderModalOpen] = useState(false);
    const [isManagerModalOpen, setIsManagerModalOpen] = useState(false); 
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    
    // File State for display and management BEFORE final upload
    const [uploadedCertificates, setUploadedCertificates] = useState([]); 

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const [formData, setFormData] = useState({
        addressInfo: null,
        establishmentLocation: null,
        certificate: null,
        certificatePath: null,
        specialtyCertificatesPaths: [],
        foundationYear: new Date().getFullYear(),
        capital: 10000,
        currency: "JOD",
        notes: "",
    });

    // Validation State
    const [errors, setErrors] = useState({});

    const primaryTermEn = isFactory ? "Factory" : "Company";
    const primaryTermAr = isFactory ? "المصنع" : "الشركة";

    const selectedCurrency = currencies.find((c) => c.code === formData.currency);

    // --- Validation Function ---
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.addressInfo) {
            newErrors.addressInfo = t.requiredAddress || `${primaryTermEn} address is required.`;
            isValid = false;
        }

        if (!formData.establishmentLocation) {
            newErrors.establishmentLocation = t.requiredLocation || `${primaryTermEn} location is required.`;
            isValid = false;
        }

        if (!formData.certificatePath) {
            newErrors.certificatePath = t.requiredRegistrationCert || "Registration Certificate is required.";
            isValid = false;
        }

        // MODIFIED: Check specialty certs length
        if (uploadedCertificates.length === 0) {
            newErrors.specialtyCertificates = t.requiredSpecialtyCert || "At least one specialty certificate is required.";
            isValid = false;
        }

        if (formData.foundationYear < 1900 || formData.foundationYear > new Date().getFullYear()) {
             newErrors.foundationYear = t.invalidYear || "Invalid foundation year.";
             isValid = false;
        }

        if (formData.capital <= 0 || !formData.capital) {
            newErrors.capital = t.requiredCapital || "Capital must be a positive number.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    // --- Effects for Closing Dropdowns on Outside Click ---
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        function handleYearClickOutside(event) {
            if (
                yearDropdownRef.current &&
                !yearDropdownRef.current.contains(event.target)
            ) {
                setIsYearDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleYearClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleYearClickOutside);
        };
    }, [yearDropdownRef]);

    // --- Effect for Fetching Currencies ---
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const currencyList = await LookupsService.getCurrencies();
                setCurrencies(currencyList || []);
                
                if (currencyList && currencyList.length > 0) {
                   const defaultCurrency = currencyList.find(c => c.code === "JOD") ? "JOD" : currencyList[0].code;
                   setFormData((prev) => ({ ...prev, currency: defaultCurrency })); 
                }
            } catch (err) {
                console.error("Error fetching currencies:", err);
            }
        };
        fetchCurrencies();
    }, [step]);

    // --- Input Change Handler ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericValue = ["capital", "foundationYear"].includes(name) ? Number(value) : value;

        setFormData((prev) => ({ ...prev, [name]: numericValue }));
        
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // --- Year Dropdown Handlers ---
    const handleYearIconClick = () => {
        setIsYearDropdownOpen((prev) => !prev);
        if (isDropdownOpen) setIsDropdownOpen(false);
    };

    const handleSelectYear = (year) => {
        setFormData((prev) => ({ ...prev, foundationYear: year }));
        setErrors(prev => ({ ...prev, foundationYear: null }));
        setIsYearDropdownOpen(false);
    };

    // --- Modal/Dropdown Handlers ---
    const handleOpenAddressModal = () => setIsAddressModalOpen(true);
    const handleCloseAddressModal = () => setIsAddressModalOpen(false);

    const handleDeleteCertificate = (fileToRemove) => {
        setUploadedCertificates((prev) => prev.filter(file => file !== fileToRemove));
        
        if (uploadedCertificates.length === 1) {
             setErrors(prev => ({ ...prev, specialtyCertificates: t.requiredSpecialtyCert || "At least one specialty certificate is required." }));
        }
    };

    const handleOpenUploaderModal = () => {
        setIsManagerModalOpen(false);
        setIsUploaderModalOpen(true);
    }; 
    
    const handleCloseUploaderModal = () => setIsUploaderModalOpen(false);

    const handleOpenManagerModal = () => {
        // Open manager directly if files exist, otherwise open uploader
        if (uploadedCertificates.length > 0) {
            setIsManagerModalOpen(true);
        } else {
            handleOpenUploaderModal();
        }
    };
    const handleCloseManagerModal = () => setIsManagerModalOpen(false);


    const handleOpenMapModal = () => setIsMapModalOpen(true);
    const handleCloseMapModal = () => setIsMapModalOpen(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
        if (isYearDropdownOpen) setIsYearDropdownOpen(false);
    };

    const handleSelectCurrency = (currencyCode) => {
        setFormData((prev) => ({ ...prev, currency: currencyCode }));
        setIsDropdownOpen(false);
    };

    const handleSaveAddress = (addressData) => {
        setFormData((prev) => ({ ...prev, addressInfo: addressData }));
        setErrors(prev => ({ ...prev, addressInfo: null }));
        handleCloseAddressModal();
    };

    const handleSaveLocation = (locationData) => {
        setFormData((prev) => ({ ...prev, establishmentLocation: locationData }));
        setErrors(prev => ({ ...prev, establishmentLocation: null }));
        handleCloseMapModal();
    };

    // -----------------------------------------------------------------
    // Upload Handlers (Kept in Step4.jsx and enhanced)
    // -----------------------------------------------------------------

    const uploadFile = async (file, url) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `HTTP error! status: ${response.status}. Details: ${errorText}`
                );
            }

            const result = await response.json();
            const filePath = result.filePath || result.path || result;
            console.log(`Upload Success: ${file.name}. Path returned:`, filePath);

            return filePath;
        } catch (error) {
            console.error(`Upload Failed for ${file.name} to ${url}:`, error);
            return null;
        }
    };


    // 1. Handle Registration Certificate Upload
    const handleUploadRegistrationCertificate = async (e) => {
        const file = e.target.files.length > 0 ? e.target.files[0] : null;

        if (file) {
            setFormData((prev) => ({ ...prev, certificate: file })); 
            const path = await uploadFile(file, REGISTRATION_CERT_URL);

            if (path) {
                setFormData((prev) => ({ ...prev, certificatePath: path }));
                setErrors(prev => ({ ...prev, certificatePath: null }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    certificate: null,
                    certificatePath: null,
                }));
                 setErrors(prev => ({ ...prev, certificatePath: "Failed to upload certificate." }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                certificate: null,
                certificatePath: null,
            }));
            setErrors(prev => ({ ...prev, certificatePath: t.requiredRegistrationCert || "Registration Certificate is required." }));
        }
    };

    // 2. Handle Immediate Switch to Manager (after Dropzone selection)
    const handleImmediateSwitchToManager = (newFiles) => {
        setUploadedCertificates((prev) => [...prev, ...newFiles]);
        setErrors(prev => ({ ...prev, specialtyCertificates: null }));

        setIsUploaderModalOpen(false);
        setIsManagerModalOpen(true);
    };

    // 3. Final Upload of all Specialty Certificates
    const handleFinalUploadAndSave = async () => {
        const uploadPromises = uploadedCertificates.map((file) =>
             uploadFile(file, SPECIALTY_CERT_URL)
        );

        const uploadedPaths = (await Promise.all(uploadPromises)).filter(
            (path) => path !== null
        );

        setFormData((prev) => ({
            ...prev,
            specialtyCertificatesPaths: uploadedPaths,
        }));
        
        setIsManagerModalOpen(false);
        console.log("Final Specialty Certificates Paths saved.");
    }

    // Example function to call validation on next step action
    const handleNextStep = () => {
        if (validateForm()) {
            console.log("Form is valid. Proceeding to next step with data:", formData);
            if (onNext) {
                onNext(formData);
            }
        } else {
            console.log("Form validation failed. Errors:", errors);
        }
    };

    // -----------------------------------------------------------------
    // DYNAMIC LABELS
    // -----------------------------------------------------------------
    const addressLabel =
        language === "ar" ? `عنوان ${primaryTermAr}` : `${primaryTermEn} Address`;

    const locationLabel =
        language === "ar" ? `موقع ${primaryTermAr}` : `${primaryTermEn} Location`;

    const titleText =
        language === "ar"
            ? `توثيق  ${primaryTermAr}`
            : `${primaryTermEn} Address & Documentation Details`;

            
 const certificateRegistrationLabel =
    language === "ar"
        ? `${t.certificate || "شهادة"} ${t.registration || "تسجيل"} ${primaryTermAr}` // النتيجة: شهادة تسجيل المصنع
        : `${primaryTermEn} ${welcome.companyDocs[1]} ${welcome.companyDocs[1]}`; // النتيجة: Factory Registration Certificate

    return (
        <div className={styles.factoryFormContainer} style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
            <h2 className={styles.formTitle}>{titleText}</h2>

            <div className={styles.formContentArea}> 
                {/* 1. Address (Factory/Company) */}
                <div className={styles.formField}>
                    <label>
                        {addressLabel} <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                        className={`${styles.inputWithIconContainer} ${
                            formData.addressInfo ? styles.inputSuccess : (errors.addressInfo ? styles.inputError : '')
                        }`}
                    >
                        <input
                            type="text"
                            name="addressDisplay"
                            placeholder={
                                t.addressFactoryPlaceholder || "Click plus to enter address"
                            }
                            value={
                                formData.addressInfo
                                    ? formData.addressInfo.summary || t.addressSaved || "Address Saved"
                                    : ""
                            }
                            readOnly
                        />
                        <img
                            alt="plusIcon"
                            className={`${styles.inputIcon} ${styles.clickableIcon}`}
                            src={plusIcon}
                            onClick={handleOpenAddressModal}
                        />
                    </div>
                    {errors.addressInfo && <span className={styles.errorText}>{errors.addressInfo}</span>}
                </div>

                {/* 2. Location (Map Selector) */}
                <div className={styles.formField}>
                    <label>
                        {locationLabel} <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                        className={`${styles.inputWithIconContainer} ${
                            formData.establishmentLocation ? styles.inputInfo : (errors.establishmentLocation ? styles.inputError : '')
                        }`}
                    >
                        <input
                            type="text"
                            name="establishmentLocationDisplay"
                            value={
                                formData.establishmentLocation
                                    ? formData.establishmentLocation.display || `${formData.establishmentLocation.lat}, ${formData.establishmentLocation.lng}`
                                    : ""
                            }
                            readOnly
                            placeholder={
                                t.factoryLocationPlaceholder ||
                                "Click map icon to select location"
                            }
                        />
                        <img
                            src={mapIcon}
                            alt="map"
                            className={`${styles.inputIcon} ${styles.clickableIcon}`}
                            onClick={handleOpenMapModal}
                        />
                    </div>
                    {errors.establishmentLocation && <span className={styles.errorText}>{errors.establishmentLocation}</span>}
                </div>

                {/* 3. Registration Certificate (Single File + Direct Upload) */}
                <div className={styles.formField}>
               <label>
        {certificateRegistrationLabel} 
        <span style={{ color: "red" }}>*</span>
    </label>
                    <div
                        className={`${styles.inputWithIconContainer} ${errors.certificatePath ? styles.inputError : ''}`}
                    >
                        <img alt="upload" className={styles.inputIcon} src={uploadIcon} />

                        <div
                            onClick={() =>
                                document.getElementById("reg-certificate-upload").click()
                            }
                            style={{ 
                                flexGrow: 1, 
                                padding: "10px 0", 
                                color: formData.certificate ? "#000" : "#888",
                                cursor: "pointer",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                direction: language === "ar" ? "rtl" : "ltr",
                                justifyContent: language === "ar" ? "flex-end" : "flex-start",
                                paddingLeft: language === "ar" ? "10px" : "0",
                                paddingRight: language === "en" ? "10px" : "0",
                            }}
                        >
                            {formData.certificate
                                ? formData.certificate.name
                                : t.uploadFilePlaceholder || "Choose a file..."}
                        </div>

                        <input
                            id="reg-certificate-upload"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleUploadRegistrationCertificate}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                    </div>
                    {formData.certificatePath && (
                        <p className={styles.certificatePathText} dir={language}>
                            {t.uploadedPath || "Path"}: {formData.certificatePath}
                        </p>
                    )}
                    {errors.certificatePath && <span className={styles.errorText}>{errors.certificatePath}</span>}
                </div>

                {/* 4. Specialty Certificates (Multiple Upload via Modal) */}
                <div className={styles.formField}>
                    <label>
                        {t.specialtyCertificates || "Specialty Certificates"}{" "}
                        <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                        className={`${styles.inputWithIconContainer} ${styles.fileTagsContainer} ${
                            uploadedCertificates.length > 0 ? styles.inputInfo : (errors.specialtyCertificates ? styles.inputError : '')
                        }`}
                        dir={language} 
                        onClick={handleOpenManagerModal} 
                    >
                        {/* Logic to display file names as "tags" */}
                        {uploadedCertificates.length > 0 ? (
                            uploadedCertificates.map((file, index) => (
                                <span key={index} className={styles.fileTag}>
                                    {file.name}
                                </span>
                            ))
                        ) : (
                            // Placeholder text when no files are present
                            <div className={styles.filePlaceholder}>
                                {t.uploadMultipleFiles || "Manage files by clicking the plus icon"}
                            </div>
                        )}
                        {/* Plus icon always stays at the end */}
                        <img
                            alt="plusIcon"
                            className={`${styles.inputIcon} ${styles.clickableIcon}`}
                            src={plusIcon}
                            style={{ width: "24px", height: "24px", flexShrink: 0 }}
                        />
                    </div>
                    {errors.specialtyCertificates && <span className={styles.errorText}>{errors.specialtyCertificates}</span>}
                </div>


                {/* 5. Foundation Year (Custom Year Picker) */}
                <div className={styles.formField}>
                    <label>
                        {t.foundationYear || "Foundation Year"}{" "}
                        <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                        className={`${styles.inputWithIconContainer} ${errors.foundationYear ? styles.inputError : ''}`}
                        ref={yearDropdownRef}
                        style={{ position: "relative" }}
                    >
                        <img
                            src={calendarIcon}
                            alt="calendar"
                            className={`${styles.inputIcon} ${styles.clickableIcon}`}
                            onClick={handleYearIconClick}
                        />

                        <input
                            type="number"
                            name="foundationYear"
                            value={formData.foundationYear}
                            onChange={handleChange}
                            placeholder="YYYY"
                            className={styles.yearInput}
                            dir={language}
                        />

                        {isYearDropdownOpen && (
                            <YearDropdown
                                selectedYear={formData.foundationYear}
                                onSelect={handleSelectYear}
                                language={language}
                            />
                        )}
                    </div>
                     {errors.foundationYear && <span className={styles.errorText}>{errors.foundationYear}</span>}
                </div>

                {/* 6. Capital + Currency (Custom Flag Dropdown) */}
                <div className={styles.formField}>
                    <label>
                        {t.capital || "Capital"} <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className={styles.capitalCurrencyContainer}>
                        {/* 1. Capital Input */}
                        <input
                            type="number"
                            name="capital"
                            value={formData.capital}
                            onChange={handleChange}
                            placeholder={t.capitalPlaceholder || "Enter Amount"}
                            className={`${styles.capitalInput} ${errors.capital ? styles.inputError : ''}`}
                            style={{ 
                                borderRadius: language === "ar" ? "0 4px 4px 0" : "4px 0 0 4px",
                                borderLeft: language === "ar" ? "none" : "1px solid #ccc",
                                borderRight: language === "en" ? "none" : "1px solid #ccc",
                            }}
                            dir={language}
                        />

                        {/* 2. Custom Currency Dropdown Container */}
                        <div
                            className={styles.currencyCustomSelectWrapper}
                            ref={dropdownRef}
                        >
                            <div
                                onClick={toggleDropdown}
                                className={styles.currencyDisplayContainer}
                                style={{
                                    borderRadius:
                                        language === "ar" ? "4px 0 0 4px" : "0 4px 4px 0",
                                    borderLeft: language === "ar" ? "1px solid #ccc" : "none",
                                    borderRight: language === "en" ? "1px solid #ccc" : "none",
                                }}
                                dir={language}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <img
                                        src={
                                            selectedCurrency
                                                ? `${BASE_URL}${selectedCurrency.icon}`
                                                : defaultFlagIcon
                                        }
                                        alt={selectedCurrency ? selectedCurrency.code : "Currency"}
                                        className={styles.currencyIcon}
                                    />
                                    <span className={styles.currencyCodeText}>
                                        {formData.currency || "USD"}
                                    </span>
                                </div>
                                <img
                                    src={downArrowIcon}
                                    alt="Arrow"
                                    className={styles.arrowIcon}
                                    style={{
                                        transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0)",
                                    }}
                                />
                            </div>

                            {/* The INLINE Dropdown List */}
                            {isDropdownOpen && (
                                <CurrencyDropdown
                                    currencies={currencies}
                                    selectedCode={formData.currency}
                                    onSelect={handleSelectCurrency}
                                    language={language}
                                />
                            )}
                        </div>
                    </div>
                    {errors.capital && <span className={styles.errorText}>{errors.capital}</span>}
                </div>

                {/* 7. Notes */}
                <div className={styles.formField}>
                    <label>{t.notes || "Notes"}</label>
                    <textarea
                        name="notes"
                        placeholder={t.notesPlaceholder || "Enter any relevant comments..."}
                        value={formData.notes}
                        onChange={handleChange}
                        className={styles.textarea}
                        dir={language}
                    />
                </div>
            </div>

            {/* --- Modals --- */}
            {isAddressModalOpen && (
                <Modal onClose={handleCloseAddressModal} title={t.addressModalTitle || "Enter Address"}>
                    <AddressForm onSave={handleSaveAddress} initialData={formData.addressInfo} />
                </Modal>
            )}

            {isMapModalOpen && googleMapsApiKey && ( 
                 <GoogleMapLoader googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
                     <Modal onClose={handleCloseMapModal} title={t.mapModalTitle || "Select Location on Map"}>
                         <MapSelector onSave={handleSaveLocation} initialData={formData.establishmentLocation} />
                     </Modal>
                 </GoogleMapLoader>
            )}
            
            {/* Fallback if no API key is provided */}
            {isMapModalOpen && !googleMapsApiKey && (
                 <Modal onClose={handleCloseMapModal} title={t.mapModalTitle || "Select Location on Map"}>
                     <div>Error: Google Maps API key is missing or invalid.</div>
                 </Modal>
            )}

            {isUploaderModalOpen && (
                <Modal onClose={handleCloseUploaderModal} title={t.uploaderModalTitle || "Upload Certificates"}>
                    <DropzoneUploader 
                        onUploadComplete={handleImmediateSwitchToManager} 
                        onClose={handleCloseUploaderModal} 
                        multiple={true} 
                    />
                </Modal>
            )}
            
            {/* The Certificate Management Modal (CertificateUpload Component) */}
            {isManagerModalOpen && (
                <Modal onClose={handleCloseManagerModal} title={t.managerModalTitle || "Manage Specialty Certificates"}>
                    <CertificateUpload 
                        files={uploadedCertificates} 
                        onDelete={handleDeleteCertificate}
                        onUploadMore={handleOpenUploaderModal} 
                        onSave={handleFinalUploadAndSave} 
                    />
                </Modal>
            )}
            
            
        </div>
    );
};

export default Step4;
=======
// 🔥 المسارات الأساسية للـ API والملفات
const API_BASE_URL = "http://165.227.20.222/api/Upload";
const REGISTRATION_CERT_URL = `${API_BASE_URL}/upload-registration-certificate`;
const SPECIALTY_CERT_URL = `${API_BASE_URL}/upload-certification`;
const BASE_URL = "https://corplatform.sfo3.digitaloceanspaces.com/"; // هذا صحيح بالفعل
// -----------------------------------------------------------------
// 1. Component for Custom Currency Dropdown (with Flag)
// -----------------------------------------------------------------
const CurrencyDropdown = ({ currencies, selectedCode, onSelect, language }) => {
  const getCurrencyName = (cur) => {
    if (language === "ar" && cur.nameAr) return cur.nameAr;
    if (cur.name) return cur.name;
    return cur.code;
  };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 100,
        width: "100%",
        maxHeight: "200px",
        overflowY: "auto",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        marginTop: "5px",
        [language === "ar" ? "right" : "left"]: 0,
      }}
    >
      {currencies.map((cur) => (
        <div
          key={cur.code}
          onClick={() => onSelect(cur.code)}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 15px",
            cursor: "pointer",
            backgroundColor: cur.code === selectedCode ? "#e0f7ff" : "white",
            borderBottom: "1px solid #eee",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              cur.code === selectedCode ? "#d0f0ff" : "#f0f0f0")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              cur.code === selectedCode ? "#e0f7ff" : "white")
          }
        >
          <img
            src={cur.icon ? `${BASE_URL}${cur.icon}` : defaultFlagIcon}
            alt={cur.code}
            style={{
              width: "24px",
              height: "18px",
              borderRadius: "2px",
              objectFit: "cover",
              [language === "ar" ? "marginLeft" : "marginRight"]: "10px",
            }}
          />
          <span style={{ fontWeight: "bold" }}>{cur.code}</span>
          <span
            style={{
              fontSize: "0.9em",
              color: "#666",
              [language === "ar" ? "marginRight" : "marginLeft"]: "10px",
            }}
          >
            ({getCurrencyName(cur)})
          </span>
        </div>
      ))}
    </div>
  );
};

// -----------------------------------------------------------------
// 2. Component for Custom Year Picker Dropdown
// -----------------------------------------------------------------
const YearDropdown = ({ selectedYear, onSelect, language }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 200,
        width: "100%",
        maxHeight: "200px",
        overflowY: "auto",
        backgroundColor: "white",
        border: "1px solid #0056b3",
        borderRadius: "4px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        marginTop: "5px",
        [language === "ar" ? "right" : "left"]: 0,
      }}
    >
      {years.map((year) => (
        <div
          key={year}
          onClick={() => onSelect(year)}
          style={{
            padding: "8px 15px",
            cursor: "pointer",
            textAlign: "center",
            fontWeight: year === selectedYear ? "bold" : "normal",
            backgroundColor: year === selectedYear ? "#e0f7ff" : "white",
            borderBottom: "1px solid #eee",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              year === selectedYear ? "#d0f0ff" : "#f0f0f0")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              year === selectedYear ? "#e0f7ff" : "white")
          }
        >
          {year}
        </div>
      ))}
    </div>
  );
};

// -----------------------------------------------------------------
// 3. Main Component Step4
// -----------------------------------------------------------------
const Step4 = ({ step, isFactory = false }) => {
  const { translations, language } = useContext(LanguageContext);
  const t = translations.step4 || {};

  const dropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  const [currencies, setCurrencies] = useState([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isUploaderModalOpen, setIsUploaderModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    addressInfo: null,
    establishmentLocation: null,
    // 💡 الملف نفسه (للعرض فقط)
    certificate: null,
    // 🔥 مسار الملف الذي يعيده الـ API
    certificatePath: null,
    // 💡 مصفوفة الملفات المختارة (للعرض فقط)
    specialtyCertificates: [],
    // 🔥 مصفوفة مسارات الملفات التي يعيدها الـ API
    specialtyCertificatesPaths: [],
    foundationYear: new Date().getFullYear(),
    capital: 10000,
    currency: "JOD",
    notes: "",
  });

  const primaryTermEn = isFactory ? "Factory" : "Company";
  const primaryTermAr = isFactory ? "المصنع" : "الشركة";

  const selectedCurrency = currencies.find((c) => c.code === formData.currency);

  // --- Effects for Closing Dropdowns on Outside Click ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    function handleYearClickOutside(event) {
      if (
        yearDropdownRef.current &&
        !yearDropdownRef.current.contains(event.target)
      ) {
        setIsYearDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleYearClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleYearClickOutside);
    };
  }, [yearDropdownRef]);

  // --- Effect for Fetching Currencies ---
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencyList = await LookupsService.getCurrencies();
        setCurrencies(currencyList || []);
        if (currencyList && currencyList.length > 0 && !formData.currency) {
          setFormData((prev) => ({ ...prev, currency: currencyList[0].code }));
        }
      } catch (err) {
        console.error("Error fetching currencies:", err);
      }
    };
    fetchCurrencies();
  }, [step]);

  // --- Input Change Handler ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "capital" || name === "foundationYear") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- Year Dropdown Handlers ---
  const handleYearIconClick = () => {
    setIsYearDropdownOpen((prev) => !prev);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const handleSelectYear = (year) => {
    setFormData((prev) => ({ ...prev, foundationYear: year }));
    setIsYearDropdownOpen(false);
  };

  // --- Modal/Dropdown Handlers ---
  const handleOpenAddressModal = () => setIsAddressModalOpen(true);
  const handleCloseAddressModal = () => setIsAddressModalOpen(false);

  const handleOpenUploaderModal = () => setIsUploaderModalOpen(true);
  const handleCloseUploaderModal = () => setIsUploaderModalOpen(false);

  const handleOpenMapModal = () => setIsMapModalOpen(true);
  const handleCloseMapModal = () => setIsMapModalOpen(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    if (isYearDropdownOpen) setIsYearDropdownOpen(false);
  };

  const handleSelectCurrency = (currencyCode) => {
    setFormData((prev) => ({ ...prev, currency: currencyCode }));
    setIsDropdownOpen(false);
  };

  const handleSaveAddress = (addressData) => {
    setFormData((prev) => ({ ...prev, addressInfo: addressData }));
    handleCloseAddressModal();
  };

  const handleSaveLocation = (locationData) => {
    setFormData((prev) => ({ ...prev, establishmentLocation: locationData }));
    handleCloseMapModal();
  };

  // -----------------------------------------------------------------
  // 📁 دوال الرفع (Upload Handlers) الجديدة والمُعدَّلة
  // -----------------------------------------------------------------

  /**
   * دالة مساعدة لرفع ملف واحد إلى الـ API.
   * @param {File} file الملف المراد رفعه.
   * @param {string} url نقطة نهاية الـ API.
   * @returns {string | null} مسار الملف الذي تم إرجاعه من الخادم أو null في حالة الفشل.
   */
  const uploadFile = async (file, url) => {
    if (!file) return null;

    const formData = new FormData();
    // اسم الحقل (Field Name)
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}. Details: ${errorText}`
        );
      }

      const result = await response.json();

      // المسار عادة ما يكون في حقل 'filePath' أو 'path' أو يتم إرجاعه مباشرة
      const filePath = result.filePath || result.path || result;
      console.log(`✅ Upload Success: ${file.name}. Path returned:`, filePath);

      return filePath;
    } catch (error) {
      console.error(`❌ Upload Failed for ${file.name} to ${url}:`, error);
      // alert(`فشل رفع الملف ${file.name}. تحقق من الـ Console.`);
      return null;
    }
  };

  // 1. معالجة تغيير ملف شهادة التسجيل والرفع المباشر
  const handleUploadRegistrationCertificate = async (e) => {
    const file = e.target.files.length > 0 ? e.target.files[0] : null;

    if (file) {
      setFormData((prev) => ({ ...prev, certificate: file })); // حفظ الملف للعرض

      const path = await uploadFile(file, REGISTRATION_CERT_URL);

      if (path) {
        // حفظ المسار الذي تم إرجاعه من الـ API
        setFormData((prev) => ({ ...prev, certificatePath: path }));
      } else {
        // مسح الملف في حالة فشل الرفع
        setFormData((prev) => ({
          ...prev,
          certificate: null,
          certificatePath: null,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        certificate: null,
        certificatePath: null,
      }));
    }
  };

  // 2. معالجة حفظ الشهادات المتخصصة (يتم الرفع هنا)
  const handleSaveCertificates = async (files) => {
    // تحديث حالة العرض بالملفات المختارة أولاً
    setFormData((prev) => ({ ...prev, specialtyCertificates: files }));

    const uploadedPaths = [];

    if (files && files.length > 0) {
      // رفع كل ملف على حدة بشكل متتابع
      for (const file of files) {
        const path = await uploadFile(file, SPECIALTY_CERT_URL);
        if (path) {
          uploadedPaths.push(path);
        }
      }
    }

    // حفظ جميع المسارات الناجحة في الحالة
    setFormData((prev) => ({
      ...prev,
      specialtyCertificatesPaths: uploadedPaths,
    }));

    handleCloseUploaderModal();
  };

  // -----------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    // 💡 طباعة جميع البيانات للمراجعة
    console.log("Final Form Data:", {
      ...formData,
      certificateName: formData.certificate ? formData.certificate.name : "N/A",
      specialtyCertificatesNames: formData.specialtyCertificates.map(
        (f) => f.name
      ),
    });
    console.log("✅ Final Saved Paths:", {
      certificatePath: formData.certificatePath,
      specialtyCertificatesPaths: formData.specialtyCertificatesPaths,
    });

    alert(t.formSubmitted || "Form Submitted. Check Console for paths.");
  };

  // -----------------------------------------------------------------
  // 🔥 DYNAMIC LABELS
  // -----------------------------------------------------------------
  const addressLabel =
    language === "ar" ? `عنوان ${primaryTermAr}` : `${primaryTermEn} Address`;

  const locationLabel =
    language === "ar" ? `موقع ${primaryTermAr}` : `${primaryTermEn} Location`;

  const titleText =
    language === "ar"
      ? `تفاصيل العنوان والوثائق لـ ${primaryTermAr}`
      : `${primaryTermEn} Address & Documentation Details`;

  return (
    <div
      className="factory-form-container"
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
    >
      <h2 className="form-title">{titleText}</h2>

      <form onSubmit={handleSubmit}>
        {/* 1. Address (Factory/Company) */}
        <div className="form-field">
          <label>
            {addressLabel} <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className="input-with-icon-container"
            style={{
              border: formData.addressInfo
                ? "2px solid #4CAF50"
                : "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <input
              type="text"
              name="addressDisplay"
              placeholder={
                t.addressFactoryPlaceholder || "Click plus to enter address"
              }
              value={formData.addressInfo ? formData.addressInfo.summary : ""}
              readOnly
              style={{ border: "none" }}
            />
            <img
              alt="plusIcon"
              className="input-icon clickable-icon"
              src={plusIcon}
              onClick={handleOpenAddressModal}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* 2. Location (Map Selector) */}
        <div className="form-field">
          <label>
            {locationLabel} <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className="input-with-icon-container"
            style={{
              border: formData.establishmentLocation
                ? "2px solid #007bff"
                : "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <input
              type="text"
              name="establishmentLocationDisplay"
              value={
                formData.establishmentLocation
                  ? formData.establishmentLocation.display
                  : ""
              }
              readOnly
              placeholder={
                t.factoryLocationPlaceholder ||
                "Click map icon to select location"
              }
              style={{ border: "none" }}
            />
            <img
              src={mapIcon}
              alt="map"
              className="input-icon clickable-icon"
              onClick={handleOpenMapModal}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* 3. Registration Certificate (Single File + Direct Upload) */}
        <div className="form-field">
          <label>
            {t.registrationCertificate || "Registration Certificate"}{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className="input-with-icon-container"
            style={{ border: "1px solid #ccc", borderRadius: "4px" }}
          >
            <img alt="upload" className="input-icon" src={uploadIcon} />

            <div
              style={{
                flexGrow: 1,
                padding: "10px 0",
                color: formData.certificate ? "#000" : "#888",
                cursor: "pointer",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() =>
                document.getElementById("reg-certificate-upload").click()
              }
            >
              {/* عرض اسم الملف أو مسار الملف المحفوظ */}
              {formData.certificate
                ? formData.certificate.name
                : t.uploadFilePlaceholder || "Choose a file..."}
            </div>

            <input
              id="reg-certificate-upload"
              type="file"
              style={{ display: "none" }}
              // 🔥 دالة الرفع والتعيين الجديدة
              onChange={handleUploadRegistrationCertificate}
            />
          </div>
          {/* 💡 عرض المسار المحفوظ للتحقق */}
          {formData.certificatePath && (
            <p
              style={{
                marginTop: "5px",
                fontSize: "12px",
                color: "green",
                direction: language === "ar" ? "rtl" : "ltr",
              }}
            >
              {t.uploadedPath || "Path"}: {formData.certificatePath}
            </p>
          )}
        </div>

        {/* 4. Specialty Certificates (Multiple Upload via Modal) */}
        <div className="form-field">
          <label>
            {t.specialtyCertificates || "Specialty Certificates"}{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className="input-with-icon-container"
            style={{ border: "1px solid #ccc", borderRadius: "4px" }}
          >
            <div
              className="file-input-placeholder"
              style={{
                flexGrow: 1,
                padding: "10px 0",
                color:
                  formData.specialtyCertificates.length > 0 ? "#000" : "#888",
              }}
            >
              {formData.specialtyCertificates.length > 0
                ? `${formData.specialtyCertificates.length} ${
                    t.filesSelected || "files selected"
                  }`
                : t.uploadMultipleFiles ||
                  "Upload files by clicking the plus icon"}
            </div>
            <img
              alt="plusIcon"
              className="input-icon clickable-icon"
              src={plusIcon}
              onClick={handleOpenUploaderModal}
              style={{ cursor: "pointer" }}
            />
          </div>
          {/* عرض أسماء الملفات المختارة (للعرض فقط) */}
          {formData.specialtyCertificates.length > 0 && (
            <div className="specialty-files-list">
              {formData.specialtyCertificates.map((file, idx) => (
                <span key={idx} className="file-chip">
                  {file.name}
                </span>
              ))}
            </div>
          )}
          {/* 💡 عرض المسارات المحفوظة للتحقق */}
          {formData.specialtyCertificatesPaths.length > 0 && (
            <div
              className="specialty-files-list"
              style={{ direction: language === "ar" ? "rtl" : "ltr" }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                {t.uploadedPaths || "Uploaded Paths"}:
              </p>
              <ul style={{ padding: "0 20px", margin: 0 }}>
                {formData.specialtyCertificatesPaths.map((path, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "11px",
                      color: "darkgreen",
                      listStyleType: "disc",
                    }}
                  >
                    {path}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 5. Foundation Year (Custom Year Picker) */}
        <div className="form-field">
          <label>
            {t.foundationYear || "Foundation Year"}{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className="input-with-icon-container"
            ref={yearDropdownRef}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <img
              src={calendarIcon}
              alt="calendar"
              className="input-icon clickable-icon"
              onClick={handleYearIconClick}
              style={{ cursor: "pointer" }}
            />

            <input
              type="text"
              name="foundationYear"
              value={formData.foundationYear}
              onChange={handleChange}
              placeholder="YYYY"
              style={{
                border: "none",
                flexGrow: 1,
                padding: "10px 0",
                textAlign: language === "ar" ? "right" : "left",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
                appearance: "none",
              }}
            />

            {isYearDropdownOpen && (
              <YearDropdown
                selectedYear={formData.foundationYear}
                onSelect={handleSelectYear}
                language={language}
              />
            )}
          </div>
        </div>

        {/* 6. Capital + Currency (Custom Flag Dropdown) */}
        <div className="form-field">
          <label>
            {t.capital || "Capital"} <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className="capital-currency-container"
            style={{ display: "flex" }}
          >
            {/* 1. Capital Input */}
            <input
              type="number"
              name="capital"
              value={formData.capital}
              onChange={handleChange}
              className="capital-input"
              placeholder={t.capitalPlaceholder || "Enter Amount"}
              style={{
                flex: 2,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: language === "ar" ? "0 4px 4px 0" : "4px 0 0 4px",
              }}
            />

            {/* 2. Custom Currency Dropdown Container */}
            <div
              className="currency-custom-select-wrapper"
              ref={dropdownRef}
              style={{
                flex: 1,
                minWidth: "150px",
                position: "relative",
                zIndex: 5,
              }}
            >
              <div
                onClick={toggleDropdown}
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ccc",
                  borderLeft: language === "ar" ? "1px solid #ccc" : "none",
                  borderRight: language === "en" ? "1px solid #ccc" : "none",
                  borderRadius:
                    language === "ar" ? "4px 0 0 4px" : "0 4px 4px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  height: "100%",
                }}
              >
                <div
                  className="currency-display"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <img
                    src={
                      selectedCurrency
                        ? `${BASE_URL}${selectedCurrency.icon}`
                        : defaultFlagIcon
                    }
                    alt={selectedCurrency ? selectedCurrency.code : "Currency"}
                    style={{
                      width: "24px",
                      height: "18px",
                      borderRadius: "2px",
                      objectFit: "cover",
                    }}
                  />
                  <span style={{ fontWeight: "bold" }}>
                    {selectedCurrency ? selectedCurrency.code : "Select"}
                  </span>
                </div>
                <img
                  src={downArrowIcon}
                  alt="Arrow"
                  style={{
                    width: "12px",
                    height: "12px",
                    transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </div>

              {/* The INLINE Dropdown List */}
              {isDropdownOpen && (
                <CurrencyDropdown
                  currencies={currencies}
                  selectedCode={formData.currency}
                  onSelect={handleSelectCurrency}
                  language={language}
                />
              )}
            </div>
          </div>
        </div>

        {/* 7. Notes */}
        <div className="form-field">
          <label>{t.notes || "Notes"}</label>
          <textarea
            name="notes"
            placeholder={t.notesPlaceholder || "Enter any relevant comments..."}
            value={formData.notes}
            onChange={handleChange}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
            }}
          />
        </div>
      </form>

      {/* --- Modals --- */}
      {isAddressModalOpen && (
        <Modal onClose={handleCloseAddressModal} title={addressLabel}>
          <AddressForm
            onSave={handleSaveAddress}
            onClose={handleCloseAddressModal}
            initialData={formData.addressInfo}
          />
        </Modal>
      )}

      {isUploaderModalOpen && (
        <Modal
          onClose={handleCloseUploaderModal}
          title={t.specialtyCertificates || "Upload Certificates"}
        >
          {/* 🔥 تمرير دالتي onSave و onClose */}
          <DropzoneUploader
            onSave={handleSaveCertificates}
            onClose={handleCloseUploaderModal}
          />
        </Modal>
      )}

      {isMapModalOpen && (
        <Modal onClose={handleCloseMapModal} title={locationLabel}>
          <MapSelector
            initialLocation={formData.establishmentLocation}
            onSave={handleSaveLocation}
            onClose={handleCloseMapModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Step4;
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
