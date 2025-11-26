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
import Stepper from "./Stepper";
import StepperNavigation from "./StepperNavigation";

const StepperPage = () => {
    const { translations, language } = useContext(LanguageContext);
    const isRTL = language === "ar";

    const [step, setStep] = useState(1);

    // Step 1 fields
    const [topSelected, setTopSelected] = useState([]);      // "foreign" أو "iraqi"
    const [bottomSelected, setBottomSelected] = useState([]); // "factory" أو "company"

    // Step 2 fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Step 3 fields
    const [companyName, setCompanyName] = useState("");
    const [activityId, setActivityId] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [companyForm, setCompanyForm] = useState("");
    const [managementMethod, setManagementMethod] = useState("");
    const [managerName, setManagerName] = useState("");

    // 🔥 Step 4 fields (بيانات التوثيق والملخص النهائي)
    const [establishmentAddress, setEstablishmentAddress] = useState("");
    const [establishmentLocation, setEstablishmentLocation] = useState("");
    const [foundingYear, setFoundingYear] = useState("");
    const [capital, setCapital] = useState("");
    const [registrationCertificate, setRegistrationCertificate] = useState("");
    const [additionalCertificates, setAdditionalCertificates] = useState([]); // قائمة بالشهادات الإضافية
    const [notes, setNotes] = useState("");
    const [factoryProducts, setFactoryProducts] = useState(""); // خاص بحالة المصنع
    const [companyActivities, setCompanyActivities] = useState([]); // قائمة الأنشطة التفصيلية (إذا كانت Step 3/4 تحتاجها)


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
    // تم الإبقاء على هذا الـ useEffect في Parent ليتوافق مع تعديل Step3Company
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
                
                // 🔥 تمرير جميع متغيرات Step 4 إلى Sidebar
                establishmentAddress={establishmentAddress}
                establishmentLocation={establishmentLocation}
                foundingYear={foundingYear}
                capital={capital}
                registrationCertificate={registrationCertificate}
                additionalCertificates={additionalCertificates}
                notes={notes}
                factoryProducts={factoryProducts}
            />

            <div className="content-wrapper" style={{ flex: 1 }}>

                {/* Stepper */}
                <Stepper step={step} totalSteps={5} isRTL={isRTL} />


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
                        
                        // تمرير بيانات Lookup التي تم جلبها في useEffect
                        activities={activities}
                        companyTypes={companyTypes}
                        companyForms={companyForms}
                        managementMethods={managementMethods}

                        isFactory={isFactory}
                        translations={translations.step3}
                        language={language}
                    />
                )}

                {step === 4 && (
                    <Step4
                        isFactory={isFactory} // pass the flag
                        translations={translations.step4}
                        language={language}
                        
                        // 🔥 تمرير دوال التحديث (setters) وبيانات Step 4 إلى المكون
                        establishmentAddress={establishmentAddress} setEstablishmentAddress={setEstablishmentAddress}
                        establishmentLocation={establishmentLocation} setEstablishmentLocation={setEstablishmentLocation}
                        foundingYear={foundingYear} setFoundingYear={setFoundingYear}
                        capital={capital} setCapital={setCapital}
                        registrationCertificate={registrationCertificate} setRegistrationCertificate={setRegistrationCertificate}
                        additionalCertificates={additionalCertificates} setAdditionalCertificates={setAdditionalCertificates}
                        notes={notes} setNotes={setNotes}
                        factoryProducts={factoryProducts} setFactoryProducts={setFactoryProducts}
                        companyActivities={companyActivities} setCompanyActivities={setCompanyActivities} // إذا كانت Step 4 تستخدمها
                    />
                )}

                {step === 5 && <Step5 translations={translations.step5} />}

                {/* Navigation */}
                <StepperNavigation
                    step={step}
                    totalSteps={5}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    translations={translations}
                    finalActionText={translations.step5.actions.payAndSubmit}
                />
            </div>
        </div>
    );
};

export default StepperPage;