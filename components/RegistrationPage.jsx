import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/RegistrationStyles.css";

import logoImg from "../src/assets/logo.png";
import backgroundImg from "../src/assets/7d9b9ef5-7dca-4d13-861a-57702efa2f45.jpg";
import { LanguageContext } from "../context/LanguageContext";

const RegistrationPage = () => {
  const { translations, language } = useContext(LanguageContext);
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <>

  
    <div
      className="registration-wrapper"
      style={{ backgroundImage: `url(${backgroundImg})` }}
      dir={dir}
    >

          <img src={logoImg} alt="Logo" className="registration-logo" />

      <div className="registration-card">
        <h2 className="registration-title">{translations.registration.title}</h2>

        <div className="form-group">
          <label>{translations.registration.name} <span className="required-star">*</span></label>
          <input type="text" placeholder={translations.registration.name} />
        </div>

        <div className="form-group">
          <label>{translations.registration.email} <span className="required-star">*</span></label>
          <input type="email" placeholder="example@mail.com" />
        </div>

        <div className="form-group">
          <label>{translations.registration.phone} <span className="required-star">*</span></label>
          <input type="text" placeholder="07XXXXXXXX" />
        </div>

        <div className="form-group">
          <label>{translations.registration.password} <span className="required-star">*</span></label>
          <input type="password" placeholder="*******" />
        </div>

        <div className="form-group">
          <label>{translations.registration.confirmPassword} <span className="required-star">*</span></label>
          <input type="password" placeholder="*******" />
        </div>

        <div className="bottom-text">
          {translations.registration.haveAccount}
          <Link className="login-link" to="/login">
            {translations.registration.login}
          </Link>
        </div>

        <button className="submit-btn">{translations.registration.submit}</button>
      </div>
    </div>
      </>
  );
};

export default RegistrationPage;
