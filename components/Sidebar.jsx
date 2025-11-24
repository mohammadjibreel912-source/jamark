import React, { useContext } from "react";
import "../styles/StepperStyles.css";
import { LanguageContext } from "../context/LanguageContext";
import TopRectangle from "../src/assets/TopRectangle.png";
const Sidebar = ({
  step,
  topSelected = [],
  bottomSelected = [],
  name,
  email,
  phone,
  companyName,
  activityId,
  companyType,
  companyForm,
  managementMethod,
  managerName,
  isFactory
}) => {
  const { language } = useContext(LanguageContext);

  const isRTL = language === "ar";

  // ====== Translations ======
  const t = {
    mainTitle: isFactory
      ? (language === "ar" ? "تسجيل مصنع جديد" : "Register New Factory")
      : (language === "ar" ? "تسجيل شركة جديدة" : "Register New Company"),

    establishmentInfo: language === "ar" ? "معلومات المنشأة" : "Establishment Information",
    factory: language === "ar" ? "مصنع" : "Factory",
    company: language === "ar" ? "شركة" : "Company",
    iraqi: language === "ar" ? "عراقية" : "Iraqi",
    foreign: language === "ar" ? "أجنبية" : "Foreign",

    basicInfo: language === "ar" ? "المعلومات الأساسية" : "Basic Information",

    factoryInfo: language === "ar" ? "معلومات المصنع" : "Factory Information",
    companyInfo: language === "ar" ? "معلومات الشركة" : "Company Information",

    documentationTitle:
      language === "ar"
        ? `توثيق ${isFactory ? "المصنع" : "الشركة"}`
        : `${isFactory ? "Factory" : "Company"} Documentation`
  };

  return (
    <div className="sidebar" dir={isRTL ? "rtl" : "ltr"}>
      <div className="sidebar-content">

      <img src={TopRectangle} className="rectangle-div"/>
        {/* Main Title */}

        <div className="status-text">{t.mainTitle}</div>

        {/* Step 1 → Show after going to step 2 */}
        {step >= 2 && (name || email || phone) && (
          <div className="sidebar-section">
            <div className="sidebar-section-line" />
            <div className="sidebar-section-content">
              <h3>{t.establishmentInfo}</h3>
              <p>
                {isFactory ? t.factory : t.company} <br />
                {bottomSelected.includes(0) ? t.iraqi : t.foreign}
              </p>
            </div>
          </div>
        )}

        {/* Step 2 → Show after going to step 3 */}
        {step >= 3 && (name || email || phone) && (
          <div className="sidebar-section">
            <div className="sidebar-section-line" />
            <div className="sidebar-section-content">
              <h3>{t.basicInfo}</h3>
              <p>
                {name && name} <br />
                {email && email} <br />
                {phone && phone}
              </p>
            </div>
          </div>
        )}

        {/* Step 3 → Show after going to step 4 */}
        {step >= 4 &&
          (companyName ||
            activityId ||
            companyType ||
            companyForm ||
            managementMethod ||
            managerName) && (
            <div className="sidebar-section">
              <div className="sidebar-section-line" />
              <div className="sidebar-section-content">
                <h3>{isFactory ? t.factoryInfo : t.companyInfo}</h3>
                <p>
                  {companyName && companyName} <br />
                  {activityId && activityId} <br />
                  {!isFactory && companyType && companyType} <br />
                  {!isFactory && companyForm && companyForm} <br />
                  {managementMethod && managementMethod} <br />
                  {managerName && managerName}
                </p>
              </div>
            </div>
          )}

        {/* Step 4 → Show after going to step 5 */}
        {step >= 5 && (
          <div className="sidebar-section">
            <div className="sidebar-section-line" />
            <div className="sidebar-section-content">
              <h3>{t.documentationTitle}</h3>
              <p>
                {companyForm && companyForm} <br />
                {activityId && activityId} <br />
                {managerName && managerName} <br />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
