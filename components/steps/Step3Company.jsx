<<<<<<< HEAD
import React, { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import styles from "../../styles/Step3Company.module.css";

import Modal from "../Modal";
import Activities from "../Activities";
import plusIcon from "../../src/assets/plusIcon.png";

const SelectedTag = ({ activity, language }) => {
  const isRTL = language === "ar";
  return (
    <div
      key={activity.id}
      className={styles.selectedTag} 
      dir={isRTL ? "rtl" : "ltr"}
    >
      {isRTL ? activity.nameAr : activity.nameEn || activity.name}
    </div>
  );
};

=======
// src/components/Step3Company.js

import React, { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
// import "../../styles/step3Company.css";

import Modal from "../Modal";
import Activities from "../Activities";

// Define the required border/background style for inputs/selects
const INPUT_BASE_STYLE = {
  borderRadius: "4px",
  border: "1px solid #E1E1E1", // Border
  background: "#FFF", // Background color
  height: "36px",
  alignItems: "center",
  alignSelf: "stretch",
};

// SVG Icon for the Add (+) button
const PlusIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{ minWidth: "20px", minHeight: "20px" }}
  >
    <rect width="20" height="20" rx="5" fill="#05BAA3" />
    <path
      d="M15.5554 10.7935H10.7935V15.5554H9.20624V10.7935H4.44434V9.20624H10.7935V4.44434H10.7935V9.20624H15.5554V10.7935Z"
      fill="white"
    />
  </svg>
);

// Helper component for displaying selected tags inside the field
const SelectedTag = ({ activity, language }) => (
  <div
    key={activity.id}
    style={{
      padding: "4px 8px",
      // التحكم في الهامش بناءً على اتجاه اللغة
      marginRight: language === "ar" ? "0" : "5px",
      marginLeft: language === "ar" ? "5px" : "0",
      marginBottom: "4px", // هامش سفلي للمساعدة في الـ wrap
      borderRadius: "4px",
      border: "1px solid #05BAA3",
      backgroundColor: "#f6fffc",
      fontSize: "14px",
      color: "#2e3238",
      whiteSpace: "nowrap",
    }}
  >
    {/* 🛑 المنطق لترجمة اسم النشاط */}
    {language === "ar" ? activity.nameAr : activity.name}
  </div>
);

>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
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
<<<<<<< HEAD
  fieldErrors, 
}) => {
  const { translations, language } = useContext(LanguageContext);
  const isRTL = language === "ar";
=======
}) => {
  // 🛑 استخدام Optional Chaining لتجنب خطأ undefined
  const { translations, language } = useContext(LanguageContext);
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524

  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);

  const handleOpenActivitiesModal = () => setIsActivitiesModalOpen(true);
