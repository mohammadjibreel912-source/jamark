import React, { useState, useEffect } from "react";
import "../styles/OTPStyles.css";

import logoImg from "../src/assets/logo.png";
import backgroundImg from "../src/assets/7d9b9ef5-7dca-4d13-861a-57702efa2f45.jpg";

const OTPVerificationPage = () => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const m = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const s = (timer % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      className="otp-wrapper"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <img src={logoImg} alt="Logo" className="otp-logo" />

      <div className="otp-card" dir="rtl">
        <h2 className="otp-title">تأكيد الحساب</h2>

        <p className="">أدخل رمز التحقق (OTP)</p>

        <div className="otp-inputs">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <input key={i} maxLength="1" className="otp-box" type="text" />
          ))}
        </div>

        <p className="otp-timer">
          إعادة الإرسال بعد <span>{formatTime()}</span>
        </p>

        <button className="otp-btn">تأكيد الحساب</button>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
