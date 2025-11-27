import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

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
            {translations.step2.name} <span className="required-star">*</span>
          </label>
          <input
            type="text"
            placeholder={translations.step2.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            {translations.step2.email} <span className="required-star">*</span>
          </label>
          <input
            type="email"
            placeholder={translations.step2.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {translations.step2.phone} <span className="required-star">*</span>
          </label>
          <input
            type="text"
            placeholder={translations.step2.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              textAlign: language === "ar" ? "right" : "left",
              direction: language === "ar" ? "rtl" : "ltr",
              padding: "8px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
