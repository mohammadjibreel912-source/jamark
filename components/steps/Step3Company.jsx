import React, { useContext, useState, useMemo, useEffect } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import styles from "../../styles/Step3Company.module.css";

import Modal from "../Modal";
import Activities from "../Activities";
import plusIcon from "../../src/assets/plusIcon.png";

const SelectedTag = ({ activity, language }) => {
  const isRTL = language === "ar";
  return (
    <div
      className={styles.selectedTag} 
      dir={isRTL ? "rtl" : "ltr"}
    >
      {isRTL ? activity.nameAr : activity.nameEn || activity.name}
    </div>
  );
};

const Step3Company = ({
  companyName,
  setCompanyName,
  companyActivities,
  setCompanyActivities,
  companyType,
  setCompanyType,
  companyForm,
  setCompanyForm,
  managementMethod,
  setManagementMethod,
  managerName,
  setManagerName,
  activities,
  companyTypes,
  companyForms,
  managementMethods,
  fieldErrors, 
}) => {
  const { translations, language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);

  useEffect(() => {
    console.log("Step3Company - activities:", activities);
    console.log("Step3Company - companyActivities:", companyActivities);
  }, [activities, companyActivities]);

  const handleOpenActivitiesModal = () => {
    console.log("Opening Activities Modal. Activities count:", activities?.length);
    setIsActivitiesModalOpen(true);
  };

  const handleCloseActivitiesModal = () => {
    console.log("Closing Activities Modal");
    setIsActivitiesModalOpen(false);
  };

  // 🆕 تصحيح: حفظ IDs فقط بدلاً من الكائنات الكاملة
  const handleSaveActivities = (selectedActivityObjects) => {
    console.log("Saving activities (objects):", selectedActivityObjects);
    
    // استخراج IDs من الكائنات المختارة
    const activityIds = selectedActivityObjects.map(activity => activity.id);
    console.log("Extracted IDs:", activityIds);
    
    // حفظ IDs فقط
    setCompanyActivities(activityIds);
    setIsActivitiesModalOpen(false);
  };
  
  // Map activity IDs to full activity objects
  const selectedActivityObjects = useMemo(() => {
    if (!Array.isArray(companyActivities) || !Array.isArray(activities)) {
      return [];
    }
    
    return companyActivities
      .map(id => activities.find(act => act.id === id))
      .filter(Boolean);
  }, [companyActivities, activities]);
  
  const ErrorMessage = ({ fieldName }) => {
    const message = fieldErrors[fieldName];
    return message ? (
      <p className={`${styles.errorMessage} ${isRTL ? styles.rtlText : styles.ltrText}`}>
        {message}
      </p>
    ) : null;
  };

  const getErrorClass = (fieldName) => {
    return fieldErrors[fieldName] ? styles.inputError : '';
  };

  const renderField = (
    fieldName, 
    label,
    value,
    setValue,
    placeholder,
    isSelect,
    options
  ) => (
    <div className={styles.formGroup} key={fieldName}>
      <label className={`${styles.labelBase} ${isRTL ? styles.rtlText : styles.ltrText}`}>
        <span className={styles.labelText}>{label}</span>
        <span className={styles.requiredStar}>*</span>
      </label>
      
      {isSelect ? (
        <>
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            dir={isRTL ? "rtl" : "ltr"}
            className={`${styles.inputBase} ${getErrorClass(fieldName)} ${isRTL ? styles.rtlInput : styles.ltrInput}`}
          >
            <option value="" disabled>
              {translations?.step3?.selectOptionPlaceholder}
            </option>
            {options && options.length > 0 ? (
              options.map((opt) => (
                <option
                  key={opt.id || opt.value || opt.name}
                  value={opt.id || opt.value || opt.name}
                >
                  {isRTL
                    ? opt.nameAr || opt.name
                    : opt.nameEn || opt.name}
                </option>
              ))
            ) : (
              <option disabled>{translations?.step3?.loading}</option>
            )}
          </select>
          <ErrorMessage fieldName={fieldName} />
        </>
      ) : (
        <>
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            dir={isRTL ? "rtl" : "ltr"}
            className={`${styles.inputBase} ${getErrorClass(fieldName)} ${isRTL ? styles.rtlInput : styles.ltrInput}`}
          />
          <ErrorMessage fieldName={fieldName} />
        </>
      )}
    </div>
  );

  const renderActivitiesField = () => {
    const label = translations?.step3?.companyActivities;
    const selectedCount = selectedActivityObjects.length;
    const placeholderText = translations?.step3?.chooseActivity;
    const errorClass = getErrorClass('companyActivities');
    const isActivitiesLoading = !Array.isArray(activities) || activities.length === 0;

    return (
      <div className={styles.formGroup} key="companyActivities">
        <label className={`${styles.labelBase} ${isRTL ? styles.rtlText : styles.ltrText}`}>
          <span className={styles.labelText}>{label}</span>
          <span className={styles.requiredStar}>*</span>
        </label>
        
        <div
          className={`${styles.customMultiSelectContainer} ${errorClass}`} 
          onClick={handleOpenActivitiesModal}
          style={{ cursor: isActivitiesLoading ? 'not-allowed' : 'pointer', opacity: isActivitiesLoading ? 0.6 : 1 }}
        >
          <div className={`${styles.tagsContainer} ${isRTL ? styles.rtlDirection : styles.ltrDirection}`}>
            {selectedCount > 0 ? (
              selectedActivityObjects.map((activity, index) => (
                <SelectedTag
                  key={activity.id ?? `activity-${index}`}
                  activity={activity}
                  language={language}
                />
              ))
            ) : (
              <input
                type="text"
                value={isActivitiesLoading ? "جاري التحميل..." : (placeholderText || translations?.step3?.chooseActivity)}
                readOnly
                dir={isRTL ? "rtl" : "ltr"}
                className={`${styles.placeholderInput} ${isRTL ? styles.rtlInput : styles.ltrInput}`}
              />
            )}
          </div>
          
          <div className={styles.iconContainer}>
            <img
              alt="plusIcon"
              className={styles.clickableIcon}
              src={plusIcon}
            />
          </div>
        </div>
        <ErrorMessage fieldName="companyActivities" />
        
        {isActivitiesLoading && (
          <p style={{ color: '#ff9800', fontSize: '12px', marginTop: '5px' }}>
            ⚠️ جاري تحميل الأنشطة ({activities?.length || 0})
          </p>
        )}
      </div>
    );
  };

  return (
    <div
      className={styles.mainSection}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h2 className={`${styles.title} ${isRTL ? styles.rtlText : styles.ltrText}`}>
        {translations?.step3?.companyInformation}
      </h2>
      
      <div className={styles.formSection}>
        {renderField(
          'companyName', 
          translations?.step3?.companyName,
          companyName,
          setCompanyName,
          translations?.step3?.companyNamePlaceholder,
          false
        )}
        
        {renderActivitiesField()} 
        
        {renderField(
          'companyType', 
          translations?.step3?.companyType,
          companyType,
          setCompanyType,
          translations?.step3?.chooseCompanyType,
          true,
          companyTypes
        )}
        
        {renderField(
          'companyForm', 
          translations?.step3?.companyForm,
          companyForm,
          setCompanyForm,
          translations?.step3?.chooseCompanyForm,
          true,
          companyForms
        )}
        
        {renderField(
          'managementMethod', 
          translations?.step3?.managementMethodCompany,
          managementMethod,
          setManagementMethod,
          translations?.step3?.chooseManagementMethod,
          true,
          managementMethods
        )}
        
        {renderField(
          'managerName', 
          translations?.step3?.authorizedManagerName,
          managerName,
          setManagerName,
          translations?.step3?.managerNamePlaceholder,
          false
        )}
      </div>
      
      {isActivitiesModalOpen && (
        <Modal
          onClose={handleCloseActivitiesModal}
          title={translations?.step3?.selectActivitiesTitle || "Select Activities"}
        >
          <Activities
            initialActivities={selectedActivityObjects}
            onSave={handleSaveActivities}
            onClose={handleCloseActivitiesModal}
            allActivities={activities}
          />
        </Modal>
      )}
    </div>
  );
};

export default Step3Company;