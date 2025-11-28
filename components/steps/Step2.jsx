import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
<<<<<<< HEAD
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
=======

const Step2 = ({ name, setName, email, setEmail, phone, setPhone }) => {
  const { translations, language } = useContext(LanguageContext);

  return (
    <div
      className="main-section"
      dir={language === "ar" ? "rtl" : "ltr"}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div
        className="form-section"
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <h2
          style={{
            textAlign: language === "ar" ? "right" : "left",
            marginBottom: "10px",
          }}
        >
          {translations.step2.title}
        </h2>

        <div className="form-group">
          <label style={{ textAlign: language === "ar" ? "right" : "left" }}>
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
            {translations.step2.name} <span className="required-star">*</span>
          </label>
          <input
            type="text"
            placeholder={translations.step2.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
<<<<<<< HEAD
            className={`${styles.inputBase} ${isRTL ? styles.rtlInput : styles.ltrInput} ${
              isError('name') ? styles.inputError : ''
            }`}
          />
          <ErrorMessage fieldName="name" />
        </div>

        <div className={styles.formGroup}>
          <label className={isRTL ? styles.rtlText : styles.ltrText}>
=======
            style={{
              width: "100%",
              textAlign: language === "ar" ? "right" : "left",
              direction: language === "ar" ? "rtl" : "ltr",
              padding: "8px",
            }}
          />
        </div>

        <div className="form-group">
          <label style={{ textAlign: language === "ar" ? "right" : "left" }}>
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
            {translations.step2.email} <span className="required-star">*</span>
          </label>
          <input
            type="email"
            placeholder={translations.step2.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
            className={`${styles.inputBase} ${isRTL ? styles.rtlInput : styles.ltrInput} ${
              isError('email') ? styles.inputError : ''
            }`}
          />
          <ErrorMessage fieldName="email" />
        </div>

        <div className={styles.formGroup}>
          <label className={isRTL ? styles.rtlText : styles.ltrText}>
=======
            style={{
              width: "100%",
              textAlign: language === "ar" ? "right" : "left",
              direction: language === "ar" ? "rtl" : "ltr",
              padding: "8px",
            }}
          />
        </div>

        <div className="form-group">
          <label style={{ textAlign: language === "ar" ? "right" : "left" }}>
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
            {translations.step2.phone} <span className="required-star">*</span>
          </label>
          <input
            type="text"
            placeholder={translations.step2.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
<<<<<<< HEAD
            className={`${styles.inputBase} ${isRTL ? styles.rtlInput : styles.ltrInput} ${
              isError('phone') ? styles.inputError : ''
            }`}
          />
          <ErrorMessage fieldName="phone" />
=======
            style={{
              width: "100%",
              textAlign: language === "ar" ? "right" : "left",
              direction: language === "ar" ? "rtl" : "ltr",
              padding: "8px",
            }}
          />
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Step2;
=======
export default Step2;
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
