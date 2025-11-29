import React from 'react';
import { ChevronDown, Flag } from 'lucide-react';

/**
 * Currency Selection Dropdown Component
 */
const CurrencySelect = ({ currencies, selectedCode, onSelectCurrency, onToggleDropdown, isOpen, language, selectedCurrency }) => {
    
    // Function to get the correct name based on language
    const getCurrencyName = (cur) => (language === "ar" && cur.nameAr) ? cur.nameAr : cur.name || cur.code;

    // Default class for input container - تم إضافة 'relative'
    const inputClass = "h-full bg-gray-100 p-2 border-r border-gray-300 flex items-center cursor-pointer hover:bg-gray-200 transition-colors relative";

    return (
        // العنصر الأب الآن به تموضع نسبي 'relative'
        <div 
            className={inputClass}
            onClick={onToggleDropdown}
            style={{ 
                width: '120px', 
                order: language === "ar" ? 2 : 1, 
                borderLeft: language === "ar" ? '1px solid #d1d5db' : 'none',
                borderRight: language === "ar" ? 'none' : '1px solid #d1d5db',
                borderRadius: language === "ar" ? '0 8px 8px 0' : '8px 0 0 8px'
            }}
        >
            {/* عرض العلم (إذا توفر flagUrl) أو أيقونة Flag */}
            {selectedCurrency?.flagUrl ? (
                <img src={selectedCurrency.flagUrl} alt={`${selectedCurrency.code} flag`} className="w-5 h-5 mr-2 flex-shrink-0 rounded-sm object-cover" />
            ) : (
                <Flag className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
            )}

            <span className="font-semibold text-gray-800 text-sm truncate">{selectedCurrency?.code || "JOD"}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 ml-auto transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />

            {/* Dropdown List */}
            {isOpen && (
                <div
                    className={`absolute z-30 w-48 max-h-64 overflow-y-auto bg-white border border-gray-300 shadow-xl rounded-lg top-full mt-1 transition-opacity duration-200 ${language === "ar" ? "right-0" : "left-0"}`}
                >
                    {currencies.map((cur) => (
                        <div
                            key={cur.code}
                            onClick={(e) => { e.stopPropagation(); onSelectCurrency(cur.code); }}
                            className={`
                                px-4 py-2 cursor-pointer text-gray-700 text-sm flex items-center transition-colors duration-150
                                ${cur.code === selectedCode ? 'bg-indigo-500 text-white font-semibold hover:bg-indigo-600' : 'hover:bg-indigo-100 hover:text-indigo-800'}
                            `}
                        >
                            {/* عرض صورة العلم داخل القائمة */}
                            {cur.flagUrl && (
                                <img src={cur.flagUrl} alt={`${cur.code} flag`} className="w-4 h-4 mr-2 flex-shrink-0 rounded-sm object-cover" />
                            )}
                            
                            {/* رمز العملة والاسم */}
                            <span className="font-mono text-xs font-bold">{cur.code}</span>
                            <span
                                className={`text-xs italic ml-auto ${cur.code === selectedCode ? 'text-white' : 'text-gray-500'}`}
                                dir={language}
                            >
                                ({getCurrencyName(cur)})
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CurrencySelect;