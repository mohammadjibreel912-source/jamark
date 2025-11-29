import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import styles from "../styles/OTPVerification.module.css";
import logoImg from "../src/assets/logo.png";

const OTPVerification = () => {
  const { translations, language } = useContext(LanguageContext);
  const dir = language === "ar" ? "rtl" : "ltr";

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const m = Math.floor(timer / 60).toString().padStart(2, "0");
    const s = (timer % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      className={styles.otpWrapper}
      dir={dir}
    >
      <img src={logoImg} alt="Logo" className={styles.otpLogo} />

      <div className={styles.otpCard}>
        <h2 className={styles.otpTitle}>{translations.otp.title}</h2>
        <p className={styles.otpSubtext}>{translations.otp.subtext}</p>

        <div className={styles.otpInputs}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <input key={i} maxLength="1" className={styles.otpBox} type="text" />
          ))}
        </div>

        <p className={styles.otpTimer}>
          {translations.otp.timerText} <span>{formatTime()}</span>
        </p>

        <button className={styles.otpBtn}>{translations.otp.button}</button>
      </div>
    </div>
  );
};

export default OTPVerification;