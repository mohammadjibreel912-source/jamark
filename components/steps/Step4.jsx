import React, { useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api"; 
import { useStep4Logic } from "../useStep4Logic"; 
import { useCertificateManagement } from "../useCertificateManagement"; 
import Step4FormFields from "./Step4FormFields"; 
import Modal from "../Modal"; 
import AddressForm from "../AddressForm"; 
import DropzoneUploader from "../DropzoneUploader"; 
import MapModalContainer from "../MapModalContainer"; 
import CertificateUpload from "../CertificateUpload"; 
import { LanguageContext } from "../../context/LanguageContext";
import styles from "../../styles/Step4.module.css"; 

const Step4 = (props) => { 
    
    const { 
        t, language, errors, setErrors, currencies, selectedCurrencyCode, 
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
    
    const {
        regCertificateFile,
        handleUploadRegistrationCertificate,
        handleDeleteCertificate,
        handleAddSpecialtyCertificates,
        getFileNameFromPath,
    } = useCertificateManagement(
        props.registrationCertificate, props.setRegistrationCertificate, 
        props.additionalCertificates, props.setAdditionalCertificates,
        setErrors,
        t
    );
    
    const mapApiKey = props.googleMapsApiKey || import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
    const { isLoaded: isMapLoaded, loadError: mapLoadError } = useJsApiLoader({
        googleMapsApiKey: mapApiKey,
        libraries: ["places"],
        language: "ar", 
    });
    
    // 💡 FIX: Normalize the location object before passing it to the modal
    // This handles cases where the saved data uses 'latitude'/'longitude' instead of 'lat'/'lng'
    const normalizedEstablishmentLocation = props.establishmentLocation 
        ? {
            lat: props.establishmentLocation.latitude || props.establishmentLocation.lat,
            lng: props.establishmentLocation.longitude || props.establishmentLocation.lng,
            address: props.establishmentLocation.address, // Keep address/other keys
            ...props.establishmentLocation // Spread original keys in case of others
        }
        : null;


    const handleImmediateSwitchToManager = async (newFiles) => {
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
                        <MapModalContainer 
                            onSave={handleSaveLocation} 
                            // Using the normalized object here
                            initialLocation={normalizedEstablishmentLocation} 
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