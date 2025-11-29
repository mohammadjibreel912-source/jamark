import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
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

// دالة مساعدة للتحقق من صحة البريد الإلكتروني
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// ======================================================
// 🚀 دالة تهيئة الحالة: لضمان القراءة عند بدء التحميل
// ======================================================
const initializeFormData = (defaultData) => {
    try {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
            const parsed = JSON.parse(savedData) || {};
            
            // دمج البيانات المحفوظة مع البيانات الافتراضية
            return { 
                ...defaultData, 
                ...parsed,
                // التأكد من أن حقل 'step' لا يعود إلى 1 إذا كان هناك خطوة محفوظة
                step: parsed.step || 1
            };
        }
    } catch (e) {
        console.error("❌ Failed to parse saved form data, falling back to default:", e);
    }
    // إذا فشل أي شيء، يتم إرجاع نسخة جديدة من البيانات الافتراضية
    return { ...defaultData };
};

const StepperPage = () => {
    const { translations, language } = useContext(LanguageContext);
    const isRTL = language === "ar";
    
    // موقع افتراضي
    const defaultLocation = { 
        latitude: 48.8566,
        longitude: 2.3522,
        address: 'Default Location: Paris, France'
    };

    const defaultFormData = {
        step: 1,
        topSelected: [],
        bottomSelected: [],
        name: "",
        email: "",
        phone: "",
        companyName: "",
        companyActivities: [],
        companyType: "",
        companyForm: "",
        managementMethod: "",
        managerName: "",
        factoryName: "",
        factoryActivityId: "",
        factoryProducts: [],
        addressInfo: {},
        establishmentLocation: defaultLocation,
        foundingYear: "",
        capital: "",
        currency: "JOD",
        registrationCertificate: "",
        additionalCertificates: [],
        notes: "",
    };

    // استخدام دالة initializeFormData لتهيئة الحالة
    const [formData, setFormData] = useState(() => initializeFormData(defaultFormData));

    // ✅ التعديل الرئيسي: استخدام useRef لتخزين القيمة السابقة لـ bottomSelected
    // نقوم بتهيئة المرجع بالقيمة الحالية بعد تحميل البيانات من localStorage
    const prevBottomSelectedRef = useRef(formData.bottomSelected[0]); 

    const [fieldErrors, setFieldErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    
    
    const updateField = useCallback((field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
        setFieldErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
        setSubmitted(false);
    }, []);

    // 1. useEffect للحفظ في Local Storage
    useEffect(() => {
        try {
            // نتحقق لضمان عدم حفظ بيانات فارغة تمامًا في حالة البيانات الافتراضية
            if (Object.keys(formData).length > 1) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
            }
        } catch (e) {
            console.error("Could not save to localStorage:", e);
        }
    }, [formData]);

    // 2. useEffect لمنطق مسح البيانات عند تغيير نوع المنشأة
    useEffect(() => {
        const currentBottomSelected = formData.bottomSelected[0];
        // 💡 قراءة القيمة السابقة من المرجع
        const previousBottomSelected = prevBottomSelectedRef.current; 
        
        // التحقق من أن هناك قيمة حالية وأنها تختلف عن القيمة السابقة
        if (currentBottomSelected && currentBottomSelected !== previousBottomSelected) {
            console.log(`🔄 نوع المنشأة تغير من ${previousBottomSelected || 'لا يوجد'} إلى ${currentBottomSelected}`);
            console.log("🗑️ مسح بيانات الخطوة 3 القديمة...");
            
            setFormData(prevData => ({
                ...prevData,
                // مسح الحقول الخاصة بالخطوة 3
                companyName: "",
                companyActivities: [],
                factoryName: "",
                factoryActivityId: "",
                factoryProducts: [],
                // الحقول المشتركة
                companyType: "",
                companyForm: "",
                managementMethod: "",
                managerName: "",
            }));
            
            setFieldErrors({});
            setSubmitted(false);
        }
        
        // ✅ الأهم: تحديث قيمة المرجع دائمًا بعد المقارنة.
        prevBottomSelectedRef.current = currentBottomSelected;

    }, [formData.bottomSelected]); // سيتم تشغيله فقط عند تغيير bottomSelected

    const handleSelect = (section, value) => {
        const fieldName = section === "top" ? 'topSelected' : 'bottomSelected';
        
        setFormData(prevData => {
            const currentSelection = Array.isArray(prevData[fieldName]) ? prevData[fieldName] : [];
            const newSelection = currentSelection.includes(value) ? [] : [value];
            
            return {
                ...prevData,
                [fieldName]: newSelection,
            };
        });
        
        setFieldErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[section === "top" ? 'topSection' : 'bottomSection'];
            return newErrors;
        });
        setSubmitted(false);
    };
    
    // =========================================
    // === دالات التحقق === (بقية الدوال كما هي)
    // =========================================

    const validateStep1 = () => {
        let errors = {};
        let isValid = true;
        
        if ((formData.topSelected || []).length === 0) {
            errors.topSection = translations.step1.validation?.topRequired || 'الرجاء اختيار نوع المنشأة (عراقي/أجنبي).';
            isValid = false;
        }
        
        if ((formData.bottomSelected || []).length === 0) {
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
        
        if (name.trim() === '') {
            errors.name = translations.step2.validation?.nameRequired || 'الاسم مطلوب.';
            isValid = false;
        }

        if (email.trim() === '') {
            errors.email = translations.step2.validation?.emailRequired || 'البريد الإلكتروني مطلوب.';
            isValid = false;
        } else if (!isValidEmail(email)) {
            errors.email = translations.step2.validation?.invalidEmail || 'صيغة البريد الإلكتروني غير صحيحة.';
            isValid = false;
        }

        if (phone.trim() === '') {
            errors.phone = translations.step2.validation?.phoneRequired || 'رقم الهاتف مطلوب.';
            isValid = false;
        }
        
        setFieldErrors(errors);
        return isValid;
    };

    const validateStep3 = () => {
        const isFactory = (formData.bottomSelected || []).includes("factory");
        
        const nameField = isFactory ? (formData.factoryName || "") : (formData.companyName || "");
        const activitiesField = isFactory ? (formData.factoryActivityId || "") : (formData.companyActivities || []);
        const companyType = (formData.companyType || "").toString().trim();
        const companyForm = (formData.companyForm || "").toString().trim();
        const managementMethod = (formData.managementMethod || "").toString().trim();
        const managerName = (formData.managerName || "").toString().trim();
        const factoryProducts = formData.factoryProducts || [];

        let errors = {};
        let isValid = true;

        const validationMessages = translations.validation;

        // 1. التحقق من الاسم (مطلوب للجميع)
        if (!nameField.trim()) {
            const fieldName = isFactory ? 'factoryName' : 'companyName';
            errors[fieldName] = validationMessages?.companyNameRequired || 'اسم الشركة/المصنع مطلوب.';
            isValid = false;
        }
        
        // 2. التحقق من الأنشطة (مطلوب للجميع)
        if (isFactory) {
            if (!activitiesField) {
                errors.factoryActivityId = validationMessages?.activitiesRequired || 'نشاط المصنع مطلوب.';
                isValid = false;
            }
        } else {
            if (!Array.isArray(activitiesField) || activitiesField.length === 0) {
                errors.companyActivities = validationMessages?.activitiesRequired || 'أنشطة الشركة مطلوبة.';
                isValid = false;
            }
        }
        
        // 3. التحقق من المنتجات (مطلوب للمصنع فقط)
        if (isFactory && (!Array.isArray(factoryProducts) || factoryProducts.length === 0)) {
            errors.factoryProducts = translations.step3?.validation?.minOneProduct || 'يجب إضافة منتج واحد على الأقل للمصنع.';
            isValid = false;
        }

        // 4. التحقق من النوع والشكل وطريقة الإدارة واسم المدير المفوض (مطلوب للشركة فقط)
        if (!isFactory) {
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
             
             // شرط اسم المدير المفوض للشركة فقط
             if (!managerName) {
                 errors.managerName = validationMessages?.managerNameRequired || 'اسم المدير المفوض مطلوب.';
                 isValid = false;
             }
        }
        
        if (!isValid) {
            console.log("❌ Step 3 Validation Failed. Errors:", errors);
        } else {
            console.log("✅ Step 3 Validation Success.");
        }
        
        setFieldErrors(errors);
        return isValid;
    };

    const validateStep4 = () => {
        const addressInfo = formData.addressInfo || {};
        const establishmentLocation = formData.establishmentLocation;
        const foundingYear = (formData.foundingYear || "").toString().trim();
        const capital = (formData.capital || "").toString().trim();
        const registrationCertificate = formData.registrationCertificate;
        const additionalCertificates = formData.additionalCertificates || [];
        
        let errors = {};
        let isValid = true;

        const validationMessages = translations.validation;

        if (!addressInfo || Object.keys(addressInfo).length === 0) {
            errors.addressInfo = validationMessages?.addressRequired || 'عنوان المنشأة مطلوب.';
            isValid = false;
        }

        if (!establishmentLocation) {
            errors.establishmentLocation = validationMessages?.locationRequired || 'موقع المنشأة مطلوب.';
            isValid = false;
        }

        if (!foundingYear || isNaN(foundingYear) || foundingYear < 1900 || foundingYear > new Date().getFullYear()) {
            errors.foundingYear = validationMessages?.invalidYear || 'سنة التأسيس غير صحيحة.';
            isValid = false;
        }

        if (!capital || isNaN(capital) || Number(capital) <= 0) {
            errors.capital = validationMessages?.capitalRequired || 'رأس المال مطلوب ويجب أن يكون رقماً موجباً.';
            isValid = false;
        }

        if (!registrationCertificate) {
            errors.registrationCertificate = validationMessages?.certificateRequired || 'شهادة التسجيل مطلوبة.';
            isValid = false;
        }

        if (!Array.isArray(additionalCertificates) || additionalCertificates.length === 0) {
            errors.additionalCertificates = validationMessages?.certificatesRequired || 'شهادات إضافية مطلوبة.';
            isValid = false;
        }

        if (!isValid) {
            console.log("❌ Step 4 Validation Failed. Errors:", errors);
        } else {
            console.log("✅ Step 4 Validation Success.");
        }

        setFieldErrors(errors);
        return isValid;
    };

    // دالة تحديد صلاحية الخطوة (لتعطيل/تفعيل زر Next)
    const isStepValid = (step) => {
        const isFactory = (formData.bottomSelected || []).includes("factory");

        switch (step) {
            case 1:
                return (formData.topSelected || []).length > 0 && (formData.bottomSelected || []).length > 0;
            case 2:
                return (formData.name || "").trim() !== '' 
                    && (formData.email || "").trim() !== '' 
                    && isValidEmail(formData.email || "") 
                    && (formData.phone || "").trim() !== '';
            case 3:
                {
                    const nameField = isFactory ? formData.factoryName : formData.companyName;
                    const activitiesField = isFactory ? formData.factoryActivityId : formData.companyActivities;
                    
                    const activitiesValid = isFactory ? !!activitiesField : (Array.isArray(activitiesField) && activitiesField.length > 0);
                    
                    const productsLen = Array.isArray(formData.factoryProducts) ? formData.factoryProducts.length : 0;
                    
                    // شروط مطلوبة للمصنع (الاسم والنشاط) 
                    let step3Valid = (nameField || "").trim() !== '' 
                        && activitiesValid;

                    if (!isFactory) { 
                         // شروط النوع والشكل وطريقة الإدارة واسم المدير المفوض مطلوبة للشركة فقط
                        step3Valid = step3Valid 
                            && (formData.companyType || "").toString().trim() !== '' 
                            && (formData.companyForm || "").toString().trim() !== '' 
                            && (formData.managementMethod || "").toString().trim() !== ''
                            && (formData.managerName || "").toString().trim() !== ''; 
                    }
                    
                    if (isFactory) {
                        // شرط إضافي للمصنع: يجب أن يكون لديه منتج واحد على الأقل
                        step3Valid = step3Valid && productsLen > 0;
                    }
                    return step3Valid;
                }
            case 4:
                {
                    const addressValid = formData.addressInfo && Object.keys(formData.addressInfo).length > 0;
                    const locationValid = !!formData.establishmentLocation;
                    const yearValid = formData.foundingYear && !isNaN(formData.foundingYear) && formData.foundingYear >= 1900 && formData.foundingYear <= new Date().getFullYear();
                    const capitalValid = formData.capital && !isNaN(formData.capital) && Number(formData.capital) > 0;
                    const certValid = !!formData.registrationCertificate;
                    // تحقق من الشهادات الإضافية
                    const additionalValid = Array.isArray(formData.additionalCertificates) && formData.additionalCertificates.length > 0;

                    // إذا كان شرط الشهادات الإضافية ضرورياً:
                    return addressValid && locationValid && yearValid && capitalValid && certValid && additionalValid;
                }
            case 5:
                return true;
            default:
                return false;
        }
    };

    // دالة الانتقال للخطوة التالية
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
            setFieldErrors({});
            setSubmitted(false); 
        } else {
            setSubmitted(true);
        }
    };
        
    // دالة الانتقال للخطوة السابقة
    const handlePrev = () => {
        setFormData(prev => ({
            ...prev,
            step: Math.max(prev.step - 1, 1)
        }));
        setFieldErrors({}); 
        setSubmitted(false); 
    };

    // =========================================
    // === جلب بيانات البحث Lookups ===
    // =========================================

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
                    console.error("Failed to fetch lookups:", err);
                }
            };
            fetchLookups();
        }
    }, [formData.step]);
    
    // =========================================
    // === دوال الحصول على الاسم النصي للعرض في Sidebar ===
    // =========================================
    
    const getLookupName = (id, lookupArray, arField = 'nameAr', enField = 'nameEn') => {
        if (!id || lookupArray.length === 0) return null;
        const item = lookupArray.find(item => item.id.toString() === id.toString());
        return item ? (language === 'ar' ? item[arField] : item[enField]) : null;
    };

    // دالة للحصول على الاسم النصي لنشاط المصنع بناءً على factoryActivityId
    const getFactoryActivityName = () => {
        const activityId = formData.factoryActivityId;
        return getLookupName(activityId, activities);
    };
    
    // دالة للحصول على الأسماء النصية لأنشطة الشركة (إذا كانت متعددة)
    const getCompanyActivityNames = () => {
        if (!Array.isArray(formData.companyActivities) || activities.length === 0) {
            return null;
        }
        // تجميع الأسماء النصية للأنشطة المختارة
        return formData.companyActivities
            .map(id => getLookupName(id, activities))
            .filter(name => name) // تصفية أي أسماء فارغة
            .join(", ");
    };

    // دالة للحصول على اسم نوع الشركة
    const getCompanyTypeName = () => {
        return getLookupName(formData.companyType, companyTypes);
    };

    // دالة للحصول على اسم شكل الشركة
    const getCompanyFormName = () => {
        return getLookupName(formData.companyForm, companyForms);
    };
    
    // دالة للحصول على اسم طريقة الإدارة
    const getManagementMethodName = () => {
        return getLookupName(formData.managementMethod, managementMethods);
    };
    
    // =========================================

    const isFactory = (formData.bottomSelected || []).includes("factory");

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
                
                factoryLocation={getFactoryActivityName()} 
                
                activityName={getCompanyActivityNames()} // إذا كانت شركة (Company)
                companyTypeName={getCompanyTypeName()}
                companyFormName={getCompanyFormName()}
                managementMethodName={getManagementMethodName()}
