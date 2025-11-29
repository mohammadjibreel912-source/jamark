import React from 'react';
import styles from "../styles/step4.module.css"; 
import plusIcon from "../src/assets/plusIcon.png";

const SpecialtyCertificatesInput = ({ 
    language, 
    t, 
    additionalCertificates, 
    errors, 
    onOpenManagerModal, 
    getFileNameFromPath 
}) => {
    const hasCertificates = Array.isArray(additionalCertificates) && additionalCertificates.length > 0;
    
    return (
        <div className={styles.formField}>
            <label>
                {t.specialtyCertificates || "Specialty Certificates"}{" "} 
                <span style={{ color: "red" }}>*</span>
            </label>
            <div
                className={`${styles.inputWithIconContainer} ${styles.fileTagsContainer} ${styles.clickableInput} ${
                    hasCertificates ? styles.inputSuccess : (errors.specialtyCertificates ? styles.inputError : '')
                }`}
                dir={language} 
                onClick={onOpenManagerModal} 
                style={{ minHeight: '44px', alignItems: 'center', paddingRight: '4px', paddingLeft: '4px' }}
            >
                {hasCertificates ? (
                    additionalCertificates.slice(0, 3).map((cert) => (
                        <span 
                            key={cert.id || cert.path} 
                            className={styles.fileTagClean} 
                            onClick={(e) => e.stopPropagation()} 
                        >
                            {cert.name || getFileNameFromPath(cert.path)}
                        </span>
                    ))
                ) : (
                    <div className={styles.filePlaceholder}>
                        {t.uploadMultipleFiles || "Manage files by clicking the plus icon"}
                    </div>
                )}
                
                {additionalCertificates.length > 3 && (
                    <span className={styles.moreFilesIndicator} onClick={onOpenManagerModal}>
                        + {additionalCertificates.length - 3} {t.moreFiles || "More"}
                    </span>
                )}
                
                <img
                    // تم تحديث هذا السطر لقراءة النص البديل من كائن الترجمة
                    alt={t.plusIconAlt || "Plus icon"}
                    className={`${styles.inputIcon} ${styles.clickableIcon}`}
                    src={plusIcon}
                    style={{ 
                        width: "24px", height: "24px", flexShrink: 0, 
                        position: 'absolute', 
                        [language === "ar" ? "left" : "right"]: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                />
            </div>
            {errors.specialtyCertificates && <span className={styles.errorText}>{errors.specialtyCertificates}</span>}
        </div>
    );
};

export default SpecialtyCertificatesInput;