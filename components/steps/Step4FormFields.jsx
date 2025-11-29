import React, { useRef } from 'react';
import styles from "../../styles/Step4.module.css";
// Import Icons
import calendarIcon from "../../src/assets/calendarIcon.png";
import mapIcon from "../../src/assets/mapIcon.png";
import uploadIcon from "../../src/assets/uploadIcon.png";
import plusIcon from "../../src/assets/plusIcon.png";
import downArrowIcon from "../../src/assets/downArrowIcon.png";
import defaultFlagIcon from "../../src/assets/defaultFlagIcon.png";

// 🛑 Helper Components (Keep in Step4FormFields for UI/Interaction)
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


const Step4FormFields = ({ 
    language,
    t, // Translations for step4
    primaryTermAr,
    primaryTermEn,
    
    // Values
    addressInfo, 
    establishmentLocation,
    foundingYear,
    capital,
    notes,
    registrationCertificate,
    regCertificateFile, // Local file object for display
    additionalCertificates, // 👈 Expected to be Array of {id, path, name} objects
    currencies, // Lookup data for currency dropdown
    isDropdownOpen,
    isYearDropdownOpen,
    errors, // Local validation errors
    
    // Handlers (passed from Step4.jsx)
    onOpenAddressModal, 
    onOpenMapModal,
    onUploadRegistrationCertificate,
    onOpenManagerModal,
    onHandleChange, // General input change handler
    onSelectYear,
    onHandleYearIconClick,
    onToggleDropdown,
    onSelectCurrency,
    onDeleteCertificate, // 👈 Added for file deletion 
}) => {
    
    const dropdownRef = useRef(null);
    const yearDropdownRef = useRef(null);

    const primaryTerm = language === "ar" ? primaryTermAr : primaryTermEn;
    
    // --- Utility to get file name from path for display ---
    const getFileNameFromPath = (path) => {
        if (!path) return null;
        const parts = path.split('/');
        return parts[parts.length - 1];
    };
    
    // --- Dynamic Labels ---
    const addressLabel = language === "ar" ? `عنوان ${primaryTerm}` : `${primaryTerm} Address`;
    const locationLabel = language === "ar" ? `موقع ${primaryTerm}` : `${primaryTerm} Location`;
    const certificateRegistrationLabel = language === "ar"
                ? `${t.certificate || "شهادة"} ${t.registration || "تسجيل"} ${primaryTerm}`
                : `${primaryTerm} ${t.registration || "Registration"} ${t.certificate || "Certificate"}`;
            
    const BASE_URL = "";
    const selectedCurrency = (currencies || []).find((c) => c.code === "JOD");

    // --- Build single-line summary for country - city - street (keep other address fields intact) ---
    const addressParts = [
        addressInfo?.country,
        addressInfo?.city,
        addressInfo?.street
    ].filter(Boolean);
    const addressSummary = addressParts.join(" - "); // e.g. "Jordan - Amman - Al-Hash"
    
    return (
        <div className={styles.formContentArea}> 
            {/* 1. Address */}
            <div className={styles.formField}>
                <label>
                    {addressLabel} <span style={{ color: "red" }}>*</span>
                </label>
                <div
                    className={`${styles.inputWithIconContainer} ${
                        addressSummary ? styles.inputSuccess : (errors.addressInfo ? styles.inputError : '')
                    }`}
                >
                    {/* show the concatenated country - city - street in the same input */}
                    <input
                        type="text"
                        name="addressDisplay"
                        placeholder={t.addressFactoryPlaceholder || "Click plus to enter address"}
                        value={addressSummary || (addressInfo && addressInfo.summary) || ""}
                        readOnly
                        title={addressSummary || (addressInfo && addressInfo.summary) || ""}
                        style={{
                            color: addressSummary ? "#0a7a2a" : undefined, // green text when present
                            fontWeight: addressSummary ? 600 : undefined
                        }}
                    />
                    <img
                        alt="plusIcon"
                        className={`${styles.inputIcon} ${styles.clickableIcon}`}
                        src={plusIcon}
                        onClick={onOpenAddressModal}
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
                        establishmentLocation ? styles.inputInfo : (errors.establishmentLocation ? styles.inputError : '')
                    }`}
                >
                    <input
                        type="text"
                        name="establishmentLocationDisplay"
                        value={
                            establishmentLocation
                                ? establishmentLocation.display || `${establishmentLocation.lat}, ${establishmentLocation.lng}`
                                : ""
                        }
                        readOnly
                        placeholder={t.factoryLocationPlaceholder || "Click map icon to select location"}
                    />
                    <img
                        src={mapIcon}
                        alt="map"
                        className={`${styles.inputIcon} ${styles.clickableIcon}`}
                        onClick={onOpenMapModal}
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
                    className={`${styles.inputWithIconContainer} ${registrationCertificate ? styles.inputInfo : (errors.certificateFile ? styles.inputError : '')}`} 
                >
                    <img alt="upload" className={styles.inputIcon} src={uploadIcon} />

                    <div
                        onClick={() => document.getElementById("reg-certificate-upload").click()}
                        style={{ 
                            flexGrow: 1, 
                            padding: "10px 0", 
                            color: registrationCertificate ? "#000" : "#888",
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
                        {regCertificateFile
                            ? regCertificateFile.name
                            : (registrationCertificate 
                                ? getFileNameFromPath(registrationCertificate)
                                : t.uploadFilePlaceholder || "Choose a file...")
                        }
                    </div>

                    <input
                        id="reg-certificate-upload"
                        type="file"
                        style={{ display: "none" }}
                        onChange={onUploadRegistrationCertificate}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                </div>
                {errors.certificateFile && <span className={styles.errorText}>{errors.certificateFile}</span>}
            </div>

            {/* 4. Specialty Certificates (Multiple Upload via Modal) */}
            <div className={styles.formField}>
                <label>
                    {t.specialtyCertificates || "Specialty Certificates"}{" "}
                    <span style={{ color: "red" }}>*</span>
                </label>
                <div
                    className={`${styles.inputWithIconContainer} ${styles.fileTagsContainer} ${
                        (Array.isArray(additionalCertificates) && additionalCertificates.length > 0) ? styles.inputInfo : (errors.specialtyCertificates ? styles.inputError : '')
                    }`}
                    dir={language} 
                    onClick={onOpenManagerModal} 
                >
                    {Array.isArray(additionalCertificates) && additionalCertificates.length > 0 ? (
                        additionalCertificates.map((cert) => (
                            <span 
                                key={cert.id || cert.path} 
                                className={styles.fileTag} 
                                onClick={(e) => e.stopPropagation()} 
                            >
                                {cert.name || getFileNameFromPath(cert.path)}
                                <button
                                    className={styles.deleteButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteCertificate(cert.id, cert.path);
                                    }}
                                >
                                    X
                                </button>
                            </span>
                        ))
                    ) : (
                        <div className={styles.filePlaceholder}>
                            {t.uploadMultipleFiles || "Manage files by clicking the plus icon"}
                        </div>
                    )}
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
                        onClick={onHandleYearIconClick} 
                    />

                    <input
                        type="number"
                        name="foundingYear"
                        value={foundingYear}
                        onChange={onHandleChange}
                        placeholder="YYYY"
                        className={styles.yearInput}
                        dir={language}
                        onClick={onHandleYearIconClick} 
                    />

                    {isYearDropdownOpen && (
                        <YearDropdown
                            selectedYear={foundingYear}
                            onSelect={onSelectYear}
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
                    <input
                        type="number"
                        name="capital"
                        value={capital}
                        onChange={onHandleChange}
                        placeholder={t.capitalPlaceholder || "Enter Amount"}
                        className={`${styles.capitalInput} ${errors.capital ? styles.inputError : ''}`}
                        style={{ 
                            borderRadius: language === "ar" ? "0 4px 4px 0" : "4px 0 0 4px",
                            borderLeft: language === "ar" ? "none" : "1px solid #ccc",
                            borderRight: language === "en" ? "none" : "1px solid #ccc",
                        }}
                        dir={language}
                    />

                    <div
                        className={styles.currencyCustomSelectWrapper}
                        ref={dropdownRef}
                    >
                        <div
                            onClick={onToggleDropdown}
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
                                    {"JOD"} 
                                </span>
                            </div>
                            <img
                                src={downArrowIcon}
                                alt="Arrow"
                                className={styles.arrowIcon}
                            />
                        </div>
                        {isDropdownOpen && (
                            <CurrencyDropdown
                                currencies={currencies}
                                selectedCode={"JOD"}
                                onSelect={onSelectCurrency}
                                language={language}
                            />
                        )}
                    </div>
                </div>
                {errors.capital && <span className={styles.errorText}>{errors.capital}</span>}
            </div>
            
            {/* 7. Notes (ملاحظات) */}
            <div className={styles.formField}>
                <label>
                    {t.notes || "Notes"}
                </label>
                <textarea
                    name="notes"
                    rows="3"
                    value={notes}
                    onChange={onHandleChange}
                    placeholder={t.notesPlaceholder || "Enter any additional notes..."}
                    className={styles.notesInput}
                    dir={language}
                />
            </div>
        </div>
    );
};

export default Step4FormFields;