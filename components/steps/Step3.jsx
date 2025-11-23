import React, { useEffect, useContext } from "react";
import { LookupsService } from "../../services/LookupsService";
import { LanguageContext } from "../../context/LanguageContext";

const Step3 = ({
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

  return (
    <div
      className="main-section"
      dir={language === "ar" ? "rtl" : "ltr"}
      style={{ textAlign: language === "ar" ? "right" : "left" }}
    >
      <h2>{translations.step3.title}</h2>

      <div className="form-group">
        <label>
          {translations.step3.companyName} <span className="required-star">*</span>
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>
          {translations.step3.activity} <span className="required-star">*</span>
        </label>
        <select
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
        >
          {activities.length === 0 ? (
            <option>{translations.step3.loading}</option>
          ) : (
            activities.map((a) => (
              <option key={a.id} value={a.id}>
                {language === "ar" ? a.nameAr : a.nameEn}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="form-group">
        <label>
          {translations.step3.companyType} <span className="required-star">*</span>
        </label>
        <select
          value={companyType}
          onChange={(e) => setCompanyType(e.target.value)}
        >
          <option value="">{translations.step3.chooseCompanyType}</option>
          {companyTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          {translations.step3.companyForm} <span className="required-star">*</span>
        </label>
        <select
          value={companyForm}
          onChange={(e) => setCompanyForm(e.target.value)}
        >
          <option value="">{translations.step3.chooseCompanyForm}</option>
          {companyForms.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          {translations.step3.managementMethod} <span className="required-star">*</span>
        </label>
        <select
          value={managementMethod}
          onChange={(e) => setManagementMethod(e.target.value)}
        >
          <option value="">{translations.step3.chooseManagementMethod}</option>
          {managementMethods.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          {translations.step3.managerName} <span className="required-star">*</span>
        </label>
        <input
          type="text"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Step3;