locationSummary={formData.establishmentLocation?.address || "لم يتم التحديد"}            />

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
                            // حقول المصنع الخاصة 
                            companyName={formData.factoryName}
                            setCompanyName={(value) => updateField('factoryName', value)}
                            companyActivities={formData.factoryActivityId}
                            setCompanyActivities={(value) => updateField('factoryActivityId', value)}
                            factoryProducts={formData.factoryProducts}
                            setFactoryProducts={(value) => updateField('factoryProducts', value)} 
                            
                            // الحقول المشتركة
                            companyType={formData.companyType}
                            setCompanyType={(value) => updateField('companyType', value)}
                            companyForm={formData.companyForm}
                            setCompanyForm={(value) => updateField('companyForm', value)}
                            managementMethod={formData.managementMethod}
                            setManagementMethod={(value) => updateField('managementMethod', value)}
                            managerName={formData.managerName}
                            setManagerName={(value) => updateField('managerName', value)}
                            
                            // بيانات الـ Lookups
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
                            // حقول الشركة الخاصة
                            companyName={formData.companyName}
                            setCompanyName={(value) => updateField('companyName', value)}
                            companyActivities={formData.companyActivities}
                            setCompanyActivities={(value) => updateField('companyActivities', value)}
                            
                            // الحقول المشتركة
                            companyType={formData.companyType}
                            setCompanyType={(value) => updateField('companyType', value)}
                            companyForm={formData.companyForm}
                            setCompanyForm={(value) => updateField('companyForm', value)}
                            managementMethod={formData.managementMethod}
                            setManagementMethod={(value) => updateField('managementMethod', value)}
                            managerName={formData.managerName}
                            setManagerName={(value) => updateField('managerName', value)}
                            
                            // بيانات الـ Lookups
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
                        onNext={handleNext}
                        googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}
                        
                        addressInfo={formData.addressInfo}
                        setAddressInfo={(value) => updateField('addressInfo', value)}
                        
                        establishmentLocation={formData.establishmentLocation}
                        setEstablishmentLocation={(value) => updateField('establishmentLocation', value)}
                        
                        foundingYear={formData.foundingYear}
                        setFoundingYear={(value) => updateField('foundingYear', value)}
                        
                        capital={formData.capital}
                        setCapital={(value) => updateField('capital', value)}
                        
                        currency={formData.currency} 
                        setCurrency={(value) => updateField('currency', value)} 
                        
                        notes={formData.notes}
                        setNotes={(value) => updateField('notes', value)}
                        
                        registrationCertificate={formData.registrationCertificate}
                        setRegistrationCertificate={(value) => updateField('registrationCertificate', value)}
                        
                        additionalCertificates={formData.additionalCertificates}
                        setAdditionalCertificates={(value) => updateField('additionalCertificates', value)}
                        
                        translations={translations.step4}
                        language={language}
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