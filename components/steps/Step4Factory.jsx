import React, { useEffect, useState, useContext, useRef } from "react";
import calendarIcon from "../../src/assets/calendarIcon.png";
import mapIcon from "../../src/assets/mapIcon.png";
import uploadIcon from "../../src/assets/uploadIcon.png";
import plusIcon from "../../src/assets/plusIcon.png";
import downArrowIcon from "../../src/assets/building.png"; 
import defaultFlagIcon from "../../src/assets/background.jpg"; 
import "../../styles/step4.css"; 

// --- Import necessary components ---
import Modal from "../Modal"; 
import AddressForm from "../AddressForm"; 
import DropzoneUploader from "../DropzoneUploader"; 
// -----------------------------------

import { LookupsService } from "../../services/LookupsService";
import { LanguageContext } from "../../context/LanguageContext";


// -----------------------------------------------------------------
// 1. Component for Custom Currency Dropdown (with Flag)
// -----------------------------------------------------------------
const CurrencyDropdown = ({ currencies, selectedCode, onSelect, language }) => {
    
    const getCurrencyName = (cur) => {
        if (language === 'ar' && cur.nameAr) return cur.nameAr;
        if (cur.name) return cur.name;
        return cur.code; 
    };

    return (
        <div 
            style={{
                position: 'absolute',
                zIndex: 100,
                width: '100%',
                maxHeight: '200px',
                overflowY: 'auto',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                marginTop: '5px',
                [language === 'ar' ? 'right' : 'left']: 0,
            }}
        >
            {currencies.map((cur) => (
                <div
                    key={cur.code}
                    onClick={() => onSelect(cur.code)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 15px',
                        cursor: 'pointer',
                        backgroundColor: cur.code === selectedCode ? '#e0f7ff' : 'white',
                        borderBottom: '1px solid #eee',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = cur.code === selectedCode ? '#d0f0ff' : '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = cur.code === selectedCode ? '#e0f7ff' : 'white'}
                >
                    <img 
                        src={cur.icon ? `https://corplatform.sfo3.digitaloceanspaces.com/${cur.icon}` : defaultFlagIcon}
                        alt={cur.code}
                        style={{ 
                            width: '24px', 
                            height: '18px', 
                            borderRadius: '2px', 
                            objectFit: 'cover',
                            [language === 'ar' ? 'marginLeft' : 'marginRight']: '10px' 
                        }}
                    />
                    <span style={{ fontWeight: 'bold' }}>{cur.code}</span>
                    <span style={{ fontSize: '0.9em', color: '#666', [language === 'ar' ? 'marginRight' : 'marginLeft']: '10px' }}>
                        ({getCurrencyName(cur)})
                    </span>
                </div>
            ))}
        </div>
    );
};


// -----------------------------------------------------------------
// 2. Component for Custom Year Picker Dropdown
// -----------------------------------------------------------------
const YearDropdown = ({ selectedYear, onSelect, language }) => {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    const years = [];

    // Create a list of years in descending order
    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 200, 
                width: '100%',
                maxHeight: '200px',
                overflowY: 'auto',
                backgroundColor: 'white',
                border: '1px solid #0056b3', 
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginTop: '5px',
                [language === 'ar' ? 'right' : 'left']: 0,
            }}
        >
            {years.map((year) => (
                <div
                    key={year}
                    onClick={() => onSelect(year)}
                    style={{
                        padding: '8px 15px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontWeight: year === selectedYear ? 'bold' : 'normal',
                        backgroundColor: year === selectedYear ? '#e0f7ff' : 'white',
                        borderBottom: '1px solid #eee',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = year === selectedYear ? '#d0f0ff' : '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = year === selectedYear ? '#e0f7ff' : 'white'}
                >
                    {year}
                </div>
            ))}
        </div>
    );
};


