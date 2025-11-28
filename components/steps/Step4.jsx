import React, { useEffect, useState, useContext, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
// Import Icons
import calendarIcon from "../../src/assets/calendarIcon.png";
import mapIcon from "../../src/assets/mapIcon.png";
import uploadIcon from "../../src/assets/uploadIcon.png";
import plusIcon from "../../src/assets/plusIcon.png";
import downArrowIcon from "../../src/assets/downArrowIcon.png";
import defaultFlagIcon from "../../src/assets/defaultFlagIcon.png";
import styles from "../../styles/Step4.module.css";

// Import Components (These paths should be correct based on your original file)
import Modal from "../Modal";
import AddressForm from "../AddressForm";
import DropzoneUploader from "../DropzoneUploader";
import MapSelector from "../MapSelector";
import CertificateUpload from "../CertificateUpload";

import { LookupsService } from "../../services/LookupsService";
import { LanguageContext } from "../../context/LanguageContext";

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