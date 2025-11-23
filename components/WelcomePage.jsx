import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/WelcomePage.css";
import factoryIcon from "../src/assets/factory.png";
import companyIcon from "../src/assets/company.png";
import logoImg from "../src/assets/logo.png";
import backgroundImg from "../src/assets/7d9b9ef5-7dca-4d13-861a-57702efa2f45.jpg";
import { LanguageContext } from "../context/LanguageContext";

const WelcomePage = () => {
  const { translations, language } = useContext(LanguageContext);
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <>
          <img src={logoImg} alt="Logo" className="logo" />

   
    <div className="page-wrapper" dir={dir} style={{ backgroundImage: `url(${backgroundImg})` }}>

      <div className="card-container">
        <div className="mini-cards-wrapper">
          {/* Industrial Card */}
          <div className="mini-card">
            <div className="header">
              <img src={factoryIcon} alt="Factory Icon" className="icon" />
              <div className="title-container">
                <h3 className="title">{translations.welcome.industrial}</h3>
                <div className="sub-title">{translations.welcome.industrialSub}</div>
              </div>
            </div>

            <div className="section">
              <div className="section-title">{translations.welcome.industrialInfo}</div>
              <ul>
                {translations.welcome.factoryItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <div className="section-title">{translations.welcome.industrialDocs}</div>
              <ul>
                {translations.welcome.factoryDocs.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Non-Industrial Card */}
          <div className="mini-card">
            <div className="header">
              <img src={companyIcon} alt="Company Icon" className="icon" />
              <div className="title-container">
                <h3 className="title">{translations.welcome.nonIndustrial}</h3>
                <div className="sub-title">{translations.welcome.nonIndustrialSub}</div>
              </div>
            </div>

            <div className="section">
              <div className="section-title">{translations.welcome.nonIndustrialInfo}</div>
              <ul>
                {translations.welcome.companyItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <div className="section-title">{translations.welcome.nonIndustrialDocs}</div>
              <ul>
                {translations.welcome.companyDocs.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Link to="/stepper" className="button-link">
          {translations.welcome.startBtn}
        </Link>
      </div>
    </div>
     </>
  );
};

export default WelcomePage;
