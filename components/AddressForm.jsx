import React, { useState } from "react";
import styles from "../styles/AddressForm.module.css";

const AddressForm = ({
    onSave,
    onClose,
    initialData = {},
    translations = {},
    language = "en",
}) => {
    const isRTL = language === "ar";
    
    const [formData, setFormData] = useState({
        street: initialData?.street || "",
        city: initialData?.city || "",
        region: initialData?.region || "",
        postalCode: initialData?.postalCode || "",
        country: initialData?.country || "",
        buildingNumber: initialData?.buildingNumber || "",
        additionalNumber: initialData?.additionalNumber || "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.street?.trim()) newErrors.street = "Street is required";
        if (!formData.city?.trim()) newErrors.city = "City is required";
        if (!formData.region?.trim()) newErrors.region = "Region is required";
        if (!formData.country?.trim()) newErrors.country = "Country is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveClick = () => {
        if (validateForm()) {
            console.log("Saving address:", formData);
            if (onSave) {
                onSave(formData);
            }
        }
    };

    return (
        <div 
            className={styles.addressFormContainer}
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Row 1: Country, City, Region, Street */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        {translations?.country || "البلد"}
                        <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.country ? styles.inputError : ""}`}
                    />
                    {errors.country && <span className={styles.error}>{errors.country}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        {translations?.city || "المدينة"}
                        <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                    />
                    {errors.city && <span className={styles.error}>{errors.city}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        {translations?.region || "المنطقة"}
                        <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.region ? styles.inputError : ""}`}
                    />
                    {errors.region && <span className={styles.error}>{errors.region}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        {translations?.street || "الشارع او الحي"}
                        <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.street ? styles.inputError : ""}`}
                    />
                    {errors.street && <span className={styles.error}>{errors.street}</span>}
                </div>
            </div>

            {/* Row 2: Building, Floor, Suite/Office, Postal Code */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        {translations?.buildingNumber || "رقم البناية"}
                        <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="buildingNumber"
                        value={formData.buildingNumber}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        {translations?.additionalNumber || "الطابق"}
                        <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="additionalNumber"
                        value={formData.additionalNumber}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        {translations?.suite || "رقم المكتب"}
                        <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        {translations?.postalCode || "الرمز البريدي"}
                        <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className={styles.buttonGroup}>
                <button
                    type="button"
                    className={styles.saveButton}
                    onClick={handleSaveClick}
                >
                    {translations?.save || "إضافة"}
                </button>
            </div>
        </div>
    );
};

export default AddressForm;