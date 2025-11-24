import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import Sidebar from "./Sidebar";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import { LookupsService } from "../services/LookupsService";
import LanguageSwitcher from "./LanguageSwitcher";

const StepperPage = () => {
  const { translations, language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  const [step, setStep] = useState(1);

  // الاختيارات الآن واضحة
  const [topSelected, setTopSelected] = useState([]);     // "foreign" أو "iraqi"
  const [bottomSelected, setBottomSelected] = useState([]); // "factory" أو "company"

  // Step2 fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step3 fields
  const [companyName, setCompanyName] = useState("");
  const [activityId, setActivityId] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companyForm, setCompanyForm] = useState("");
  const [managementMethod, setManagementMethod] = useState("");
  const [managerName, setManagerName] = useState("");

  // Lookup data
  const [activities, setActivities] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [companyForms, setCompanyForms] = useState([]);
  const [managementMethods, setManagementMethods] = useState([]);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  // 🔥 handleSelect يستخدم النصوص مباشرة
  const handleSelect = (section, value) => {
    if (section === "top") {
      setTopSelected(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [value] // اختر واحد فقط
      );
    } else {
      setBottomSelected(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [value] // اختر واحد فقط
      );
    }
  };

  // Fetch lookups فقط عند Step3
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

  // ✅ الآن يستخدم string واضح
  const isFactory = bottomSelected.includes("factory");

  return (
    <div className="page-wrapper" style={{ display: "flex" }} dir={isRTL ? "rtl" : "ltr"}>
      <Sidebar
        step={step}
        bottomSelected={bottomSelected}
        translations={translations}
        name={name}
        email={email}
        phone={phone}
        companyName={companyName}
        activityId={activityId}
        companyType={companyType}
        companyForm={companyForm}
        managementMethod={managementMethod}
        managerName={managerName}
        isFactory={isFactory}
      />

      <div className="content-wrapper" style={{ flex: 1 }}>
        <LanguageSwitcher />

        {/* Stepper */}
        <div className="stepper-wrapper" style={{ direction: isRTL ? "rtl" : "ltr" }}>
          {[1, 2, 3, 4, 5].map(s => (
            <div
              key={s}
              className={`step ${s === step ? "active" : ""} ${s < step ? "completed" : ""}`}
            >
              <span>{s}</span>
            </div>
          ))}
          <div className="stepper-progress" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
        </div>

        {/* Steps */}
        {step === 1 && (
          <Step1
            topSelected={topSelected}
            bottomSelected={bottomSelected}
            handleSelect={handleSelect}
            translations={translations.step1}
          />
        )}
        {step === 2 && (
          <Step2
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            phone={phone} setPhone={setPhone}
            translations={translations.step2}
          />
        )}
        {step === 3 && (
          <Step3
            companyName={companyName} setCompanyName={setCompanyName}
            activityId={activityId} setActivityId={setActivityId}
            companyType={companyType} setCompanyType={setCompanyType}
            companyForm={companyForm} setCompanyForm={setCompanyForm}
            managementMethod={managementMethod} setManagementMethod={setManagementMethod}
            managerName={managerName} setManagerName={setManagerName}
            activities={activities}
            companyTypes={companyTypes}
            companyForms={companyForms}
            managementMethods={managementMethods}
            isFactory={isFactory}
            translations={translations.step3}
            language={language}
          />
        )}
        {step === 4 && <Step4 translations={translations.step4} />}
        {step === 5 && <Step5 translations={translations.step5} />}

        {/* Navigation */}
        <div className="buttons-wrapper">
          <button onClick={handlePrev} disabled={step === 1}>
            {translations.buttons.prev}
          </button>
          {step < 5 ? (
            <button onClick={handleNext}>{translations.buttons.next}</button>
          ) : (
            <button>{translations.step5.actions.payAndSubmit}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperPage;
