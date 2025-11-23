import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "../../styles/step1.css";
// استبدلهم بمسارات صورك الصحيحة
import foreignIcon from "../../src/assets/foreign.png";
import iraqiIcon from "../../src/assets/iraqi.png";
import industrialIcon from "../../src/assets/industry.png";
import nonIndustrialIcon from "../../src/assets/building.png";

const Step1 = ({ topSelected, bottomSelected, handleSelect }) => {
  const { translations } = useContext(LanguageContext);

  return (
    <div className="cards-wrapper">

      {/* الصف العلوي */}
      <div className="row">

        {/* شركة أجنبية */}
        <div 
          className={`card-wrapper ${topSelected.includes(1) ? 'selected' : ''}`} 
          onClick={() => handleSelect("top", 1)}
        >
          <img src={foreignIcon} alt="foreign" className="card-icon" />
          <div className="card-title">{translations.step1.foreignCompany}</div>
        </div>

        {/* شركة عراقية */}
        <div 
          className={`card-wrapper ${topSelected.includes(0) ? 'selected' : ''}`} 
          onClick={() => handleSelect("top", 0)}
        >
          <img src={iraqiIcon} alt="iraqi" className="card-icon" />
          <div className="card-title">{translations.step1.iraqiCompany}</div>
        </div>
      </div>

      {/* الصف السفلي */}
      <div className="row">

        {/* منشأة صناعية */}
        <div 
          className={`card-wrapper ${bottomSelected.includes(1) ? 'selected' : ''}`} 
          onClick={() => handleSelect("bottom", 1)}
        >
          <img src={industrialIcon} alt="industrial" className="card-icon" />
          <div className="card-title">{translations.step1.industrial}</div>
        </div>

        {/* منشأة غير صناعية */}
        <div 
          className={`card-wrapper ${bottomSelected.includes(0) ? 'selected' : ''}`} 
          onClick={() => handleSelect("bottom", 0)}
        >
          <img src={nonIndustrialIcon} alt="non-industrial" className="card-icon" />
          <div className="card-title">{translations.step1.nonIndustrial}</div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
