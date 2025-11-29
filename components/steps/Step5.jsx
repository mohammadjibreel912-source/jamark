import React, { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import styles from "../../styles/Step5.module.css";
// افترض أنك تحتاج إلى أنماط إضافية لرسائل الخطأ في Step5.module.css مثل .errorText
// سنستخدم هنا style inline مؤقتًا لرسالة الخطأ

export default function Step5() {
  const { translations } = useContext(LanguageContext);

  // 1. حالة تخزين بيانات الحقول
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  // 2. حالة تخزين الأخطاء
  const [errors, setErrors] = useState({});

  // دالة لتنسيق رقم البطاقة (بدون تغيير)
  const formatCardNumber = (num) =>
    num.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  // دالة لتنسيق تاريخ الانتهاء (MM/YY) وإضافة شرطة
  const formatExpiryDate = (value) => {
    // إزالة أي حرف غير رقمي
    const cleanValue = value.replace(/\D/g, "");

    // إضافة شرطة بعد أول رقمين (الشهر)
    if (cleanValue.length > 2) {
      return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
    }
    return cleanValue;
  };

  // 3. دوال التحقق من صحة الحقول

  const validateCardName = (name) => {
    if (name.trim().length < 3) {
      return translations.step5.validation.cardNameRequired;
    }
    // يمكن إضافة تحقق لإدخال الحروف فقط (اختياري)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return translations.step5.validation.cardNameInvalid;
    }
    return "";
  };

  const validateCardNumber = (number) => {
    // إزالة المسافات للتحقق
    const cleanNumber = number.replace(/\s/g, "");
    if (cleanNumber.length !== 16) {
      return translations.step5.validation.cardNumberLength;
    }
    // يمكن إضافة تحقق لخوارزمية Luhn (اختياري، أكثر تعقيداً)
    return "";
  };

  const validateCvv = (value) => {
    if (value.length !== 3 && value.length !== 4) { // تقبل 3 أو 4 أرقام
      return translations.step5.validation.cvvLength;
    }
    return "";
  };

  const validateExpiry = (date) => {
    const parts = date.split("/");
    if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
      return translations.step5.validation.expiryFormat; // يجب أن يكون MM/YY
    }

    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10) + 2000; // افتراض أن السنة YY تعني 20YY

    if (month < 1 || month > 12) {
      return translations.step5.validation.expiryMonthInvalid;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // 1-12

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return translations.step5.validation.expiryDateExpired;
    }
    return "";
  };

  // 4. دالة لمعالجة التغييرات (Handling Changes)

  const handleChange = (setter, validator, fieldName) => (e) => {
    const { value } = e.target;
    let processedValue = value;

    if (fieldName === 'cardNumber') {
      processedValue = formatCardNumber(value);
    } else if (fieldName === 'expiry') {
      processedValue = formatExpiryDate(value);
    }
    
    setter(processedValue);
    
    // تطبيق التحقق عند الكتابة
    const error = validator(processedValue);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };


  // دالة تشغيل التحقق الكامل (مثلاً عند الضغط على زر الدفع)
  const validateAllFields = () => {
    const newErrors = {};
    newErrors.cardName = validateCardName(cardName);
    newErrors.cardNumber = validateCardNumber(cardNumber);
    newErrors.cvv = validateCvv(cvv);
    newErrors.expiry = validateExpiry(expiry);

    setErrors(newErrors);

    // إرجاع true إذا لم توجد أخطاء
    return Object.values(newErrors).every(error => error === "");
  };


  // // (بافتراض وجود زر دفع أو إجراء نهائي)
  // const handleSubmit = () => {
  //   if (validateAllFields()) {
  //     console.log("Valid data:", { cardName, cardNumber, cvv, expiry });
  //     // Proceed with payment logic
  //   } else {
  //     console.log("Validation failed");
  //   }
  // };


  // 5. عرض الكومبوننت (JSX)

  const ErrorText = ({ message }) => 
    message ? (
      <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{message}</div>
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
                maxLength={4} // تم تعديل MaxLength للسماح بـ 4 أرقام
                type="text" // تم تغييره إلى text للرؤية
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
              />
              <ErrorText message={errors.expiry} />
            </div>
          </div>

          <div className={styles.saveCardBottom}>
            <span>{translations.step5.cardSection.saveCard}</span>
          </div>

          {/* Invoice Summary... (بقية الكود لم يتغير) */}
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

        {/* Card Preview ... (بقية الكود لم يتغير) */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.chip} />
            <div className={styles.cardNumber}>
              {cardNumber ? formatCardNumber(cardNumber) : translations.step5.cardSection.cardNumberPlaceholder}
            </div>
          </div>

          <div className={styles.cardRow}>
            <div className={styles.cardInfo}>
              <div className={styles.cardLabel}>{translations.step5.cardSection.cardHolderName}</div>
              <div className={styles.cardValue}>{cardName || translations.step5.cardSection.cardHolderNamePlaceholder}</div>
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.cardLabel}>{translations.step5.cardSection.expiryDate}</div>
              <div className={styles.cardValue}>{expiry || translations.step5.cardSection.expiryDatePlaceholder}</div>
            </div>
          </div>

          <div className={styles.cardRow}>
            <div className={styles.cardInfo}>
              <div className={styles.cardLabel}>{translations.step5.cardSection.cvv}</div>
              <div className={styles.cardValue}>{cvv || "123"}</div>
            </div>
          </div>

          <div className={styles.saveCard}>
            <span>{translations.step5.cardSection.saveCard}</span>
          </div>
        </div>
      </div>
    </div>
  );
}