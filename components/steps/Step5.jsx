import React, { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import styles from "../../styles/Step5.module.css";

export default function Step5() {
  const { translations } = useContext(LanguageContext);

  // 1. حالة تخزين بيانات الحقول
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [saveCard, setSaveCard] = useState(false); // حالة حفظ البطاقة

  // 2. حالة تخزين الأخطاء
  const [errors, setErrors] = useState({});

  // دالة لتنسيق رقم البطاقة (بدون تغيير)
  const formatCardNumber = (num) =>
    num.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  // دالة لتنسيق تاريخ الانتهاء (MM/YY) وإضافة شرطة
  const formatExpiryDate = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length > 2) {
      return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
    }
    return cleanValue;
  };

  // 3. دوال التحقق من صحة الحقول (مأخوذة من الكود السابق)

  const validateCardName = (name) => {
    if (!name.trim()) {
      return translations.step5.validation.cardNameRequired;
    }
    if (name.trim().length < 3) {
      return translations.step5.validation.cardNameRequired;
    }
    if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(name)) { // تم إضافة دعم للحروف العربية
      return translations.step5.validation.cardNameInvalid;
    }
    return "";
  };

  const validateCardNumber = (number) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (cleanNumber.length !== 16) {
      return translations.step5.validation.cardNumberLength;
    }
    return "";
  };

  const validateCvv = (value) => {
    if (!/^\d{3,4}$/.test(value)) { // يقبل 3 أو 4 أرقام فقط
      return translations.step5.validation.cvvLength;
    }
    return "";
  };

  const validateExpiry = (date) => {
    const parts = date.split("/");
    if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
      return translations.step5.validation.expiryFormat; 
    }

    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10) + 2000; 

    if (month < 1 || month > 12) {
      return translations.step5.validation.expiryMonthInvalid;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return translations.step5.validation.expiryDateExpired;
    }
    return "";
  };

  // 4. دالة لمعالجة التغييرات 
  const handleChange = (setter, validator, fieldName) => (e) => {
    const { value } = e.target;
    let processedValue = value;

    if (fieldName === 'cardNumber') {
      processedValue = formatCardNumber(value);
    } else if (fieldName === 'expiry') {
      processedValue = formatExpiryDate(value);
    } else if (fieldName === 'cvv') {
      // السماح بالأرقام فقط للـ CVV والحد الأقصى 4
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setter(processedValue);
    
    // تطبيق التحقق عند الكتابة
    const error = validator(processedValue);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  // دالة تشغيل التحقق الكامل (لزر الدفع)
  const validateAllFields = () => {
    const newErrors = {};
    newErrors.cardName = validateCardName(cardName);
    newErrors.cardNumber = validateCardNumber(cardNumber);
    newErrors.cvv = validateCvv(cvv);
    newErrors.expiry = validateExpiry(expiry);

    setErrors(newErrors);

    return Object.values(newErrors).every(error => error === "");
  };
  
  const handleSubmit = () => {
    if (validateAllFields()) {
      alert("Valid data. Proceeding to payment...");
    } else {
      alert("Please correct the errors.");
    }
  };

  // دالة مساعدة لعرض رسائل الخطأ
  const ErrorText = ({ message }) => 
    message ? (
      <div className={styles.errorText}>{message}</div>
    ) : null;

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {/* Form Section */}
        <div className={styles.formSection}>
          <div className={styles.formTitle}>{translations.step5.pageTitle}</div>

          {/* حقل اسم حامل البطاقة */}
          <div className={styles.field}>
            <label>
              {translations.step5.cardSection.cardHolderName}{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={cardName}
              onChange={handleChange(setCardName, validateCardName, 'cardName')}
              placeholder={translations.step5.cardSection.cardHolderNamePlaceholder}
              className={errors.cardName ? styles.inputError : ''}
            />
            <ErrorText message={errors.cardName} />
          </div>

          {/* حقل رقم البطاقة */}
          <div className={styles.field}>
            <label>
              {translations.step5.cardSection.cardNumber}{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={cardNumber}
              onChange={handleChange(setCardNumber, validateCardNumber, 'cardNumber')}
              placeholder={translations.step5.cardSection.cardNumberPlaceholder}
              maxLength={19}
              className={errors.cardNumber ? styles.inputError : ''}
            />
            <ErrorText message={errors.cardNumber} />
          </div>

          <div className={styles.inline}>
            {/* حقل CVV */}
            <div className={`${styles.flex1} ${styles.field}`}>
              <label>
                {translations.step5.cardSection.cvv}{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                value={cvv}
                onChange={handleChange(setCvv, validateCvv, 'cvv')}
                placeholder={translations.step5.cardSection.cvvPlaceholder}
                maxLength={4}
                type="text"
                className={errors.cvv ? styles.inputError : ''}
              />
              <ErrorText message={errors.cvv} />
            </div>

            {/* حقل تاريخ الانتهاء */}
            <div className={`${styles.flex1} ${styles.field}`}>
              <label>
                {translations.step5.cardSection.expiryDate}{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                value={expiry}
                onChange={handleChange(setExpiry, validateExpiry, 'expiry')}
                placeholder={translations.step5.cardSection.expiryDatePlaceholder}
                maxLength={5}
                className={errors.expiry ? styles.inputError : ''}
              />
              <ErrorText message={errors.expiry} />
            </div>
          </div>

        


          {/* Invoice Summary */}
          <div className={styles.invoice}>
            <div className={styles.invoiceHeader}>{translations.step5.invoice.header}</div>
            <ul className={styles.invoiceList}>
              <li className={styles.invoiceItem}>
                <span>{translations.step5.invoice.companyRegistration}</span>
                <span>$1000</span>
              </li>
              <li className={styles.invoiceItem}>
                <span>{translations.step5.invoice.technicalSupport}</span>
                <span>$400</span>
              </li>
              <li className={styles.invoiceItem}>
                <span>{translations.step5.invoice.serviceTax}</span>
                <span>$100</span>
              </li>
            </ul>
            <div className={styles.totalRow}>
              <div className={styles.totalLabel}>{translations.step5.invoice.totalLabel}</div>
              <div className={styles.total}>$1500</div>
            </div>
          </div>

        
         
        </div>

        {/* Card Preview - تم تعديل الهيكل ليتناسب مع الصورة المرفقة */}
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.chip} />
            <div className={styles.visaLogo}>{translations.step5.cardSection.visa}</div>
          </div>
          
          <div className={styles.cardNumberPreview}>
            {cardNumber || translations.step5.cardSection.cardNumberPlaceholder}
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.cardInfo}>
              <div className={styles.cardLabel}>Card Holder name</div>
              <div className={styles.cardValue}>{cardName || "Ali Salem"}</div>
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.cardLabel}>Expiry Date</div>
              <div className={styles.cardValue}>{expiry || "02/30"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}