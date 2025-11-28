import React, { useState, useContext, useEffect, useCallback } from "react";
import { LanguageContext } from "../context/LanguageContext";
import Sidebar from "./Sidebar";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import { LookupsService } from "../services/LookupsService"; 
import Stepper from "./Stepper";
import StepperNavigation from "./StepperNavigation";
import Step3Factory from "./steps/Step3Factory";
import Step3Company from "./steps/Step3Company";

// مفتاح التخزين المحلي
const LOCAL_STORAGE_KEY = 'registrationFormData';

// دالة مساعدة للتحقق من صحة البريد الإلكتروني (خارج المكون)
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const StepperPage = () => {
    const { translations, language } = useContext(LanguageContext);
    const isRTL = language === "ar";

    // 1. 🚀 توحيد الحالة والحفظ من localStorage
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        // حالة البداية الافتراضية
        return {
            step: 1,
            // Step 1
            topSelected: [],
            bottomSelected: [],
            // Step 2
            name: "",
            email: "",
            phone: "",
            // Step 3 (Common fields for Company/Factory)
            companyName: "",
            activityId: "", // قد يستخدم لتخزين الـ ID المفرد
            companyType: "",
            companyForm: "",
            managementMethod: "",
            managerName: "",
            companyActivities: [], // 💡 هذا هو الحقل الذي يتم التحقق منه كمصفوفة
            factoryProducts: [], 
            // Step 4
            establishmentAddress: "",
            establishmentLocation: "",
            foundingYear: "",
            capital: "",
            registrationCertificate: "",
            additionalCertificates: [],
            notes: "",
        };
    });

    // 🆕 حالة الأخطاء لكل حقل
    const [fieldErrors, setFieldErrors] = useState({});
    
    // 💡 حالة تتبع محاولة الانتقال (لتشغيل عرض الخطأ الأحمر)
    const [submitted, setSubmitted] = useState(false);
    
    // 2. 💾 دالة تحديث عامة (لجميع الحقول)
    const updateField = useCallback((field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
        // مسح الخطأ الخاص بهذا الحقل فور البدء بالكتابة فيه
        setFieldErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
        setSubmitted(false);
    }, []);

    // 3. 💾 الحفظ التلقائي في localStorage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    // 4. دالة التحديث للخطوة 1 (مُعدلة)
    const handleSelect = (section, value) => {
        const fieldName = section === "top" ? 'topSelected' : 'bottomSelected';
        
        setFormData(prevData => {
            const currentSelection = prevData[fieldName];
            const newSelection = currentSelection.includes(value) ? [] : [value];
            
            return {
                ...prevData,
                [fieldName]: newSelection,
            };
        });
        // مسح خطأ القسم المحدد فور الاختيار
        setFieldErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[section === "top" ? 'topSection' : 'bottomSection'];
            return newErrors;
        });
        setSubmitted(false);
    };
    
    // 5. دوال التحقق من الصحة (تستخدم fieldErrors)
    const validateStep1 = () => {
        let errors = {};
        let isValid = true;
        
        if (formData.topSelected.length === 0) {
            errors.topSection = translations.step1.validation?.topRequired || 'الرجاء اختيار نوع المنشأة (عراقي/أجنبي).';
            isValid = false;
        }
        
        if (formData.bottomSelected.length === 0) {
            errors.bottomSection = translations.step1.validation?.bottomRequired || 'الرجاء اختيار نوع النشاط (شركة/مصنع).';
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };
    
    const validateStep2 = () => {
        const { name, email, phone } = formData;
        let errors = {};
        let isValid = true;
        
        // 1. تحقق الاسم
        if (name.trim() === '') {
            errors.name = translations.step2.validation?.nameRequired || 'الاسم مطلوب.';
            isValid = false;
        }

        // 2. تحقق البريد الإلكتروني (الوجود والتنسيق)
        if (email.trim() === '') {
            errors.email = translations.step2.validation?.emailRequired || 'البريد الإلكتروني مطلوب.';
            isValid = false;
        } else if (!isValidEmail(email)) {
            errors.email = translations.step2.validation?.invalidEmail || 'صيغة البريد الإلكتروني غير صحيحة.';
            isValid = false;
        }

        // 3. تحقق رقم الهاتف
        if (phone.trim() === '') {
            errors.phone = translations.step2.validation?.phoneRequired || 'رقم الهاتف مطلوب.';
            isValid = false;
        }
        
        setFieldErrors(errors);
        return isValid;
    };

    // 🆕 دالة التحقق للخطوة 3 (Includes Product List Validation)
    const validateStep3 = () => {
        const { companyName, companyActivities, companyType, companyForm, managementMethod, managerName, factoryProducts } = formData;
        const isFactory = formData.bottomSelected.includes("factory");

        let errors = {};
        let isValid = true;

        const validationMessages = translations.validation; 

        if (!companyName.trim()) {
            errors.companyName = validationMessages?.companyNameRequired || 'اسم الشركة/المصنع مطلوب.';
            isValid = false;
        }
        
        // 💡 CRITICAL: التحقق من حقل companyActivities كمصفوفة
        if (!companyActivities || companyActivities.length === 0) {
            errors.companyActivities = validationMessages?.activitiesRequired || 'أنشطة الشركة/المصنع مطلوبة.';
            isValid = false;
        }
        
        // 🏭 Product List Validation for Factory
        if (isFactory && (!factoryProducts || factoryProducts.length === 0)) {
            errors.factoryProducts = translations.step3?.validation?.minOneProduct || 'يجب إضافة منتج واحد على الأقل للمصنع.';
            isValid = false;
        }


        if (!companyType) {
            errors.companyType = validationMessages?.companyTypeRequired || 'نوع الشركة/المصنع مطلوب.';
            isValid = false;
        }

        if (!companyForm) {
            errors.companyForm = validationMessages?.companyFormRequired || 'شكل الشركة/المصنع مطلوب.';
            isValid = false;
        }

        if (!managementMethod) {
            errors.managementMethod = validationMessages?.managementMethodRequired || 'طريقة الإدارة مطلوبة.';
            isValid = false;
        }

        if (!managerName.trim()) {
            errors.managerName = validationMessages?.managerNameRequired || 'اسم المدير المفوض مطلوب.';
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };

    // 🆕 دالة التحقق للخطوة 4 
    const validateStep4 = () => {
        const { establishmentAddress, capital } = formData;
        
        let errors = {};
        let isValid = true;

        const validationMessages = translations.validation;

        if (!establishmentAddress.trim()) {
            errors.establishmentAddress = validationMessages?.establishmentAddressRequired || 'عنوان التأسيس مطلوب.';
            isValid = false;
        }
        
        if (!capital.trim()) {
            errors.capital = validationMessages?.capitalRequired || 'رأس المال مطلوب.';
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };


    // 6. دالة تحديد صلاحية الخطوة (لتعطيل الزر)
    const isStepValid = (step) => {
        const isFactory = formData.bottomSelected.includes("factory");

        switch (step) {
            case 1:
                return formData.topSelected.length > 0 && formData.bottomSelected.length > 0;
            case 2:
                // تحقق من التنسيق أيضاً لتعطيل الزر
                return formData.name.trim() !== '' 
                    && formData.email.trim() !== '' 
                    && isValidEmail(formData.email) 
                    && formData.phone.trim() !== '';
            case 3:
                let step3Valid = formData.companyName.trim() !== '' 
                    && formData.companyActivities.length > 0 // 💡 CRITICAL: التحقق هنا
                    && formData.companyType.trim() !== '' 
                    && formData.companyForm.trim() !== '' 
                    && formData.managementMethod.trim() !== '' 
                    && formData.managerName.trim() !== '';

                // 🏭 Check product array length here for button disabling
                if (isFactory) {
                    step3Valid = step3Valid && formData.factoryProducts.length > 0;
                }
                return step3Valid;
            case 4:
                return formData.establishmentAddress.trim() !== '' 
                    && formData.capital.trim() !== '';

            case 5:
                return true;
            default:
                return false;
        }
    };

    // 7. ⏭️ دالة الانتقال للخطوة التالية (مع التحقق)
    const handleNext = () => {
        let isValid = true;
        
        if (formData.step === 1) {
            isValid = validateStep1();
        } else if (formData.step === 2) {
            isValid = validateStep2();
        } else if (formData.step === 3) { 
            isValid = validateStep3();
        } else if (formData.step === 4) { 
            isValid = validateStep4();
        }
        
        if (isValid) {
            setFormData(prev => ({
                ...prev,
                step: Math.min(prev.step + 1, 5)
            }));
            setFieldErrors({}); // مسح الأخطاء عند الانتقال
            setSubmitted(false); 
        } else {
            setSubmitted(true); // تفعيل حالة محاولة الانتقال الفاشلة لعرض حدود الخطأ
        }
    };
    
    // 8. 🔙 دالة الانتقال للخطوة السابقة
    const handlePrev = () => {
        setFormData(prev => ({
            ...prev,
            step: Math.max(prev.step - 1, 1)
        }));
        setFieldErrors({}); 
        setSubmitted(false); 
    };

    // 9. جلب بيانات البحث (Lookups)
    const [activities, setActivities] = useState([]);
    const [companyTypes, setCompanyTypes] = useState([]);
    const [companyForms, setCompanyForms] = useState([]);
    const [managementMethods, setManagementMethods] = useState([]);

    useEffect(() => {
        if (formData.step === 3) {
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
    }, [formData.step]);

    const isFactory = formData.bottomSelected.includes("factory");

    return (
        <div
            className="page-wrapper"
            style={{ display: "flex" }}
            dir={isRTL ? "rtl" : "ltr"}
        >
            <Sidebar
                {...formData}
                translations={translations}
                isFactory={isFactory}
            />

            <div className="content-wrapper" style={{ flex: 1 }}>
                <Stepper step={formData.step} totalSteps={5} isRTL={isRTL} />

                {/* Steps Rendering */}
                {formData.step === 1 && (
                    <Step1
                        topSelected={formData.topSelected}
                        bottomSelected={formData.bottomSelected}
                        handleSelect={handleSelect}
                        translations={translations.step1}
                        fieldErrors={fieldErrors}
                        submitted={submitted}
                    />
                )}
                {formData.step === 2 && (
                    <Step2
                        name={formData.name}
                        setName={(value) => updateField('name', value)}
                        email={formData.email}
                        setEmail={(value) => updateField('email', value)}
                        phone={formData.phone}
                        setPhone={(value) => updateField('phone', value)}
                        translations={translations.step2}
                        fieldErrors={fieldErrors}
                    />
                )}

                {formData.step === 3 && (
                    isFactory ? (
                        <Step3Factory
                            companyName={formData.companyName}
                            setCompanyName={(value) => updateField('companyName', value)}
                            companyActivities={formData.companyActivities}
                            // 💡 CRITICAL: تمرير تحديث مصفوفة الأنشطة
                            setCompanyActivities={(value) => updateField('companyActivities', value)}
                            companyType={formData.companyType}
                            setCompanyType={(value) => updateField('companyType', value)}
                            companyForm={formData.companyForm}
                            setCompanyForm={(value) => updateField('companyForm', value)}
                            managementMethod={formData.managementMethod}
                            setManagementMethod={(value) => updateField('managementMethod', value)}
                            managerName={formData.managerName}
                            setManagerName={(value) => updateField('managerName', value)}
                            
                            factoryProducts={formData.factoryProducts}
                            setFactoryProducts={(value) => updateField('factoryProducts', value)} 
                            
                            activities={activities}
                            companyTypes={companyTypes}
                            companyForms={companyForms}
                            managementMethods={managementMethods}
                            isFactory={isFactory}
                            translations={translations}
                            language={language}
                            fieldErrors={fieldErrors}
                        />
                    ) : (
                        <Step3Company
                            companyName={formData.companyName}
                            setCompanyName={(value) => updateField('companyName', value)}
                            companyActivities={formData.companyActivities}
                            setCompanyActivities={(value) => updateField('companyActivities', value)}
                            companyType={formData.companyType}
                            setCompanyType={(value) => updateField('companyType', value)}
                            companyForm={formData.companyForm}
                            setCompanyForm={(value) => updateField('companyForm', value)}
                            managementMethod={formData.managementMethod}
                            setManagementMethod={(value) => updateField('managementMethod', value)}
                            managerName={formData.managerName}
                            setManagerName={(value) => updateField('managerName', value)}
                            activities={activities}
                            companyTypes={companyTypes}
                            companyForms={companyForms}
                            managementMethods={managementMethods}
                            isFactory={isFactory}
                            translations={translations.step3}
                            language={language}
                            fieldErrors={fieldErrors}
                        />
                    )
                )}

                {formData.step === 4 && (
                    <Step4
                        isFactory={isFactory}
                        translations={translations.step4}
                        language={language}
                        companyName={formData.companyName}
                        setCompanyName={(value) => updateField('companyName', value)}
                        activityId={formData.activityId}
                        setActivityId={(value) => updateField('activityId', value)}
                        establishmentAddress={formData.establishmentAddress}
                        setEstablishmentAddress={(value) => updateField('establishmentAddress', value)}
                        establishmentLocation={formData.establishmentLocation}
                        setEstablishmentLocation={(value) => updateField('establishmentLocation', value)}
                        foundingYear={formData.foundingYear}
                        setFoundingYear={(value) => updateField('foundingYear', value)}
                        capital={formData.capital}
                        setCapital={(value) => updateField('capital', value)}
                        registrationCertificate={formData.registrationCertificate}
                        setRegistrationCertificate={(value) => updateField('registrationCertificate', value)}
                        additionalCertificates={formData.additionalCertificates}
                        setAdditionalCertificates={(value) => updateField('additionalCertificates', value)}
                        notes={formData.notes}
                        setNotes={(value) => updateField('notes', value)}
                        
                        fieldErrors={fieldErrors}
                    />
                )}
                
                {formData.step === 5 && (
                    <Step5 
                        translations={translations.step5} 
                        formData={formData}
                    />
                )}

                <StepperNavigation
                    step={formData.step}
                    totalSteps={5}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    translations={translations}
                    finalActionText={translations.step5.actions.payAndSubmit}
                    canProceed={isStepValid(formData.step)} 
                />
            </div>
        </div>
    );
};

export default StepperPage;