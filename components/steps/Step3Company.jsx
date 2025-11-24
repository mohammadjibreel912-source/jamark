import React, { useEffect, useContext } from "react";
import { LookupsService } from "../../services/LookupsService";
import { LanguageContext } from "../../context/LanguageContext";
import "../../styles/step3Company.css"; // Your CSS

const Step3Company = ({
  companyName, setCompanyName,
  activityId, setActivityId,
  companyType, setCompanyType,
  companyForm, setCompanyForm,
  managementMethod, setManagementMethod,
  managerName, setManagerName,
  activities, setActivities,
  companyTypes, setCompanyTypes,
  companyForms, setCompanyForms,
  managementMethods, setManagementMethods,
  step
}) => {
  const { translations, language } = useContext(LanguageContext);

  useEffect(() => {
    if (step === 3) {
      const fetchLookups = async () => {
        try {
          const [types, forms, methods, acts] = await Promise.all([
            LookupsService.getCompanyTypes(),
            LookupsService.getCompanyForms(),
            LookupsService.getManagementMethods(),
            LookupsService.getFactoryActivitiesWithExamples(),
          ]);
          setCompanyTypes(types || []);
          setCompanyForms(forms || []);
          setManagementMethods(methods || []);
          setActivities(acts || []);
        } catch (err) {
          console.error(err);
        }
      };
      fetchLookups();
    }
  }, [step]);

  const renderField = (label, value, setValue, placeholder, isSelect, options) => (
    <div className="label-parent">
      <div className="label" style={{ justifyContent: "flex-start" }}> {/* always left */}
        <div className="parent">
          <div className="div">{label} <span style={{ color: "red" }}>*</span></div>
        </div>
      </div>
      <div className="basic" style={{ textAlign: language === "ar" ? "right" : "left" }}>
        {isSelect ? (
          <select value={value} onChange={e => setValue(e.target.value)}>
            {options.length === 0 ? (
              <option>{translations.step3.loading}</option>
            ) : (
              options.map(opt => (
                <option key={opt.id || opt.value} value={opt.id || opt.value}>
                  {language === "ar" ? opt.nameAr || opt.name : opt.nameEn || opt.name}
                </option>
              ))
            )}
          </select>
        ) : (
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

      {renderField(translations.step3.companyName, companyName, setCompanyName, translations.step3.companyNamePlaceholder, false)}
      {renderField(translations.step3.activity, activityId, setActivityId, translations.step3.chooseActivity, true, activities)}
      {renderField(translations.step3.companyType, companyType, setCompanyType, translations.step3.chooseCompanyType, true, companyTypes)}
      {renderField(translations.step3.companyForm, companyForm, setCompanyForm, translations.step3.chooseCompanyForm, true, companyForms)}
      {renderField(translations.step3.managementMethod, managementMethod, setManagementMethod, translations.step3.chooseManagementMethod, true, managementMethods)}
      {renderField(translations.step3.managerName, managerName, setManagerName, translations.step3.managerNamePlaceholder, false)}
    </div>
  );
};

export default Step3Company;
