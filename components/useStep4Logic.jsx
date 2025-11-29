import { useState, useEffect, useContext } from "react";
// 💡 يُرجى التأكد من أن هذه المسارات صحيحة بالنسبة لموقع ملف Hook الخاص بك
import { LookupsService } from "../services/LookupsService"; 
import { LanguageContext } from "../context/LanguageContext";

export const useStep4Logic = (props) => {
    const { 
        isFactory, onNext, 
        addressInfo, setAddressInfo, 
        establishmentLocation, setEstablishmentLocation, 
        foundingYear, setFoundingYear, 
        capital, setCapital, 
        notes, setNotes, 
        registrationCertificate, additionalCertificates,
        currency, setCurrency, // ✅ التأكد من جلب Currency و setCurrency
    } = props;
    
    const { translations, language } = useContext(LanguageContext);
    const t = translations.step4 || {};

    const [currencies, setCurrencies] = useState([]);
    // ⚠️ استخدام القيمة القادمة من Props/FormData لتهيئة selectedCurrencyCode
    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(currency || "JOD");
    
    // Modal & Dropdown States
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isUploaderModalOpen, setIsUploaderModalOpen] = useState(false);
    const [isManagerModalOpen, setIsManagerModalOpen] = useState(false); 
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const [errors, setErrors] = useState(props.fieldErrors || {}); // 💡 استخدام الأخطاء القادمة من الأب
    
    const primaryTermEn = isFactory ? "Factory" : "Company";
    const primaryTermAr = isFactory ? "المصنع" : "الشركة";
    
    // تم حساب العملة المحددة لضمان عمل القائمة المنسدلة
    const selectedCurrency = currencies.find(c => c.code === selectedCurrencyCode);
    
    // --- Data Fetching & Normalization (Currencies) ---
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const currencyList = await LookupsService.getCurrencies(); 
                const baseUrl = import.meta.env.VITE_ASSETS_BASE_URL || import.meta.env.BASE_URL || "";
                
                const normalizeIcon = (icon) => {
                    if (!icon) return "";
                    if (icon.startsWith("http") || icon.startsWith("//")) return icon;
                    if (icon.startsWith("/")) {
                        const prefix = baseUrl.replace(/\/$/, "");
                        return `${prefix}${icon}`;
                    }
                    return `${baseUrl}${icon}`;
                };
                
                const mapped = (currencyList || []).map(c => ({
                    ...c,
                    icon: normalizeIcon(c.icon || c.flag || "")
                }));
                setCurrencies(mapped);
                
                // تحديث العملة المختارة عند تحميل العملات لأول مرة
                if (props.currency && mapped.some(c => c.code === props.currency)) {
                    setSelectedCurrencyCode(props.currency);
                }
                
            } catch (err) {
                console.error("Error fetching currencies:", err);
            }
        };
        fetchCurrencies();
        
    }, [props.currency]); // إعادة التشغيل إذا تغيرت العملة القادمة من الأب
    
    // ❌ تم حذف دالة useEffect الخاصة بالحفظ (Persistence Effect) 
    // لمنع مسح بيانات localStorage.

    // --- Validation Function ---
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        
        // التحقق من الحقول (مطابق لما هو موجود في StepperPage.jsx)
        
        if (!addressInfo || Object.keys(addressInfo).length === 0) { 
            newErrors.addressInfo = t.requiredAddress || `${primaryTermEn} address is required.`;
            isValid = false;
        }
        if (!establishmentLocation) {
             newErrors.establishmentLocation = t.requiredLocation || `${primaryTermEn} location is required.`;
             isValid = false;
        }
        if (!registrationCertificate) { 
             newErrors.registrationCertificate = t.requiredRegistrationCert || "Registration Certificate upload is required."; // 💡 يجب مطابقة اسم الحقل في StepperPage
             isValid = false;
        }
        if (!additionalCertificates || additionalCertificates.length === 0) {
             newErrors.additionalCertificates = t.requiredSpecialtyCert || "At least one specialty certificate is required."; // 💡 يجب مطابقة اسم الحقل في StepperPage
             isValid = false;
        }
        
        // التحقق من رأس المال
        const capitalValue = Number(capital);
        if (!capital || isNaN(capitalValue) || capitalValue <= 0) {
             newErrors.capital = t.requiredCapital || "Capital must be a positive number.";
             isValid = false;
        }
        
        // التحقق من سنة التأسيس
        const yearValue = Number(foundingYear);
        if (!foundingYear || isNaN(yearValue) || yearValue < 1900 || yearValue > new Date().getFullYear()) {
             newErrors.foundingYear = t.invalidYear || "Invalid foundation year."; // 💡 يجب مطابقة اسم الحقل في StepperPage
             isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };
    
    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "capital") {
            setCapital(value); // يتم حفظ القيمة كنص ثم تحويلها إلى رقم في validation
        }
        else if (name === "notes") {
            setNotes(value);
        }
        else if (name === "foundingYear") {
            setFoundingYear(value); // يتم حفظ القيمة كنص ثم تحويلها إلى رقم في validation
        }
        
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleSaveAddress = (addressData) => {
        if (!addressData || Object.keys(addressData).length === 0) return;
        setAddressInfo(addressData); 
        setErrors(prev => ({ ...prev, addressInfo: null }));
        setIsAddressModalOpen(false);
    };

    const handleSaveLocation = (locationData) => {
        setEstablishmentLocation(locationData); 
        setErrors(prev => ({ ...prev, establishmentLocation: null }));
        setIsMapModalOpen(false);
    };

    const handleSelectYear = (year) => {
        setFoundingYear(year); 
        setErrors(prev => ({ ...prev, foundingYear: null })); // 💡 تحديث اسم الخطأ
        setIsYearDropdownOpen(false);
    };
    
    const handleSelectCurrency = (currencyCode) => {
        setSelectedCurrencyCode(currencyCode);
        setCurrency(currencyCode); // ✅ حفظ العملة المختارة في الحالة الأبوية
        setIsDropdownOpen(false);
    };
    
    const handleYearIconClick = () => {
        setIsYearDropdownOpen(prev => !prev);
        if (isDropdownOpen) setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
        if (isYearDropdownOpen) setIsYearDropdownOpen(false);
    };

    const handleLocalValidationAndNext = () => {
        if (validateForm()) { if (onNext) onNext(); } else { console.log("Validation failed in Step 4."); }
    };
    
    // Modal Handlers 
    const handleCloseAddressModal = () => setIsAddressModalOpen(false);
    const handleOpenAddressModal = () => setIsAddressModalOpen(true);
    const handleCloseMapModal = () => setIsMapModalOpen(false);
    const handleOpenMapModal = () => setIsMapModalOpen(true);
    
    const handleCloseUploaderModal = () => setIsUploaderModalOpen(false); 
    const handleOpenUploaderModal = () => { setIsManagerModalOpen(false); setIsUploaderModalOpen(true); };
    
    const handleCloseManagerModal = () => setIsManagerModalOpen(false);
    const handleOpenManagerModal = () => { setIsUploaderModalOpen(false); setIsManagerModalOpen(true); }; 
    const handleFinalUploadAndSave = () => { setIsManagerModalOpen(false); };
    
    return {
        // State and Translations
        t, language, errors, setErrors, currencies, selectedCurrencyCode, 
        selectedCurrency, 
        primaryTermAr, primaryTermEn,
        isDropdownOpen, isYearDropdownOpen, 

        // Modals States
        isAddressModalOpen, isUploaderModalOpen, isManagerModalOpen, isMapModalOpen,

        // Handlers
        handleChange, handleLocalValidationAndNext, handleSaveAddress, handleSaveLocation, 
        handleSelectYear, handleYearIconClick, handleSelectCurrency, toggleDropdown,
        
        // Modal Handlers
        handleCloseAddressModal, handleOpenAddressModal, handleCloseMapModal, handleOpenMapModal,
        handleCloseUploaderModal, handleOpenUploaderModal, handleCloseManagerModal, handleOpenManagerModal,
        handleFinalUploadAndSave,
    };
};