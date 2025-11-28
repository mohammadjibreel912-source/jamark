import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import styles from "../../styles/step2.module.css"; 

const Step2 = ({ name, setName, email, setEmail, phone, setPhone, fieldErrors }) => {
  const { translations, language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  const isError = (fieldName) => fieldErrors[fieldName];

  const ErrorMessage = ({ fieldName }) => {
    const message = fieldErrors[fieldName];
    return message ? (
      <p className={`${styles.errorMessage} ${isRTL ? styles.rtlText : styles.ltrText}`}>
        {message}
      </p>
    ) : null;
  };

  return (
    <div
      className={styles.mainSection} 
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className={styles.formSection}> 
        <h2 className={`${styles.title} ${isRTL ? styles.rtlText : styles.ltrText}`}>
          {translations.step2.title}
        </h2>

        <div className={styles.formGroup}>
          <label className={isRTL ? styles.rtlText : styles.ltrText}>
            {translations.step2.name} <span className="required-star">*</span>
          </label>
          <input
            type="text"
            placeholder={translations.step2.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${styles.inputBase} ${isRTL ? styles.rtlInput : styles.ltrInput} ${
              isError('name') ? styles.inputError : ''
            }`}
          />
          <ErrorMessage fieldName="name" />
        </div>

        <div className={styles.formGroup}>
          <label className={isRTL ? styles.rtlText : styles.ltrText}>
            {translations.step2.email} <span className="required-star">*</span>
          </label>
          <input
            type="email"
            placeholder={translations.step2.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${styles.inputBase} ${isRTL ? styles.rtlInput : styles.ltrInput} ${
              isError('email') ? styles.inputError : ''
            }`}
          />
          <ErrorMessage fieldName="email" />
        </div>

        <div className={styles.formGroup}>
          <label className={isRTL ? styles.rtlText : styles.ltrText}>
            {translations.step2.phone} <span className="required-star">*</span>
          </label>
          <input
            type="text"
            placeholder={translations.step2.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${styles.inputBase} ${isRTL ? styles.rtlInput : styles.ltrInput} ${
              isError('phone') ? styles.inputError : ''
            }`}
          />
          <ErrorMessage fieldName="phone" />
        </div>
      </div>
    </div>
  );
};

export default Step2;