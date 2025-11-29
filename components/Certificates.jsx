// Certificates.jsx
import React, { useContext, useState } from 'react';
import { LanguageContext } from "../context/LanguageContext"; // استخدام سياق اللغة
import '../styles/Certificates.module.css'; // استيراد الأنماط

// ---------------------------------------------------------------------
// 1. المكونات الفرعية (Icons)
// ---------------------------------------------------------------------

// 1. Dropdown Icon Component
const DropdownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="currentColor" className="flex-shrink-0">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.40815 6.32887L1.07928 0L0 1.07928L7.40815 8.48744L14.8163 1.07928L13.737 0L7.40815 6.32887Z" />
    </svg>
);

// 2. Delete Icon Component
const DeleteIcon = ({ onClick, ariaLabel }) => (
    <button className="action-icon-button action-icon-delete" onClick={onClick} aria-label={ariaLabel}>
        <svg className="action-icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.5625 22C5.90937 22 5.35046 21.7717 4.88575 21.3152C4.42104 20.8586 4.18829 20.3091 4.1875 19.6667V4.5H3V2.16667H8.9375V1H16.0625V2.16667H22V4.5H20.8125V19.6667C20.8125 20.3083 20.5801 20.8578 20.1154 21.3152C19.6507 21.7725 19.0914 22.0008 18.4375 22H6.5625ZM18.4375 4.5H6.5625V19.6667H18.4375V4.5ZM8.9375 17.3333H11.3125V6.83333H8.9375V17.3333ZM13.6875 17.3333H16.0625V6.83333H13.6875V17.3333Z" />
        </svg>
    </button>
);

// 3. Edit Icon Component
const EditIcon = ({ onClick, ariaLabel }) => (
    <button className="action-icon-button action-icon-edit" onClick={onClick} aria-label={ariaLabel}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="action-icon-svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.528 2.94775H4.8951C4.39249 2.94775 3.91046 3.14742 3.55506 3.50282C3.19966 3.85822 3 4.34025 3 4.84286V18.1086C3 18.6112 3.19966 19.0932 3.55506 19.4486C3.91046 19.804 4.39249 20.0037 4.8951 20.0037H18.1608C18.6634 20.0037 19.1455 19.804 19.5009 19.4486C19.8563 19.0932 20.0559 18.6112 20.0559 18.1086V11.4757" />
            <path d="M17.569 2.5924C17.946 2.21544 18.4572 2.00366 18.9903 2.00366C19.5234 2.00366 20.0347 2.21544 20.4117 2.5924C20.7886 2.96935 21.0004 3.48062 21.0004 4.01372C21.0004 4.54682 20.7886 5.05809 20.4117 5.43505L11.8714 13.9763C11.6464 14.2011 11.3684 14.3656 11.0631 14.4548L8.34081 15.2507C8.25927 15.2745 8.17284 15.2759 8.09057 15.2549C8.00829 15.2338 7.9332 15.191 7.87314 15.1309C7.81308 15.0709 7.77028 14.9958 7.7492 14.9135C7.72812 14.8312 7.72954 14.7448 7.75333 14.6633L8.54927 11.9409C8.63884 11.6359 8.80372 11.3583 9.02873 11.1336L17.569 2.5924Z" />
        </svg>
    </button>
);
// ---------------------------------------------------------------------

// بيانات أولية للعرض
const initialCertificates = [
    { id: 1, name: "الشهادة الإختصاصية 1" },
    { id: 2, name: "الشهادة الإختصاصية 2" },
    { id: 3, name: "الشهادة الإختصاصية 3" },
];

