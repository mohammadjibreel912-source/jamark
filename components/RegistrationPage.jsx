import React from "react";
import { Link } from "react-router-dom";
import "../styles/RegistrationStyles.css";

import logoImg from "../src/assets/logo.png";
import backgroundImg from "../src/assets/7d9b9ef5-7dca-4d13-861a-57702efa2f45.jpg";

const RegistrationPage = () => {
  return (
    <div
      className="registration-wrapper"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <img src={logoImg} alt="Logo" className="registration-logo" />

      <div className="registration-card" dir="rtl">
        <h2 className="registration-title">إنشاء حساب جديد</h2>

        <div className="form-group">
          <label>
            الاسم <span className="required-star">*</span>
          </label>
          <input type="text" placeholder="الاسم الكامل" />
        </div>

        <div className="form-group">
          <label>
            البريد الإلكتروني <span className="required-star">*</span>
          </label>
          <input type="email" placeholder="example@mail.com" />
        </div>

        <div className="form-group">
          <label>
            رقم الهاتف <span className="required-star">*</span>
          </label>
          <input type="text" placeholder="07XXXXXXXX" />
        </div>

        <div className="form-group">
          <label>
            كلمة المرور <span className="required-star">*</span>
          </label>
          <input type="password" placeholder="*******" />
        </div>

        <div className="form-group">
          <label>
            تأكيد كلمة المرور <span className="required-star">*</span>
          </label>
          <input type="password" placeholder="*******" />
        </div>

        <div className="bottom-text">
          هل لديك حساب؟
          <Link className="login-link" to="/login">
            تسجيل الدخول
          </Link>
        </div>

        <button className="submit-btn">إنشاء حساب</button>
      </div>
    </div>
  );
};

export default RegistrationPage;
