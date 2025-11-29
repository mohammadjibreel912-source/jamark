// Step4.jsx
import React, { useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api"; 
import { useStep4Logic } from "../useStep4Logic"; 
import { useCertificateManagement } from "../useCertificateManagement"; 
import Step4FormFields from "./Step4FormFields"; 
import Modal from "../Modal"; 
import AddressForm from "../AddressForm"; 
import DropzoneUploader from "../DropzoneUploader"; 
import MapModalContainer from "../MapModalContainer"; // ⬅️ تم تصحيح اسم المكون
import CertificateUpload from "../CertificateUpload"; 
import { LanguageContext } from "../../context/LanguageContext";
import styles from "../../styles/Step4.module.css"; 

const Step4 = (props) => { 
    
    // --- 1. General Logic Hook ---
    const { 
        t, language, errors, setErrors, currencies, selectedCurrencyCode, // ⬅️ استخلاص setErrors
        primaryTermAr, primaryTermEn,
        isDropdownOpen, isYearDropdownOpen, 
        isAddressModalOpen, isUploaderModalOpen, isManagerModalOpen, isMapModalOpen,
        handleChange, handleLocalValidationAndNext,
        handleSaveAddress, handleSaveLocation, 
        handleSelectYear, handleYearIconClick, 
        handleSelectCurrency, toggleDropdown,
        handleCloseAddressModal, handleOpenAddressModal, handleCloseMapModal, handleOpenMapModal,
        handleCloseUploaderModal, handleOpenUploaderModal, handleCloseManagerModal, handleOpenManagerModal, 
        handleFinalUploadAndSave,
    } = useStep4Logic(props);
    
    // --- 2. Certificate Logic Hook ---
    const {
        regCertificateFile,
        handleUploadRegistrationCertificate,
        handleDeleteCertificate,
        handleAddSpecialtyCertificates,
        getFileNameFromPath,
    } = useCertificateManagement(
        props.registrationCertificate, props.setRegistrationCertificate, 
        props.additionalCertificates, props.setAdditionalCertificates,
        setErrors, // ⬅️ تمرير setErrors
        t
    );
    
    // 3. منطق الخرائط
    const mapApiKey = props.googleMapsApiKey || import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
    const { isLoaded: isMapLoaded, loadError: mapLoadError } = useJsApiLoader({
        googleMapsApiKey: mapApiKey,
        libraries: ["places"],
        language: "ar", 
    });

    const handleImmediateSwitchToManager = async (newFiles) => {
        // بعد الرفع، يتم تحديث الحالة (عبر handleAddSpecialtyCertificates)، ثم ننتقل إلى مدير الشهادات
        await handleAddSpecialtyCertificates(newFiles); 
        handleCloseUploaderModal(); 
        handleOpenManagerModal(); 
    };
    
    const titleText = language === "ar" ? `توثيق ${primaryTermAr}` : `${primaryTermEn} Address & Documentation Details`;
    const baseUrl = import.meta.env.VITE_ASSETS_BASE_URL || import.meta.env.BASE_URL || "";

    return (
        <div className={styles.factoryFormContainer} style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
            <h2 className={styles.formTitle}>{titleText}</h2>

            <Step4FormFields
                language={language} t={t} errors={errors} 
                primaryTermAr={primaryTermAr} primaryTermEn={primaryTermEn}
                addressInfo={props.addressInfo} establishmentLocation={props.establishmentLocation} foundingYear={props.foundingYear}
                capital={props.capital} notes={props.notes} registrationCertificate={props.registrationCertificate}
                additionalCertificates={props.additionalCertificates} 
                regCertificateFile={regCertificateFile} currencies={currencies} selectedCurrencyCode={selectedCurrencyCode}
                isDropdownOpen={isDropdownOpen} isYearDropdownOpen={isYearDropdownOpen}
                onOpenAddressModal={handleOpenAddressModal} onOpenMapModal={handleOpenMapModal} 
                onUploadRegistrationCertificate={handleUploadRegistrationCertificate} onOpenManagerModal={handleOpenManagerModal}
                onHandleChange={handleChange} onSelectYear={handleSelectYear} onHandleYearIconClick={handleYearIconClick}
                onToggleDropdown={toggleDropdown} onSelectCurrency={handleSelectCurrency} onDeleteCertificate={handleDeleteCertificate}
                baseUrl={baseUrl} getFileNameFromPath={getFileNameFromPath}
            />

         
            
            {isAddressModalOpen && (
                <Modal isOpen={isAddressModalOpen} onClose={handleCloseAddressModal} title={t.addressModalTitle}>
                    <AddressForm onSave={handleSaveAddress} initialData={props.addressInfo} translations={t.addressModal} language={language} />
                </Modal>
            )}

            {isMapModalOpen && (
                <Modal isOpen={isMapModalOpen} onClose={handleCloseMapModal} title={t.mapModalTitle}>
                    {mapLoadError ? (
                        <div style={{ padding: "20px", color: "red", textAlign: "center", fontSize: "16px" }}>
                             {t.mapLoadErrorText}
                        </div>
                    ) : !isMapLoaded ? (
                        <div style={{ padding: "20px", textAlign: "center", fontSize: "16px", color: "#666" }}>
                            {t.mapLoadingText}
                        </div>
                    ) : (
                        <MapModalContainer // ⬅️ استخدام المكون الصحيح
                            onSave={handleSaveLocation} 
                            initialLocation={props.establishmentLocation} 
                            translations={t.mapModal} 
                            language={language} 
                        />
                    )}
                </Modal>
            )}

            {isUploaderModalOpen && (
                <Modal isOpen={isUploaderModalOpen} onClose={handleCloseUploaderModal} title={t.uploaderModalTitle}>
                    <DropzoneUploader onFilesAdded={handleImmediateSwitchToManager} onClose={handleCloseUploaderModal} />
                </Modal>
            )}

            {isManagerModalOpen && (
                <Modal isOpen={isManagerModalOpen} onClose={handleCloseManagerModal} title={t.managerModalTitle}>
                    <CertificateUpload 
                        savedPaths={props.additionalCertificates || []} 
                        onDeleteFile={handleDeleteCertificate} 
                        onOpenUploader={handleOpenUploaderModal} 
                        onSave={handleFinalUploadAndSave} 
                        onClose={handleCloseManagerModal} 
                    />
                </Modal>
            )}
        </div>
    );
};

export default Step4;