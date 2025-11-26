import React, { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "../../styles/step3Company.css"; 

// 🔥 Import required components and assets
import Modal from "../Modal"; // Assuming you have a Modal component
import Activities from "../Activities"; // Assuming this is the component for multi-selection
import plusIcon from "../../src/assets/plusIcon.png"; // Assuming you have a plus icon

const Step3Company = ({
  companyName, setCompanyName,
  
  // 🔥 تم تغيير activityId إلى companyActivities (لتناسب التحديد المتعدد)
  companyActivities, setCompanyActivities, // State will hold an array of selected activities
  
  companyType, setCompanyType,
  companyForm, setCompanyForm,
  managementMethod, setManagementMethod,
  managerName, setManagerName,
  
  // Lookup Data (passed as props)
  activities, // Full list of activities for the Activities component
  companyTypes, 
  companyForms, 
  managementMethods,
}) => {
  const { translations, language } = useContext(LanguageContext);
  
  // 🔥 حالة جديدة للتحكم في فتح وإغلاق مربع حوار الأنشطة
  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);

  // Handlers for Modal
  const handleOpenActivitiesModal = () => setIsActivitiesModalOpen(true);
  const handleCloseActivitiesModal = () => setIsActivitiesModalOpen(false);
  
  // Handler to save selected activities from the Activities component
  const handleSaveActivities = (selectedList) => {
    setCompanyActivities(selectedList); // selectedList should be an array of selected objects/IDs
    handleCloseActivitiesModal();
  };


  const renderField = (label, value, setValue, placeholder, isSelect, options) => (
    <div className="label-parent">
      <div className="label" style={{ justifyContent: "flex-start" }}>
        <div className="parent">
          <div className="div">{label} <span style={{ color: "red" }}>*</span></div>
        </div>
      </div>
      <div className="basic" style={{ textAlign: language === "ar" ? "right" : "left" }}>
        {isSelect ? (
          // حقل اختيار (Select)
          <select value={value} onChange={e => setValue(e.target.value)}>
            <option value="">{translations.step3.selectOptionPlaceholder || 'اختر قيمة'}</option> 
            {options && options.length === 0 ? (
              <option disabled>{translations.step3.loading || 'جاري التحميل...'}</option>
            ) : (
              options.map(opt => (
                <option key={opt.id || opt.value} value={opt.id || opt.value || opt.name}>
                  {language === "ar" ? opt.nameAr || opt.name : opt.nameEn || opt.name}
                </option>
              ))
            )}
          </select>
        ) : (
          // حقل إدخال (Input)
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={e => setValue(e.target.value)}
          />
        )}
      </div>
    </div>
  );

  // 🔥 New render function for the Activities Multi-Select field
  const renderActivitiesField = () => {
    const label = translations.step3.companyActivities || "أنشطة الشركة";
    const selectedCount = companyActivities ? companyActivities.length : 0;
    const displayValue = selectedCount > 0 
      ? `${translations.step3.activitiesSelected || 'تم اختيار'} (${selectedCount})` 
      : translations.step3.chooseActivity || "اختر نشاط الشركة...";
      
    return (
      <div className="label-parent">
        <div className="label" style={{ justifyContent: "flex-start" }}>
          <div className="parent">
            <div className="div">{label} <span style={{ color: "red" }}>*</span></div>
          </div>
        </div>
        {/* The custom input/button for Multi-Select */}
        <div className="basic custom-multi-select" 
            style={{ 
              textAlign: language === "ar" ? "right" : "left",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
            onClick={handleOpenActivitiesModal}
        >
          <input
            type="text"
            value={displayValue}
            readOnly
            style={{ flexGrow: 1, cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }}
          />
          <img 
            src={plusIcon} 
            alt="Add"
            className="input-icon"
style={{ width: '20px', height: '20px', cursor: 'pointer', filter: 'hue-rotate(100deg) saturate(2)' }}  />
        </div>
      </div>
    );
  };

  return (
    <div className="main-section" dir={language === "ar" ? "rtl" : "ltr"}>
      <h2 style={{ textAlign: language === "ar" ? "right" : "left" }}>{translations.step3.companyInformation || "معلومات الشركة"}</h2>

      {/* 1. Company Name */}
      {renderField(
        translations.step3.companyName, 
        companyName, 
        setCompanyName, 
        translations.step3.companyNamePlaceholder, 
        false
      )}
      
      {/* 2. Company Activities (Multi-Select Modal) */}
      {renderActivitiesField()}
      
      {/* 3. Company Type */}
      {renderField(
        translations.step3.companyType, 
        companyType, 
        setCompanyType, 
        translations.step3.chooseCompanyType, 
        true, 
        companyTypes 
      )}
      
      {/* 4. Company Form */}
      {renderField(
        translations.step3.companyForm, 
        companyForm, 
        setCompanyForm, 
        translations.step3.chooseCompanyForm, 
        true, 
        companyForms 
      )}
      
      {/* 5. Management Method (Updated Label: طريقة إدارة الشركة) */}
      {renderField(
        translations.step3.managementMethodCompany || "طريقة إدارة الشركة", // Use updated or fallback label
        managementMethod, 
        setManagementMethod, 
        translations.step3.chooseManagementMethod, 
        true, 
        managementMethods 
      )}
      
      {/* 6. Manager Name (Updated Label: اسم المدير المفوض) */}
      {renderField(
        translations.step3.authorizedManagerName || "اسم المدير المفوض", // Use updated or fallback label
        managerName, 
        setManagerName, 
        translations.step3.managerNamePlaceholder, 
        false
      )}

      {/* ------------------ Activities Modal ------------------ */}
      {isActivitiesModalOpen && (
        <Modal 
          onClose={handleCloseActivitiesModal} 
          title={translations.step3.selectActivitiesTitle || "اختيار أنشطة الشركة"}
        >
          <Activities 
            initialActivities={companyActivities} // Pass currently selected activities
            fullActivitiesList={activities} // Pass the full lookup data
            onSave={handleSaveActivities}
            onClose={handleCloseActivitiesModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Step3Company;