import React from 'react';
import Modal from './Modal'; // Assuming your Modal component is here
import defaultFlagIcon from '../../src/assets/defaultFlag.png'; // Make sure this path is correct

const SelectCurrencyModal = ({ onClose, onSelect, currencies, language }) => {
    
    // Helper function to get the localized name
    const getCurrencyName = (cur) => {
        return language === 'ar' ? cur.nameAr : cur.name;
    };

    const handleItemClick = (code) => {
        onSelect(code);
    };

    return (
        <Modal 
            onClose={onClose} 
            title={language === 'ar' ? 'اختر العملة' : 'Select Currency'}
        >
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {currencies.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#888' }}>
                        {language === 'ar' ? 'تحميل العملات...' : 'Loading currencies...'}
                    </p>
                )}
                {currencies.map((cur) => (
                    <div
                        key={cur.code}
                        onClick={() => handleItemClick(cur.code)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 15px',
                            borderBottom: '1px solid #eee',
                            cursor: 'pointer',
                            transition: 'background-color 0.1s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                        <img 
                            // Use the full URL structure here
                            src={cur.icon ? `https://corplatform.sfo3.digitaloceanspaces.com/${cur.icon}` : defaultFlagIcon}
                            alt={cur.code}
                            style={{ 
                                width: '30px', 
                                height: '22px', 
                                borderRadius: '3px', 
                                objectFit: 'cover',
                                [language === 'ar' ? 'marginLeft' : 'marginRight']: '15px' // Conditional margin
                            }}
                        />
                        <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
                            {cur.code}
                        </span>
                        <span>
                            ({getCurrencyName(cur)})
                        </span>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default SelectCurrencyModal;