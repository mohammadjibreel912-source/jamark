// src/utils/validationUtils.js

// دالة مساعدة للتحقق من صحة البريد الإلكتروني (نقلناها هنا)
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * تتحقق من صحة الخطوة المحددة وتعيد كائن الأخطاء وحالة الصحة.
 * @param {number} step - رقم الخطوة الحالية.
 * @param {object} formData - كائن بيانات النموذج.
 * @param {object} t - كائن الترجمات للأخطاء.
 * @returns {{isValid: boolean, errors: object}}
 */
export const validateCurrentStep = (step, formData, t) => {
    let errors = {};
    let isValid = true;
    const validationMessages = t.validation;
    const isFactory = formData.bottomSelected.includes("factory");

    switch (step) {
        case 1:
            if (formData.topSelected.length === 0) {
                errors.topSection = t.step1.validation?.topRequired || 'الرجاء اختيار نوع المنشأة (عراقي/أجنبي).';
                isValid = false;
            }
            if (formData.bottomSelected.length === 0) {
                errors.bottomSection = t.step1.validation?.bottomRequired || 'الرجاء اختيار نوع النشاط (شركة/مصنع).';
                isValid = false;
            }
            break;

        case 2:
            // 1. تحقق الاسم
            if (formData.name.trim() === '') {
                errors.name = t.step2.validation?.nameRequired || 'الاسم مطلوب.';
                isValid = false;
            }
            // 2. تحقق البريد الإلكتروني
            if (formData.email.trim() === '') {
                errors.email = t.step2.validation?.emailRequired || 'البريد الإلكتروني مطلوب.';
                isValid = false;
            } else if (!isValidEmail(formData.email)) {
                errors.email = t.step2.validation?.invalidEmail || 'صيغة البريد الإلكتروني غير صحيحة.';
                isValid = false;
            }
            // 3. تحقق رقم الهاتف
            if (formData.phone.trim() === '') {
                errors.phone = t.step2.validation?.phoneRequired || 'رقم الهاتف مطلوب.';
                isValid = false;
            }
            break;

        case 3:
            if (!formData.companyName.trim()) {
                errors.companyName = validationMessages?.companyNameRequired || 'اسم الشركة/المصنع مطلوب.';
                isValid = false;
            }
            if (!formData.companyActivities || formData.companyActivities.length === 0) {
                errors.companyActivities = validationMessages?.activitiesRequired || 'أنشطة الشركة/المصنع مطلوبة.';
                isValid = false;
            }
            // 🏭 Product List Validation for Factory
            if (isFactory && (!formData.factoryProducts || formData.factoryProducts.length === 0)) {
                errors.factoryProducts = t.step3?.validation?.minOneProduct || 'يجب إضافة منتج واحد على الأقل للمصنع.';
                isValid = false;
            }
            if (!formData.companyType) {
                errors.companyType = validationMessages?.companyTypeRequired || 'نوع الشركة/المصنع مطلوب.';
                isValid = false;
            }
            if (!formData.companyForm) {
                errors.companyForm = validationMessages?.companyFormRequired || 'شكل الشركة/المصنع مطلوب.';
                isValid = false;
            }
            if (!formData.managementMethod) {
                errors.managementMethod = validationMessages?.managementMethodRequired || 'طريقة الإدارة مطلوبة.';
                isValid = false;
            }
            if (!formData.managerName.trim()) {
                errors.managerName = validationMessages?.managerNameRequired || 'اسم المدير المفوض مطلوب.';
                isValid = false;
            }
            break;

        case 4:
            // 1. التحقق من العنوان
            const address = formData.establishmentAddress;
            const isAddressValid = address 
                                && address.summary 
                                && address.summary.trim() !== '';

            if (!isAddressValid) {
                errors.establishmentAddress = validationMessages?.establishmentAddressRequired || 'عنوان التأسيس مطلوب.';
                isValid = false;
            }
            
            // 2. التحقق من رأس المال (🛑 التصحيح الأخير هنا)
            const capitalValue = String(formData.capital || ''); 
            
            if (capitalValue.trim() === '') {
                errors.capital = validationMessages?.capitalRequired || 'رأس المال مطلوب.';
                isValid = false;
            }
            break;

        default:
            break;
    }

    return { isValid, errors };
};