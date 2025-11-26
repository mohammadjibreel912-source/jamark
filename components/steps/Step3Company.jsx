import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "../../styles/step3Company.css"; // Your CSS

const Step3Company = ({
  companyName, setCompanyName,
  activityId, setActivityId,
  companyType, setCompanyType,
  companyForm, setCompanyForm,
  managementMethod, setManagementMethod,
  managerName, setManagerName,
  
  // 🔥 هذه البيانات يجب أن تكون ممررة من StepperPage بعد جلبها
  activities, 
  companyTypes, 
  companyForms, 
  managementMethods,
  
  // تم إزالة 'step' لأنه لم يعد يستخدم لجلب البيانات
}) => {
  const { translations, language } = useContext(LanguageContext);
  
  // 🔥 تم إزالة الـ useEffect لجعل المكون يعتمد على الـ Props الممررة


  const renderField = (label, value, setValue, placeholder, isSelect, options) => (
    <div className="label-parent">
      <div className="label" style={{ justifyContent: "flex-start" }}> {/* always left */}
        <div className="parent">
          <div className="div">{label} <span style={{ color: "red" }}>*</span></div>
        </div>
      </div>
      <div className="basic" style={{ textAlign: language === "ar" ? "right" : "left" }}>
        {isSelect ? (
          // حقل اختيار (Select)
          <select value={value} onChange={e => setValue(e.target.value)}>
            {/* إضافة خيار افتراضي للسماح باختيار أي شيء */}
            <option value="">{translations.step3.selectOptionPlaceholder || 'اختر قيمة'}</option> 
            {options.length === 0 ? (
              <option disabled>{translations.step3.loading}</option>
            ) : (
              options.map(opt => (
                // استخدام id أو value للمفتاح والقيمة، واستخدام nameAr/nameEn للعرض
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

  return (
    <div className="main-section" dir={language === "ar" ? "rtl" : "ltr"}>
      <h2 style={{ textAlign: language === "ar" ? "right" : "left" }}>معلومات الشركة</h2>

      {renderField(
        translations.step3.companyName, 
        companyName, 
        setCompanyName, 
        translations.step3.companyNamePlaceholder, 
        false
      )}
      
      {renderField(
        translations.step3.activity, 
        activityId, 
        setActivityId, 
        translations.step3.chooseActivity, 
        true, 
        activities // بيانات الـ Lookup
      )}
      
      {renderField(
        translations.step3.companyType, 
        companyType, 
        setCompanyType, 
        translations.step3.chooseCompanyType, 
        true, 
        companyTypes // بيانات الـ Lookup
      )}
      
      {renderField(
        translations.step3.companyForm, 
        companyForm, 
        setCompanyForm, 
        translations.step3.chooseCompanyForm, 
        true, 
        companyForms // بيانات الـ Lookup
      )}
      
      {renderField(
        translations.step3.managementMethod, 
        managementMethod, 
        setManagementMethod, 
        translations.step3.chooseManagementMethod, 
        true, 
        managementMethods // بيانات الـ Lookup
      )}
      
      {renderField(
        translations.step3.managerName, 
        managerName, 
        setManagerName, 
        translations.step3.managerNamePlaceholder, 
        false
      )}
    </div>
  );
};

export default Step3Company;