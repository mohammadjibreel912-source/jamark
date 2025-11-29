import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/login.module.css";
import { LanguageContext } from "../context/LanguageContext.jsx";

const Login = () => {
  const { translations, language } = useContext(LanguageContext);
  const dir = language === "ar" ? "rtl" : "ltr";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const togglePassword = () => setShowPassword(prev => !prev);

  // تم إرجاع منطق التنسيق الداخلي للتعامل مع الاتجاه (RTL/LTR) لحقل كلمة المرور والعين
  const eyePosition = language === "ar" ? { left: "10px", right: "auto" } : { right: "10px", left: "auto" };
  // يتم تحديد التباعد الداخلي لترك مساحة كافية لأيقونة العين
  const inputPadding = language === "ar" ? { paddingLeft: "40px", paddingRight: "14px" } : { paddingRight: "40px", paddingLeft: "14px" };

  // مسار افتراضي لشعار

  return (
    // 🛑 استخدام styles.loginBody
    <div className={styles['login-body']} dir={dir}>
      {/* 🛑 استخدام styles.loginLogo */}
      
      {/* 🛑 استخدام styles.loginWrapper */}
      <div className={styles['login-wrapper']}>
        {/* 🛑 استخدام styles.loginCard */}
        <div className={styles['login-card']}>
          <h2>{translations.login.title}</h2>

          {/* 🛑 استخدام styles.loginFormGroup */}
          <div className={styles['login-form-group']}>
            <label>
              {translations.login.email} 
              {/* 🛑 استخدام styles.loginRequiredStar */}
              <span className={styles['login-required-star']}>*</span>
            </label>
            {/* 🛑 استخدام styles.loginInput */}
            <input 
              className={styles['login-input']} 
              type="email" 
              placeholder="example@mail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr" // البريد الإلكتروني دائماً LTR
            />
          </div>

          {/* 🛑 استخدام styles.loginFormGroup */}
          <div className={styles['login-form-group']}>
            <label>
              {translations.login.password} 
              {/* 🛑 استخدام styles.loginRequiredStar */}
              <span className={styles['login-required-star']}>*</span>
            </label>
            {/* 🛑 استخدام styles.loginPasswordWrapper */}
            <div className={styles['login-password-wrapper']}>
              {/* 🛑 استخدام styles.loginInput وتطبيق التنسيق الداخلي لـ padding */}
              <input
                className={styles['login-input']}
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                style={inputPadding}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="ltr" // كلمة المرور دائماً LTR
              />
              {/* 🛑 استخدام styles.loginTogglePassword وتطبيق التنسيق الداخلي لتحديد الموقع */}
              <span
                className={styles['login-toggle-password']}
                onClick={togglePassword}
                style={eyePosition}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* 🛑 استخدام styles.loginBtn */}
          <button className={styles['login-btn']}>{translations.login.loginBtn}</button>

          {/* 🛑 استخدام styles.loginBottomText */}
          <div className={styles['login-bottom-text']}>
            {translations.login.noAccount}
            <Link to="/register">{translations.login.register}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;