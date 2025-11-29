import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Registration.module.css";

import logoImg from "../src/assets/logo.png";
import backgroundImg from "../src/assets/7d9b9ef5-7dca-4d13-861a-57702efa2f45.jpg";
import { LanguageContext } from "../context/LanguageContext";

const Registration = () => {
  const { translations, language } = useContext(LanguageContext);
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <>
      <div
        className={styles["registration-wrapper"]}
        style={{ backgroundImage: `url(${backgroundImg})` }}
        dir={dir}
      >
        <img src={logoImg} alt="Logo" className={styles["registration-logo"]} />

        <div className={styles["registration-card"]}>
          <h2 className={styles["registration-title"]}>
            {translations.registration.title}
          </h2>

          <div className={styles["form-group"]}>
            <label>
              {translations.registration.name}{" "}
              <span className={styles["required-star"]}>*</span>
            </label>
            <input type="text" placeholder={translations.registration.name} />
          </div>

          <div className={styles["form-group"]}>
            <label>
              {translations.registration.email}{" "}
              <span className={styles["required-star"]}>*</span>
            </label>
            <input type="email" placeholder="example@mail.com" />
          </div>

          <div className={styles["form-group"]}>
            <label>
              {translations.registration.phone}{" "}
              <span className={styles["required-star"]}>*</span>
            </label>
            <input type="text" placeholder="07XXXXXXXX" />
          </div>

          <div className={styles["form-group"]}>
            <label>
              {translations.registration.password}{" "}
              <span className={styles["required-star"]}>*</span>
            </label>
            <input type="password" placeholder="*******" />
          </div>

          <div className={styles["form-group"]}>
            <label>
              {translations.registration.confirmPassword}{" "}
              <span className={styles["required-star"]}>*</span>
            </label>
            <input type="password" placeholder="*******" />
          </div>

          <div className={styles["bottom-text"]}>
            {translations.registration.haveAccount}
            <Link className={styles["login-link"]} to="/login">
              {translations.registration.login}
            </Link>
          </div>

          <button className={styles["submit-btn"]}>
            {translations.registration.submit}
          </button>
        </div>
      </div>
    </>
  );
};

export default Registration;