const Certificates = () => {
    // ⬇️ استخدام السياق ⬇️
    const { translations, language } = useContext(LanguageContext);
    // التأكد من وجود مفتاح الترجمات لتجنب الأخطاء
    const t = translations.certificates || {
        placeholder: "أدخل اسم الشهادة أو رقمها",
        dropdownPlaceholder: "اختر نوع الشهادة",
        option1: "شهادة مهنية",
        option2: "شهادة أكاديمية",
        option3: "شهادة دورة",
        addButton: "إضافة",
        tableName: "اسم الشهادة",
        tableAction: "الإجراء",
        deleteAriaLabel: "حذف الشهادة",
        editAriaLabel: "تعديل الشهادة",
        noCertificates: "لا توجد شهادات مضافة بعد.",
        saveButton: "حفظ ومتابعة",
        alertEdit: (id) => `جارٍ تعديل الشهادة رقم: ${id}`,
        alertSuccess: "تم حفظ الشهادات بنجاح!",
    };
    // ⬆️ نهاية استخدام السياق ⬆️

    const [certificates, setCertificates] = useState(initialCertificates);
    const [newCertificateName, setNewCertificateName] = useState('');
    const [selectedOption, setSelectedOption] = useState(''); 

    // تحديد الاتجاه (dir) بناءً على اللغة المختارة
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    // دالة لإضافة شهادة جديدة
    const handleAddCertificate = () => {
        // يمكن دمج newCertificateName و selectedOption هنا
        if (newCertificateName.trim() || selectedOption) {
            const name = newCertificateName.trim() || t.dropdownPlaceholder; // استخدام النص المختار إذا لم يتم إدخال شيء
            const type = selectedOption ? `(${selectedOption})` : '';

            const newCert = {
                id: Date.now(), 
                name: `${name} ${type}`.trim()
            };
            setCertificates([newCert, ...certificates]);
            setNewCertificateName('');
            setSelectedOption('');
        }
    };

    // دالة لحذف شهادة
    const handleDelete = (id) => {
        setCertificates(certificates.filter(cert => cert.id !== id));
    };

    // دالة محاكاة التعديل - تستخدم رسالة مترجمة
    const handleEdit = (id) => {
        // التأكد من أن alertEdit موجودة وقابلة للاستدعاء
        const alertMessage = typeof t.alertEdit === 'function' ? t.alertEdit(id) : `Editing certificate ID: ${id}`;
        alert(alertMessage);
    };

    // دالة الحفظ - تستخدم رسالة مترجمة
    const handleSave = () => {
        console.log('Saved Certificates:', certificates);
        alert(t.alertSuccess || "Saved successfully!");
    };
    
    // تحويل الخيارات إلى مصفوفة لسهولة العرض في JSX
    const options = [
        { value: 'option1', label: t.option1 },
        { value: 'option2', label: t.option2 },
        { value: 'option3', label: t.option3 },
    ];


    return (
        // استخدام خاصية الاتجاه المُترجمة
        <div dir={dir}>
            <div className="p-4 md:p-8">
                {/* Main Content Container */}
                <div className="main-container">

                    {/* Top Action Bar: Input/Dropdown and Add Button */}
                    <div className="top-action-bar">
                        
                        {/* Input/Dropdown Block (Flex-grow) */}
                        <div className="input-container">
                            
                            {/* Input - يستخدم placeholder مُترجم */}
                            <input 
                                type="text" 
                                placeholder={t.placeholder} 
                                className="input-field"
                                value={newCertificateName}
                                onChange={(e) => setNewCertificateName(e.target.value)}
                            />
                            
                            {/* Dropdown */}
                            <div className="dropdown-icon-wrapper">
                                <DropdownIcon />

                                {/* Functional Select element - يستخدم خيارات مترجمة */}
                                <select 
                                    className="select-element"
                                    value={selectedOption}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                >
                                    {/* التأكد من وجود المفاتيح قبل استخدامها */}
                                    <option value="" disabled>{t.dropdownPlaceholder}</option>
                                    {options.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        
                        {/* Button: "إضافة" - يستخدم نص مُترجم */}
                        <button 
                            className="btn-add"
                            onClick={handleAddCertificate}
                            disabled={!newCertificateName.trim() && !selectedOption} // تعطيل الزر إذا كان كلا الحقلين فارغين
                        >
                            {t.addButton}
                        </button>
                    </div>

                    {/* Table Section: List of Certificates */}
                    <div className="table-wrapper">
                        
                        {/* Table Header - يستخدم عناوين مترجمة */}
                        <div className="table-header">
                            <div className="col-name">{t.tableName}</div>
                            <div className="col-action">{t.tableAction}</div>
                        </div>

                        {/* Table Content Rows */}
                        <div className="table-content">
                            {certificates.length > 0 ? (
                                certificates.map((cert) => (
                                    <div key={cert.id} className="table-row">
                                        <div className="col-name">{cert.name}</div>
                                        <div className="col-action">
                                            {/* Delete Icon - يستخدم aria-label مُترجم */}
                                            <DeleteIcon 
                                                onClick={() => handleDelete(cert.id)} 
                                                ariaLabel={t.deleteAriaLabel}
                                            />
                                            {/* Edit Icon - يستخدم aria-label مُترجم */}
                                            <EditIcon 
                                                onClick={() => handleEdit(cert.id)} 
                                                ariaLabel={t.editAriaLabel}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // رسالة عدم وجود شهادات مُترجمة
                                <div className="p-4 text-center text-gray-500">{t.noCertificates}</div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer / Save Bar (Fixed at the bottom) */}
            <div className="footer-bar">
                {/* زر الحفظ مُترجم */}
                <button 
                    className="save-button"
                    onClick={handleSave}
                >
                    {t.saveButton}
                </button>
            </div>
        </div>
    );
};

export default Certificates;