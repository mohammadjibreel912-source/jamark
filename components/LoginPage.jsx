import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/LoginStyles.css";
import logoImg from "../src/assets/logo.png";

const LoginPage = () => {
  const { translations, language } = useContext(LanguageContext);
  const dir = language === "ar" ? "rtl" : "ltr";

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);

  const eyePosition = language === "ar" ? { left: "10px", right: "auto" } : { right: "10px", left: "auto" };
  const inputPadding = language === "ar" ? { paddingLeft: "40px", paddingRight: "14px" } : { paddingRight: "40px", paddingLeft: "14px" };

  return (
    <div className="login-body" dir={dir}>
      <img className="login-logo" src={logoImg} alt="Logo" />
      <div className="login-wrapper">
        <div className="login-card">
          <h2>{translations.login.title}</h2>

          <div className="login-form-group">
            <label>{translations.login.email} <span className="login-required-star">*</span></label>
            <input className="login-input" type="email" placeholder="example@mail.com" />
          </div>

          <div className="login-form-group">
            <label>{translations.login.password} <span className="login-required-star">*</span></label>
            <div className="login-password-wrapper">
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                style={inputPadding}
              />
              <span
                className="login-toggle-password"
                onClick={togglePassword}
                style={eyePosition}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button className="login-btn">{translations.login.loginBtn}</button>

          <div className="login-bottom-text">
            {translations.login.noAccount}
            <Link to="/register">{translations.login.register}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
