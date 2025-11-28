import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
<<<<<<< HEAD
import styles from "../../styles/step1.module.css"; 
=======
import "../../styles/step1.css";
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
import foreignIcon from "../../src/assets/foreign.png";
import iraqiIcon from "../../src/assets/iraqi.png";
import industrialIcon from "../../src/assets/industry.png";
import nonIndustrialIcon from "../../src/assets/building.png";
<<<<<<< HEAD

const Step1 = ({ topSelected, bottomSelected, handleSelect, submitted }) => {
const { translations } = useContext(LanguageContext);

 const isRequiredSectionMissing = (sectionSelected) => {
  return submitted && sectionSelected.length === 0;
 };

 const topErrorClass = isRequiredSectionMissing(topSelected) ? styles.errorBorder : "";
 
 const bottomErrorClass = isRequiredSectionMissing(bottomSelected) ? styles.errorBorder : "";

return (
 <div className={styles.cardsWrapper}>
   
 <div className={styles.row}>
  
  <div
  className={`${styles.cardWrapper} ${
   topSelected.includes("iraqi") ? styles.selected : topErrorClass 
  }`}
  onClick={() => handleSelect("top", "iraqi")}
  >
  <img src={iraqiIcon} alt="iraqi" className={styles.cardIcon} />
  <div className={styles.cardTitle}>{translations.step1.iraqiCompany}</div>
  </div>

  <div
  className={`${styles.cardWrapper} ${
   topSelected.includes("foreign") ? styles.selected : topErrorClass 
  }`}
  onClick={() => handleSelect("top", "foreign")}
  >
  <img src={foreignIcon} alt="foreign" className={styles.cardIcon} />
  <div className={styles.cardTitle}>{translations.step1.foreignCompany}</div>
  </div>
 </div>

 <div className={styles.row}>
  <div
  className={`${styles.cardWrapper} ${
   bottomSelected.includes("company") ? styles.selected : bottomErrorClass 
  }`}
  onClick={() => handleSelect("bottom", "company")}
  >
  <img
   src={nonIndustrialIcon}
   alt="non-industrial"
   className={styles.cardIcon}
  />
  <div className={styles.cardTitle}>
   {translations.step1.nonIndustrial}
   <span className={styles.cardSubtitle} style={{ color: '#a0a0a0' }}>
   ({translations.step1.company})
   </span>
  </div>
  </div>

  <div
  className={`${styles.cardWrapper} ${
   bottomSelected.includes("factory") ? styles.selected : bottomErrorClass 
  }`}
  onClick={() => handleSelect("bottom", "factory")}
  >
  <img src={industrialIcon} alt="industrial" className={styles.cardIcon} />
  <div className={styles.cardTitle}>
   {translations.step1.industrial}
   <span className={styles.cardSubtitle} style={{ color: '#a0a0a0' }}>
   ({translations.step1.factory})
   </span>
  </div>
  </div>
 </div>
 </div>
);
};

export default Step1;
=======
import LanguageSwitcher from "../LanguageSwitcher";

const Step1 = ({ topSelected, bottomSelected, handleSelect }) => {
  const { translations } = useContext(LanguageContext);

  return (
    <div className="cards-wrapper">
      <div className="language-switcher-wrapper">
        <LanguageSwitcher />
      </div>
      <div className="row">
        <div
          className={`card-wrapper ${
            topSelected.includes("iraqi") ? "selected" : ""
          }`}
          onClick={() => handleSelect("top", "iraqi")}
        >
          <img src={iraqiIcon} alt="iraqi" className="card-icon" />
          <div className="card-title">{translations.step1.iraqiCompany}</div>
        </div>

        <div
          className={`card-wrapper ${
            topSelected.includes("foreign") ? "selected" : ""
          }`}
          onClick={() => handleSelect("top", "foreign")}
        >
          <img src={foreignIcon} alt="foreign" className="card-icon" />
          <div className="card-title">{translations.step1.foreignCompany}</div>
        </div>
      </div>

      <div className="row">
        <div
          className={`card-wrapper ${
            bottomSelected.includes("company") ? "selected" : ""
          }`}
          onClick={() => handleSelect("bottom", "company")}
        >
          <img
            src={nonIndustrialIcon}
            alt="non-industrial"
            className="card-icon"
          />
          <div className="card-title">
            {translations.step1.nonIndustrial}
            <span className="card-subtitle light-gray">
              ({translations.step1.company})
            </span>
          </div>
        </div>

        <div
          className={`card-wrapper ${
            bottomSelected.includes("factory") ? "selected" : ""
          }`}
          onClick={() => handleSelect("bottom", "factory")}
        >
          <img src={industrialIcon} alt="industrial" className="card-icon" />
          <div className="card-title">
            {translations.step1.industrial}
            <span className="card-subtitle light-gray">
              ({translations.step1.factory})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
