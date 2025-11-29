import React, { useRef } from 'react';
import styles from "../../styles/Step4.module.css";

import CurrencyDropdown from '../CurrencySelect'; 
import YearDropdown from '../YearDropdown';      
import InputFieldWithIcon from '../InputFieldWithIcon';
import SpecialtyCertificatesInput from '../SpecialtyCertificatesInput'; 

import calendarIcon from "../../src/assets/calendarIcon.png";
import mapIcon from "../../src/assets/mapIcon.png";
import uploadIcon from "../../src/assets/uploadIcon.png";
import plusIcon from "../../src/assets/plusIcon.png";
import downArrowIcon from "../../src/assets/downArrowIcon.png";
import defaultFlagIcon from "../../src/assets/defaultFlagIcon.png";


const Step4FormFields = ({ 
    language,
    t, 
    primaryTermAr,
    primaryTermEn,
    addressInfo, 
    establishmentLocation,
    foundingYear,
    capital,
    notes,
    registrationCertificate,
    regCertificateFile, 
    additionalCertificates, 
    currencies, 
    isDropdownOpen,
    isYearDropdownOpen,
    errors, 
    
    onOpenAddressModal, 
    onOpenMapModal,
    onUploadRegistrationCertificate,
    onOpenManagerModal,
    onHandleChange, 
    onSelectYear,
    onHandleYearIconClick,
    onToggleDropdown,
    onSelectCurrency,
    onDeleteCertificate, 
}) => {
    
    const dropdownRef = useRef(null);
    const yearDropdownRef = useRef(null);

    const primaryTerm = language === "ar" ? primaryTermAr : primaryTermEn;
    
    const getFileNameFromPath = (path) => {
        if (!path) return null;
        const parts = path.split('/');
        return parts[parts.length - 1];
    };
    
    const addressLabel = language === "ar" ? `${t.address} ${primaryTerm}` : `${primaryTerm} ${t.address}`;
    const locationLabel = language === "ar" ? `${t.location} ${primaryTerm}` : `${primaryTerm} ${t.location}`;
    const certificateRegistrationLabel = language === "ar"
        ? `${t.certificate} ${t.registration} ${primaryTerm}`
        : `${primaryTerm} ${t.registration} ${t.certificate}`;
            
    const selectedCurrency = (currencies || []).find((c) => c.code === "JOD"); 
    
    const addressParts = [
        addressInfo?.country,
        addressInfo?.city,
        addressInfo?.street
    ].filter(Boolean);
    const addressSummary = addressParts.join(" - ");

    // ✅✅ التعديل لضمان عرض قيمة نصية للموقع
    const locationSummary = establishmentLocation 
        ? establishmentLocation.address || 
          establishmentLocation.display || 
          `${establishmentLocation.latitude || establishmentLocation.lat}, ${establishmentLocation.longitude || establishmentLocation.lng}`
        : "";

    
    return (
        <div className={styles.formContentArea} dir={language === "ar" ? "rtl" : "ltr"}> 
            
            <InputFieldWithIcon 
                label={addressLabel} 
                error={errors.addressInfo}
            >
                <div
                    className={`${styles.inputWithIconContainer} ${
                        addressSummary ? styles.inputSuccess : (errors.addressInfo ? styles.inputError : '')
                    }`}
                >
                    <input
                        type="text"
                        name="addressDisplay"
                        placeholder={t.addressFactoryPlaceholder}
                        value={addressSummary || (addressInfo && addressInfo.summary) || ""}
                        readOnly
                        title={addressSummary || (addressInfo && addressInfo.summary) || ""}
                        style={{
                            color: addressSummary ? "#0a7a2a" : undefined, 
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
            </InputFieldWithIcon>

            <InputFieldWithIcon 
                label={locationLabel} 
                error={errors.establishmentLocation}
            >
                <div
                    className={`${styles.inputWithIconContainer} ${
                        establishmentLocation ? styles.inputInfo : (errors.establishmentLocation ? styles.inputError : '')
                    }`}
                >
                    <input
                        type="text"
                        name="establishmentLocationDisplay"
                        // 🛑🛑 هنا كان الخطأ، تم استبدال المنطق القديم بـ locationSummary 
                        value={locationSummary} 
                        readOnly
                        placeholder={t.factoryLocationPlaceholder}
                    />
                    <img
                        src={mapIcon}
                        alt="map"
                        className={`${styles.inputIcon} ${styles.clickableIcon}`}
                        onClick={onOpenMapModal}
                    />
                </div>
            </InputFieldWithIcon>

            <InputFieldWithIcon 
                label={certificateRegistrationLabel} 
                error={errors.certificateFile}
            >
                <div
                    className={`${styles.inputWithIconContainer} ${registrationCertificate || regCertificateFile ? styles.inputInfo : (errors.certificateFile ? styles.inputError : '')}`} 
                >
                    <img alt="upload" className={styles.inputIcon} src={uploadIcon} />

                    <div
                        onClick={() => document.getElementById("reg-certificate-upload").click()}
                        style={{ 
                            flexGrow: 1, 
                            padding: "10px 0", 
                            color: registrationCertificate || regCertificateFile ? "#000" : "#888",
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
                                : t.uploadFilePlaceholder)
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
            </InputFieldWithIcon>

            <SpecialtyCertificatesInput
                language={language}
                t={t}
                additionalCertificates={additionalCertificates}
                errors={errors}
                onOpenManagerModal={onOpenManagerModal}
                getFileNameFromPath={getFileNameFromPath}
            />
            
            <InputFieldWithIcon 
                label={t.foundationYear} 
                error={errors.foundationYear}
            >
                <div
                    className={`${styles.inputWithIconContainer} ${errors.foundationYear ? styles.inputError : ''}`}
                    ref={yearDropdownRef}
                    style={{ position: "relative" }}
                >
                    <input
                        type="text"
                        name="foundingYear"
                        value={foundingYear || ""}
                        readOnly 
                        placeholder={t.yearPlaceholder}
                        onClick={onHandleYearIconClick}
                    />
                    <img
                        src={calendarIcon}
                        alt="calendar"
                        className={`${styles.inputIcon} ${styles.clickableIcon}`}
                        onClick={onHandleYearIconClick}
                    />
                    {isYearDropdownOpen && (
                        <YearDropdown selectedYear={foundingYear} onSelect={onSelectYear} language={language} />
                    )}
                </div>
            </InputFieldWithIcon>
            
           

    <InputFieldWithIcon 
        label={t.capital} 
        error={errors.capital}
    >
        <div
            className={`${styles.inputWithIconContainer} ${errors.capital ? styles.inputError : ''}`}
            ref={dropdownRef}
            style={{ position: 'relative' }}
        >
            <div
                className={styles.currencySelector}
                onClick={onToggleDropdown}
            >
                <img
                    src={selectedCurrency?.icon || defaultFlagIcon}
                    alt="currency flag"
                    className={styles.currencyFlag}
                />
                <span className={styles.currencyCode}>{selectedCurrency?.code || "JOD"}</span>
                <img
                    src={downArrowIcon}
                    alt="dropdown arrow"
                    className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.dropdownOpen : ""}`}
                />
                {isDropdownOpen && (
                    <CurrencyDropdown
                        currencies={currencies}
                        selectedCode={selectedCurrency?.code || "JOD"} 
                        onSelect={onSelectCurrency}
                        language={language}
                    />
                )}
            </div>
            <input
                type="number"
                name="capital"
                value={capital || ""}
                onChange={onHandleChange}
                placeholder={t.capitalPlaceholder}
                min="0"
                style={{ paddingLeft: language === "ar" ? "10px" : "115px", paddingRight: language === "en" ? "10px" : "115px" }}
            />
        </div>
    </InputFieldWithIcon>

            
            <InputFieldWithIcon 
                label={t.notes} 
                required={false}
            >
                <textarea
                    name="notes"
                    value={notes || ""}
                    onChange={onHandleChange}
                    placeholder={t.notesPlaceholder}
                    className={styles.textAreaCustom}
                    rows={4}
                    style={{ minHeight: '100px' }}
                />
            </InputFieldWithIcon>
            
        </div>
    );
};

export default Step4FormFields;