// -----------------------------------------------------------------
// 3. Main Component Step4Factory
// -----------------------------------------------------------------
const Step4Factory = ({ step }) => {
    const { translations, language } = useContext(LanguageContext);
    const t = translations.step4;

    const dropdownRef = useRef(null); // Ref for Currency Dropdown
    const yearDropdownRef = useRef(null); // Ref for Year Dropdown
    
    const [currencies, setCurrencies] = useState([]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isUploaderModalOpen, setIsUploaderModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Currency
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false); // Year
    

    const [formData, setFormData] = useState({
        addressInfo: null, 
        factoryLocation: "",
        certificate: null, 
        specialtyCertificates: [],
        foundationYear: 1999,
        capital: 10000,
        currency: "USD",
        notes: "",
    });

    const selectedCurrency = currencies.find(c => c.code === formData.currency);

    // Close currency dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);
    
    // Close year dropdown when clicking outside
    useEffect(() => {
        function handleYearClickOutside(event) {
            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
                setIsYearDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleYearClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleYearClickOutside);
        };
    }, [yearDropdownRef]);

    
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const currencyList = await LookupsService.getCurrencies();
                setCurrencies(currencyList || []);
                if (currencyList && currencyList.length > 0 && !formData.currency) {
                    setFormData(prev => ({ ...prev, currency: currencyList[0].code }));
                }
            } catch (err) {
                console.error("Error fetching currencies:", err);
            }
        };
        fetchCurrencies();
    }, [step]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "capital" || name === "foundationYear") {
             setFormData((prev) => ({ ...prev, [name]: Number(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    
    // Year Dropdown Handlers
    const handleYearIconClick = () => {
        setIsYearDropdownOpen(prev => !prev);
        // Ensure currency dropdown is closed when opening year dropdown
        if (isDropdownOpen) setIsDropdownOpen(false);
    };

    const handleSelectYear = (year) => {
        setFormData((prev) => ({ ...prev, foundationYear: year }));
        setIsYearDropdownOpen(false);
    };
    
    // --- Modal/Dropdown Handlers ---
    const handleOpenAddressModal = () => setIsAddressModalOpen(true);
    const handleCloseAddressModal = () => setIsAddressModalOpen(false);

    const handleOpenUploaderModal = () => setIsUploaderModalOpen(true);
    const handleCloseUploaderModal = () => setIsUploaderModalOpen(false);
    
    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
        // Ensure year dropdown is closed when opening currency dropdown
        if (isYearDropdownOpen) setIsYearDropdownOpen(false);
    };
    
    const handleSelectCurrency = (currencyCode) => { 
        setFormData((prev) => ({ ...prev, currency: currencyCode }));
        setIsDropdownOpen(false); 
    };

    const handleSaveAddress = (addressData) => {
        setFormData((prev) => ({ ...prev, addressInfo: addressData }));
        handleCloseAddressModal();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFormData((prev) => ({ ...prev, certificate: e.target.files[0] }));
        }
    };
    
    const handleSaveCertificates = (files) => {
        setFormData((prev) => ({ 
            ...prev, 
            specialtyCertificates: [...prev.specialtyCertificates, ...files] 
        }));
        handleCloseUploaderModal();
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert(t.formSubmitted);
    };

    return (
        <div className="factory-form-container" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
            <h2 className="form-title">{t.addressInformation || "Address Information"}</h2> 
            <form onSubmit={handleSubmit}>
                
                {/* 1. Address Factory */}
                <div className="form-field">
                    <label>
                        {t.addressFactory || "Address Factory"} <span style={{ color: "red" }}>*</span> 
                    </label>
                    <div className="input-with-icon-container" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                        <input
                            type="text"
                            name="addressDisplay" 
                            placeholder={t.addressFactoryPlaceholder || "Click plus to enter address"}
                            value={formData.addressInfo ? formData.addressInfo.summary : ''} 
                            readOnly 
                            style={{ border: 'none' }}
                        />
                        <img 
                            alt="plusIcon" 
                            className="input-icon clickable-icon" 
                            src={plusIcon} 
                            onClick={handleOpenAddressModal} 
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>

                {/* 2. Factory Location */}
                <div className="form-field">
                    <label>
                        {t.factoryLocation} <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="input-with-icon-container" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                        <img src={mapIcon} alt="map" className="input-icon" />
                        <input
                            type="url"
                            name="factoryLocation"
                            placeholder={t.factoryLocationPlaceholder}
                            value={formData.factoryLocation}
                            onChange={handleChange}
                            style={{ border: 'none' }}
                        />
                    </div>
                </div>

                {/* 3. Registration Certificate (FIXED STYLE) */}
                <div className="form-field">
                    <label>
                        {t.registrationCertificate} <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="input-with-icon-container" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                        
                        <img alt="upload" className="input-icon" src={uploadIcon} />
                        
                        <div 
                            style={{ 
                                flexGrow: 1, 
                                padding: '10px 0',
                                color: formData.certificate ? '#000' : '#888',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            onClick={() => document.getElementById('reg-certificate-upload').click()}
                        >
                            {formData.certificate ? formData.certificate.name : t.uploadFilePlaceholder || "Choose a file..."}
                        </div>
                        
                        <input
                            id="reg-certificate-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* 4. Specialty Certificates */}
                <div className="form-field">
                    <label>
                        {t.specialtyCertificates} <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="input-with-icon-container" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                        <div className="file-input-placeholder" style={{ flexGrow: 1, padding: '10px 0', color: '#888' }}>
                            {t.uploadMultipleFiles || "Upload files by clicking the plus icon"}
                        </div>
                        <img 
                            alt="plusIcon" 
                            className="input-icon clickable-icon" 
                            src={plusIcon} 
                            onClick={handleOpenUploaderModal} 
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    {formData.specialtyCertificates.length > 0 && (
                        <div className="specialty-files-list">
                            {formData.specialtyCertificates.map((file, idx) => (
                                <span key={idx} className="file-chip">
                                    {file.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* 5. Foundation Year (Custom Year Picker) */}
                <div className="form-field">
                    <label>
                        {t.foundationYear} <span style={{ color: "red" }}>*</span>
                    </label>
                    <div 
                        className="input-with-icon-container" 
                        ref={yearDropdownRef} 
                        style={{ border: '1px solid #ccc', borderRadius: '4px', position: 'relative' }}
                    >
                        
                        {/* Calendar Icon - Opens the Custom Year Dropdown */}
                        <img 
                            src={calendarIcon} 
                            alt="calendar" 
                            className="input-icon clickable-icon" 
                            onClick={handleYearIconClick} 
                            style={{ cursor: 'pointer' }}
                        />
                        
                        {/* Input type=number for year - Spinners hidden via style */}
                        <input
                            type="text"
                            name="foundationYear"
                            value={formData.foundationYear}
                            onChange={handleChange}
                            placeholder="YYYY"
                            min="1900"
                            max={new Date().getFullYear()}
                            style={{ 
                                border: 'none', 
                                flexGrow: 1, 
                                padding: '10px 0', 
                                textAlign: language === 'ar' ? 'right' : 'left',
                                // CSS to hide spinners
                                MozAppearance: 'textfield', 
                                WebkitAppearance: 'none', 
                                appearance: 'none', 
                            }}
                        />
                         
                        {/* The INLINE Year Dropdown List */}
                        {isYearDropdownOpen && (
                            <YearDropdown
                                selectedYear={formData.foundationYear}
                                onSelect={handleSelectYear}
                                language={language}
                            />
                        )}
                    </div>
                </div>

                {/* 6. Capital + Currency (Custom Flag Dropdown) */}
                <div className="form-field">
                    <label>
                        {t.capital} <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="capital-currency-container" style={{ display: 'flex' }}>
                        
                        {/* 1. Capital Input */}
                        <input
                            type="number"
                            name="capital"
                            value={formData.capital}
                            onChange={handleChange}
                            className="capital-input"
                            placeholder={t.capitalPlaceholder}
                            style={{ flex: 2, padding: '10px', border: '1px solid #ccc', borderRadius: language === 'ar' ? '0 4px 4px 0' : '4px 0 0 4px' }}
                        />
                        
                        {/* 2. Custom Currency Dropdown Container */}
                        <div 
                            className="currency-custom-select-wrapper" 
                            ref={dropdownRef} 
                            style={{ 
                                flex: 1, 
                                minWidth: '150px', 
                                position: 'relative', 
                                zIndex: 5,
                            }}
                        >
                            <div
                                onClick={toggleDropdown}
                                style={{ 
                                    padding: '10px 12px', 
                                    border: '1px solid #ccc', 
                                    borderLeft: language === 'ar' ? '1px solid #ccc' : 'none',
                                    borderRight: language === 'ltr' ? '1px solid #ccc' : 'none',
                                    borderRadius: language === 'ar' ? '4px 0 0 4px' : '0 4px 4px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    height: '100%',
                                }}
                            >
                                <div className="currency-display" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <img 
                                        src={selectedCurrency ? `https://corplatform.sfo3.digitaloceanspaces.com/${selectedCurrency.icon}` : defaultFlagIcon}
                                        alt={selectedCurrency ? selectedCurrency.code : 'Currency'}
                                        style={{ width: '24px', height: '18px', borderRadius: '2px', objectFit: 'cover' }}
                                    />
                                    <span style={{ fontWeight: 'bold' }}>
                                        {selectedCurrency ? selectedCurrency.code : 'Select'}
                                    </span>
                                </div>
                                <img src={downArrowIcon} alt="Arrow" style={{ width: '12px', height: '12px', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                            </div>

                            {/* The INLINE Dropdown List */}
                            {isDropdownOpen && (
                                <CurrencyDropdown
                                    currencies={currencies}
                                    selectedCode={formData.currency}
                                    onSelect={handleSelectCurrency}
                                    language={language}
                                />
                            )}
                        </div>
                        
                    </div>
                </div>

                {/* 7. Notes */}
                <div className="form-field">
                    <label>{t.notes}</label>
                    <textarea
                        name="notes"
                        placeholder={t.notesPlaceholder}
                        value={formData.notes}
                        onChange={handleChange}
                        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}
                    />
                </div>
                
            </form>

            {/* Modals */}
            {isAddressModalOpen && (
                <Modal onClose={handleCloseAddressModal} title={t.addressFactory || "Enter Address"}>
                    <AddressForm onSave={handleSaveAddress} onClose={handleCloseAddressModal} />
                </Modal>
            )}

            {isUploaderModalOpen && (
                <Modal onClose={handleCloseUploaderModal} title={t.specialtyCertificates || "Upload Certificates"}>
                    <DropzoneUploader onSave={handleSaveCertificates} onClose={handleCloseUploaderModal} />
                </Modal>
            )}
        </div>
    );
};

export default Step4Factory;