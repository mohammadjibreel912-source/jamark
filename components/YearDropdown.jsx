// YearDropdown.jsx (مكون افتراضي، تحتاج لإضافة منطق توليد السنوات)

import React from 'react';
import styles from "../styles/step4.module.css";

const YearDropdown = ({ selectedYear, onSelect, language }) => {
    const currentYear = new Date().getFullYear();
    // توليد السنوات من السنة الحالية إلى 100 سنة سابقة
    const years = Array.from({ length: 101 }, (_, i) => currentYear - i); 

    return (
        <div 
            className={styles.dropdownList}
            style={{ 
                // وضع الـ Dropdown تحت الحقل
                [language === "ar" ? "right" : "left"]: 0,
                maxHeight: '200px',
                overflowY: 'auto',
                top: 'calc(100% + 5px)' // لتصييره أسفل حقل الإدخال
            }}
        >
            {years.map((year) => (
                <div
                    key={year}
                    onClick={() => onSelect(year.toString())}
                    className={`${styles.dropdownItem} ${year.toString() === selectedYear ? styles.dropdownItemSelected : ""}`}
                    // ... (تنسيقات hover)
                >
                    {year}
                </div>
            ))}
        </div>
    );
};

export default YearDropdown;