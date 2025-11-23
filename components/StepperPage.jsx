import React, { useState, useContext } from "react";
import "../styles/StepperStyles.css";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import { LanguageContext } from "../context/LanguageContext";

const StepperPage = () => {
  const { translations, language } = useContext(LanguageContext);

  const [step, setStep] = useState(1);
  const [topSelected, setTopSelected] = useState([]);
  const [bottomSelected, setBottomSelected] = useState([]);

  // بيانات مشتركة
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [activityId, setActivityId] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companyForm, setCompanyForm] = useState("");
  const [managementMethod, setManagementMethod] = useState("");
  const [managerName, setManagerName] = useState("");

  const [activities, setActivities] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [companyForms, setCompanyForms] = useState([]);
  const [managementMethods, setManagementMethods] = useState([]);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSelect = (section, index) => {
    if (section === "top") {
      setTopSelected(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setBottomSelected(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    }
  };

  // حالة Sidebar
  let status = translations.step1.chooseCompanyType;
  if (bottomSelected.includes(0)) status = translations.step1.iraqiCompany;
  if (bottomSelected.includes(1)) status = translations.step1.industrial;

  // ترتيب Sidebar و content-wrapper حسب اللغة
  const isRTL = language === "ar";
  const wrapperStyle = { display: "flex", flexDirection: isRTL ? "row-reverse" : "row" };
  const sidebarStyle = { order: isRTL ? 2 : 1 };
  const contentStyle = { flex: 1, padding: "20px", order: isRTL ? 1 : 2 };

  return (
    <div className="page-wrapper" style={wrapperStyle} dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <div className="sidebar" style={sidebarStyle}>
        <div className="sidebar-content">
          <h3>{translations.step3.companyData}</h3>
          <span>{status}</span>
          {bottomSelected.includes(0) && <p>{translations.step1.iraqiCompany}</p>}
          {bottomSelected.includes(1) && <p>{translations.step1.industrial}</p>}
          {step === 2 && (
            <div>
              <p>{translations.step2.name}: {name}</p>
              <p>{translations.step2.email}: {email}</p>
              <p>{translations.step2.phone}: {phone}</p>
            </div>
          )}
          {step === 3 && (
            <div>
              <p>{translations.step3.companyName}: {companyName}</p>
              <p>{translations.step3.activity}: {activityId}</p>
              <p>{translations.step3.companyType}: {companyType}</p>
              <p>{translations.step3.companyForm}: {companyForm}</p>
              <p>{translations.step3.managementMethod}: {managementMethod}</p>
              <p>{translations.step3.managerName}: {managerName}</p>
            </div>
          )}
        </div>
      </div>

      {/* محتوى Steps */}
      <div className="content-wrapper" style={contentStyle}>
        {/* Stepper progress */}
        <div className="stepper-wrapper" style={{ marginBottom: "20px" }}>
          {[1, 2, 3, 4, 5].map(s => (
            <div
              key={s}
              className={`step ${s === step ? "active" : ""} ${s < step ? "completed" : ""}`}
            >
              <span>{s}</span>
            </div>
          ))}
          <div
            className="stepper-progress"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          ></div>
        </div>

        {/* Steps content */}
        {step === 1 && <Step1 topSelected={topSelected} bottomSelected={bottomSelected} handleSelect={handleSelect} />}
        {step === 2 && <Step2 name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} />}
        {step === 3 && (
          <Step3
            companyName={companyName} setCompanyName={setCompanyName}
            activityId={activityId} setActivityId={setActivityId}
            companyType={companyType} setCompanyType={setCompanyType}
            companyForm={companyForm} setCompanyForm={setCompanyForm}
            managementMethod={managementMethod} setManagementMethod={setManagementMethod}
            managerName={managerName} setManagerName={setManagerName}
            activities={activities} setActivities={setActivities}
            companyTypes={companyTypes} setCompanyTypes={setCompanyTypes}
            companyForms={companyForms} setCompanyForms={setCompanyForms}
            managementMethods={managementMethods} setManagementMethods={setManagementMethods}
            step={step}
          />
        )}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}

        {/* أزرار التالي والسابق */}
        <div className="buttons-wrapper" style={{ marginTop: "20px" }}>
          <button onClick={handlePrev} disabled={step === 1}>
            {translations.buttons.prev}
          </button>
          <button onClick={handleNext} disabled={step === 5}>
            {translations.buttons.next}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepperPage;
