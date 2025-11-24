import React, { useContext } from "react";
import "../styles/StepperStyles.css";
import { LanguageContext } from "../context/LanguageContext";
import TopRectangle from "../src/assets/TopRectangle.png";
import logo from "../src/assets/logo.png";

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

 <div className="logo-container">
    <img src={logo} alt="COR Platform" className="cor-platform" />
  </div>

  {/* Sidebar content */}
  <div className="sidebar-content">
    <div className="rectangle-container">
      <img src={TopRectangle} alt="Top Rectangle" className="rectangle-div" />
    </div>

        {/* Main Title */}

        <div className="status-text">{t.mainTitle}</div>

        {/* Step 1 → Show after going to step 2 */}
{step >= 2 && (name || email || phone) && (
  <div style={{ display: 'flex', alignItems: 'stretch', gap: '10px' }}>
    
    {/* Vertical line */}
    <div style={{
      width: '4px',                   // thickness of the line
      backgroundColor: '#05BAA3',     // green color
      borderRadius: '2px',
      alignSelf: 'stretch',    
      marginTop:'19px'
      // make it match height of text container
    }} />

    {/* Text content */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <h3 style={{ margin: 0 }}>{t.establishmentInfo}</h3>
      <div>
        <div>{isFactory ? t.factory : t.company}</div>
        <div>{bottomSelected.includes(0) ? t.iraqi : t.foreign}</div>
      </div>
    </div>

  </div>
)}


       {/* Step 2 → Show after going to step 3 */}
{step >= 3 && (name || email || phone) && (
  <div style={{ display: 'flex', alignItems: 'stretch', gap: '10px', marginBottom: '10px' }}>
    
    {/* Vertical line */}
    <div style={{
      width: '4px',
      backgroundColor: '#05BAA3',
      borderRadius: '2px',
      alignSelf: 'stretch',
            marginTop:'19px'

    }} />

    {/* Text content */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <h3 style={{ margin: 0 }}>{t.basicInfo}</h3>
      <div>
        {name && <div>{name}</div>}
        {email && <div>{email}</div>}
        {phone && <div>{phone}</div>}
      </div>
    </div>

  </div>
)}

{/* Step 3 → Show after going to step 4 */}
{step >= 4 &&
  (companyName || activityId || companyType || companyForm || managementMethod || managerName) && (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: '10px', marginBottom: '10px' }}>
      
      {/* Vertical line */}
      <div style={{
        width: '4px',
        backgroundColor: '#05BAA3',
        borderRadius: '2px',
        alignSelf: 'stretch',
              marginTop:'19px'

      }} />

      {/* Text content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3 style={{ margin: 0 }}>{isFactory ? t.factoryInfo : t.companyInfo}</h3>
        <div>
          {companyName && <div>{companyName}</div>}
          {activityId && <div>{activityId}</div>}
          {!isFactory && companyType && <div>{companyType}</div>}
          {!isFactory && companyForm && <div>{companyForm}</div>}
          {managementMethod && <div>{managementMethod}</div>}
          {managerName && <div>{managerName}</div>}
        </div>
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
