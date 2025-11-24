import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "../../styles/step1.css";
import foreignIcon from "../../src/assets/foreign.png";
import iraqiIcon from "../../src/assets/iraqi.png";
import industrialIcon from "../../src/assets/industry.png";
import nonIndustrialIcon from "../../src/assets/building.png";

const Step1 = ({ topSelected, bottomSelected, handleSelect }) => {
  const { translations } = useContext(LanguageContext);

  return (
    <div className="cards-wrapper">
      <div className="row">
        <div
          className={`card-wrapper ${topSelected.includes("foreign") ? "selected" : ""}`}
          onClick={() => handleSelect("top", "foreign")}
        >
          <img src={foreignIcon} alt="foreign" className="card-icon" />
          <div className="card-title">{translations.step1.foreignCompany}</div>
        </div>

        <div
          className={`card-wrapper ${topSelected.includes("iraqi") ? "selected" : ""}`}
          onClick={() => handleSelect("top", "iraqi")}
        >
          <img src={iraqiIcon} alt="iraqi" className="card-icon" />
          <div className="card-title">{translations.step1.iraqiCompany}</div>
        </div>
      </div>

      <div className="row">
        <div
          className={`card-wrapper ${bottomSelected.includes("factory") ? "selected" : ""}`}
          onClick={() => handleSelect("bottom", "factory")}
        >
          <img src={industrialIcon} alt="industrial" className="card-icon" />
          <div className="card-title">{translations.step1.industrial}</div>
        </div>

        <div
          className={`card-wrapper ${bottomSelected.includes("company") ? "selected" : ""}`}
          onClick={() => handleSelect("bottom", "company")}
        >
          <img src={nonIndustrialIcon} alt="non-industrial" className="card-icon" />
          <div className="card-title">{translations.step1.nonIndustrial}</div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