<<<<<<< HEAD
  const handleCloseActivitiesModal = () => setIsActivitiesModalOpen(false);

  const handleSaveActivities = (selectedList) => {
    setCompanyActivities(selectedList);
    handleCloseActivitiesModal();
  };
  
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
=======
  const handleCloseActivitiesModal = () => setIsActivitiesModalOpen(false); // 🚀 الدالة الرئيسية: تستقبل القائمة المحفوظة وتحدث الحالة وتغلق المودال

  const handleSaveActivities = (selectedList) => {
    setCompanyActivities(selectedList); // تحديث القائمة النهائية (كائنات كاملة)
    handleCloseActivitiesModal();
  }; // --- Reusable Label/Field Renderer (للحقول العادية) ---

  const renderField = (
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
    label,
    value,
    setValue,
    placeholder,
    isSelect,
    options
  ) => (
<<<<<<< HEAD
    <div className={styles.formGroup}>
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
                  key={opt.id || opt.value}
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

=======
    <div
      className="label-parent"
      style={{ display: "flex", flexDirection: "column", gap: "2px" }}
    >
           {" "}
      <label
        style={{
          color: "#2E3238",
          fontSize: "16px",
          fontWeight: "400",
          display: "flex",
          alignItems: "center",
          justifyContent: language === "ar" ? "flex-end" : "flex-start",
          flexDirection: language === "ar" ? "row-reverse" : "row",
          width: "100%",
        }}
      >
                                               {" "}
        <span style={{ order: language === "ar" ? 1 : 2 }}>{label}</span>       
               {" "}
        <span
          className="required-star"
          style={{
            color: "red",
            order: language === "ar" ? 2 : 1,
            marginLeft: language === "ar" ? "0" : "2px",
            marginRight: language === "ar" ? "2px" : "0",
          }}
        >
                              *                {" "}
        </span>
                           {" "}
      </label>
                       {" "}
      {isSelect ? (
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          dir={language === "ar" ? "rtl" : "ltr"}
          style={{
            width: "100%",
            textAlign: language === "ar" ? "right" : "left",
            direction: language === "ar" ? "rtl" : "ltr",
            appearance: "none",
            ...INPUT_BASE_STYLE,
            padding: "7px 10px",
          }}
        >
                                       {" "}
          <option value="" disabled>
                        {translations?.step3?.selectOptionPlaceholder}         {" "}
          </option>
                                       {" "}
          {options && options.length > 0 ? (
            options.map((opt) => (
              <option
                key={opt.id || opt.value}
                value={opt.id || opt.value || opt.name}
              >
                                                               {" "}
                {language === "ar"
                  ? opt.nameAr || opt.name
                  : opt.nameEn || opt.name}
                                                           {" "}
              </option>
            ))
          ) : (
            <option disabled>{translations?.step3?.loading}</option>
          )}
                                 {" "}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          dir={language === "ar" ? "rtl" : "ltr"}
          style={{
            width: "100%",
            textAlign: language === "ar" ? "right" : "left",
            direction: language === "ar" ? "rtl" : "ltr",
            ...INPUT_BASE_STYLE,
            padding: "7px 10px",
          }}
        />
      )}
                   {" "}
    </div>
  ); // --- Activities Field Renderer (Custom Multi-Select) ---
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
  const renderActivitiesField = () => {
    const label = translations?.step3?.companyActivities;
    const selectedCount = companyActivities ? companyActivities.length : 0;
    const placeholderText = translations?.step3?.chooseActivity;
<<<<<<< HEAD
    const errorClass = getErrorClass('companyActivities'); 

    return (
      <div className={styles.formGroup}>
        <label className={`${styles.labelBase} ${isRTL ? styles.rtlText : styles.ltrText}`}>
          <span className={styles.labelText}>{label}</span>
          <span className={styles.requiredStar}>*</span>
        </label>
        
        <div
          className={`${styles.customMultiSelectContainer} ${errorClass}`} 
          onClick={handleOpenActivitiesModal}
        >
          <div className={`${styles.tagsContainer} ${isRTL ? styles.rtlDirection : styles.ltrDirection}`}>
            {selectedCount > 0 ? (
=======

    return (
      <div
        className="label-parent"
        style={{ display: "flex", flexDirection: "column", gap: "2px" }}
      >
                               {" "}
        <label
          style={{
            color: "#2E3238",
            fontSize: "16px",
            fontWeight: "400",
            display: "flex",
            alignItems: "center",
            justifyContent: language === "ar" ? "flex-end" : "flex-start",
            flexDirection: language === "ar" ? "row-reverse" : "row",
            width: "100%",
          }}
        >
                                       {" "}
          <span style={{ order: language === "ar" ? 1 : 2 }}>{label}</span>     
                                 {" "}
          <span
            className="required-star"
            style={{
              color: "red",
              order: language === "ar" ? 2 : 1,
              marginLeft: language === "ar" ? "0" : "2px",
              marginRight: language === "ar" ? "2px" : "0",
            }}
          >
                                    *                    {" "}
          </span>
                                   {" "}
        </label>
                               {" "}
        <div
          className="custom-multi-select-container"
          onClick={handleOpenActivitiesModal} // فتح المودال عند النقر
          style={{
            display: "flex",
            cursor: "pointer",
            ...INPUT_BASE_STYLE,
            padding: "0",
            flexDirection: language === "ar" ? "row-reverse" : "row",
            justifyContent: "space-between",
            height: "auto",
            minHeight: INPUT_BASE_STYLE.height,
            alignItems: "flex-start",
            flexWrap: "wrap", // هام لظهور الـ Tags على أسطر متعددة
          }}
        >
                              {/* Tags/Input Container */}                   {" "}
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              padding: "7px 10px",
              justifyContent: language === "ar" ? "flex-end" : "flex-start",
              direction: language === "ar" ? "rtl" : "ltr",
            }}
          >
                                                 {" "}
            {selectedCount > 0 ? (
              // 🛑 عرض الأنشطة المختارة كـ Tags هنا
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
              companyActivities.map((activity) => (
                <SelectedTag
                  key={activity.id}
                  activity={activity}
                  language={language}
                />
              ))
            ) : (
<<<<<<< HEAD
              <input
                type="text"
                value={placeholderText || translations?.step3?.chooseActivity}
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
=======
              // عرض نص الـ Placeholder
              <input
                type="text"
                value={placeholderText || "اختر نشاط أو أكثر"}
                readOnly
                dir={language === "ar" ? "rtl" : "ltr"}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  outline: "none",
                  width: "100%",
                  color: "#a0a0a0",
                  textAlign: language === "ar" ? "right" : "left",
                  padding: 0,
                }}
              />
            )}
                                           {" "}
          </div>
                              {/* Icon Container (Plus Icon) */}               
             {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              flexShrink: 0,
              alignSelf: "center",
            }}
          >
                                    <PlusIconSvg />                   {" "}
          </div>
                                   {" "}
        </div>
                           {" "}
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
      </div>
    );
  };

  return (
    <div
<<<<<<< HEAD
      className={styles.mainSection}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h2 className={`${styles.title} ${isRTL ? styles.rtlText : styles.ltrText}`}>
        {translations?.step3?.companyInformation}
      </h2>
      
      <div className={styles.formSection}>
        {renderField(
          'companyName', 
=======
      className="main-section"
      dir={language === "ar" ? "rtl" : "ltr"}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
                       {" "}
      <h2
        style={{
          textAlign: language === "ar" ? "right" : "left",
          marginBottom: "10px",
        }}
      >
                        {translations?.step3?.companyInformation}           {" "}
      </h2>
                       {" "}
      <div
        className="form-section"
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
                               {" "}
        {renderField(
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
          translations?.step3?.companyName,
          companyName,
          setCompanyName,
          translations?.step3?.companyNamePlaceholder,
          false
        )}
<<<<<<< HEAD
        
        {renderActivitiesField()}
        
        {renderField(
          'companyType', 
=======
                                {renderActivitiesField()}                       {" "}
        {renderField(
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
          translations?.step3?.companyType,
          companyType,
          setCompanyType,
          translations?.step3?.chooseCompanyType,
          true,
          companyTypes
        )}
<<<<<<< HEAD
        
        {renderField(
          'companyForm', 
=======
                               {" "}
        {renderField(
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
          translations?.step3?.companyForm,
          companyForm,
          setCompanyForm,
          translations?.step3?.chooseCompanyForm,
          true,
          companyForms
        )}
<<<<<<< HEAD
        
        {renderField(
          'managementMethod', 
=======
                               {" "}
        {renderField(
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
          translations?.step3?.managementMethodCompany,
          managementMethod,
          setManagementMethod,
          translations?.step3?.chooseManagementMethod,
          true,
          managementMethods
        )}
<<<<<<< HEAD
        
        {renderField(
          'managerName', 
=======
                               {" "}
        {renderField(
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
          translations?.step3?.authorizedManagerName,
          managerName,
          setManagerName,
          translations?.step3?.managerNamePlaceholder,
          false
        )}
<<<<<<< HEAD
      </div>
      
      {isActivitiesModalOpen && (
        <Modal
          onClose={handleCloseActivitiesModal}
          title={translations?.step3?.selectActivitiesTitle || "Select Activities"}
        >
          <Activities
            initialActivities={companyActivities}
            onSave={handleSaveActivities}
            onClose={handleCloseActivitiesModal}
          />
        </Modal>
      )}
=======
                           {" "}
      </div>
                  {/* Activities Modal */}           {" "}
      {isActivitiesModalOpen && (
        <Modal
          onClose={handleCloseActivitiesModal}
          title={translations?.step3?.selectActivitiesTitle || "اختيار الأنشطة"}
        >
                                       {" "}
          <Activities
            initialActivities={companyActivities} // تمرير القائمة المختارة حالياً (لربط البيانات)
            onSave={handleSaveActivities} // دالة لتحديث الحالة عند الحفظ
            onClose={handleCloseActivitiesModal}
          />
                                   {" "}
        </Modal>
      )}
      {/* أزرار التنقل */}   {" "}
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
    </div>
  );
};

<<<<<<< HEAD
export default Step3Company;
=======
export default Step3Company;
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
