import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Welcome.module.css"; 
import factoryIcon from "../src/assets/factory.png";
import companyIcon from "../src/assets/company.png";
import logoImg from "../src/assets/logo.png";
import backgroundImg from "../src/assets/7d9b9ef5-7dca-4d13-861a-57702efa2f45.jpg"; // يُفترض أن المسار الصحيح أصبح 'background.jpg' بناءً على ملف CSS
import { LanguageContext } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Welcome = () => {
  const { translations, language } = useContext(LanguageContext);
  const dir = language === "ar" ? "rtl" : "ltr";
  const isArabic = language === "ar";

  return (
    <>
      <img src={logoImg} alt="Logo" className={`${styles.logo} ${isArabic ? styles['logo-ar'] : styles['logo-en']}`} />
      
     

      <div className={styles['page-wrapper']} dir={dir}> 
        <div className={styles['card-container']}>
          <div className={styles['mini-cards-wrapper']}>

            {/* Industrial Card */}
            <div className={styles['mini-card']}>
              <div className={styles.header}>
                <img src={factoryIcon} alt="Factory Icon" className={styles.icon} />
                <div className={styles['title-container']}>
                  <h3 className={styles.title}>{translations.welcome.industrial}</h3>
                  <div className={styles['sub-title']}>{translations.welcome.industrialSub}</div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles['section-title']}>{translations.welcome.industrialInfo}</div>
                <ul className={styles['list-content']}> 
                  {translations.welcome.factoryItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <div className={styles['section-title']}>{translations.welcome.industrialDocs}</div>
                <ul className={styles['list-content']}> 
                  {translations.welcome.factoryDocs.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Non-Industrial Card */}
            <div className={styles['mini-card']}>
              <div className={styles.header}>
                <img src={companyIcon} alt="Company Icon" className={styles.icon} />
                <div className={styles['title-container']}>
                  <h3 className={styles.title}>{translations.welcome.nonIndustrial}</h3>
                  <div className={styles['sub-title']}>{translations.welcome.nonIndustrialSub}</div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles['section-title']}>{translations.welcome.nonIndustrialInfo}</div>
                <ul className={styles['list-content']}> 
                  {translations.welcome.companyItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <div className={styles['section-title']}>{translations.welcome.nonIndustrialDocs}</div>
                <ul className={styles['list-content']}> 
                  {translations.welcome.companyDocs.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Link to="/stepper" className={styles['button-link']}>
            {translations.welcome.startBtn}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Welcome;