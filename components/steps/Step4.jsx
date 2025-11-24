import React, { useEffect, useState, useContext } from "react";
import calendarIcon from "../../src/assets/calendarIcon.png";
import mapIcon from "../../src/assets/mapIcon.png";
import uploadIcon from "../../src/assets/uploadIcon.png";
import plusIcon from "../../src/assets/plusIcon.png";
import "../../styles/step4.css";
import { LookupsService } from "../../services/LookupsService";
import { LanguageContext } from "../../context/LanguageContext";

const Step4 = ({ step }) => {
  const { translations, language } = useContext(LanguageContext); // get translations & language
  const t = translations.step4;

  const [currencies, setCurrencies] = useState([]);
  const [formData, setFormData] = useState({
    factoryName: "",
    factoryLocation: "",
    certificate: null,
    specialtyCertificates: [],
    foundationYear: 1999,
    capital: 10000,
    currency: "USD",
    notes: "",
  });

  // Fetch currencies from API
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencyList = await LookupsService.getCurrencies();
        setCurrencies(currencyList || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurrencies();
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const files =
      field === "specialtyCertificates"
        ? Array.from(e.target.files)
        : e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert(t.formSubmitted);
  };

  return (
    <div className="factory-form-container" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
      <h2 className="form-title">{t.factoryDocumentation}</h2>
      <form onSubmit={handleSubmit}>
        {/* Factory Name */}
        <div className="form-field">
          <label>
            {t.factoryName} <span style={{ color: "red" }}>*</span>
          </label>
          <div className="input-with-icon-container">
            <input
              type="text"
              name="factoryName"
              placeholder={t.factoryNamePlaceholder}
              value={formData.factoryName}
              onChange={handleChange}
            />
            <img alt="plusIcon" className="input-icon" src={plusIcon} />
          </div>
        </div>

        {/* Factory Location */}
        <div className="form-field">
          <label>
            {t.factoryLocation} <span style={{ color: "red" }}>*</span>
          </label>
          <div className="input-with-icon-container">
            <img src={mapIcon} alt="map" className="input-icon" />
            <input
              type="url"
              name="factoryLocation"
              placeholder={t.factoryLocationPlaceholder}
              value={formData.factoryLocation}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Registration Certificate */}
        <div className="form-field">
          <label>
            {t.registrationCertificate} <span style={{ color: "red" }}>*</span>
          </label>
          <div className="input-with-icon-container">
            <img alt="upload" className="input-icon" src={uploadIcon} />
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "certificate")}
            />
            {formData.certificate && <span>{formData.certificate.name}</span>}
          </div>
        </div>

        {/* Specialty Certificates */}
        <div className="form-field">
          <label>
            {t.specialtyCertificates} <span style={{ color: "red" }}>*</span>
          </label>
          <div className="input-with-icon-container">
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, "specialtyCertificates")}
            />
            <img alt="plusIcon" className="input-icon" src={plusIcon} />
          </div>
          {formData.specialtyCertificates.length > 0 && (
            <div className="specialty-files-list">
              {formData.specialtyCertificates.map((file, idx) => (
                <span key={idx} className="file-chip">
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Foundation Year */}
        <div className="form-field">
          <label>
            {t.foundationYear} <span style={{ color: "red" }}>*</span>
          </label>
          <div className="input-with-icon-container">
            <img src={calendarIcon} alt="calendar" className="input-icon" />
            <input
              type="number"
              name="foundationYear"
              value={formData.foundationYear}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Capital + Currency */}
        <div className="form-field">
          <label>
            {t.capital} <span style={{ color: "red" }}>*</span>
          </label>
          <div className="capital-currency-container">
            <input
              type="number"
              name="capital"
              value={formData.capital}
              onChange={handleChange}
              className="capital-input"
              placeholder={t.capitalPlaceholder}
            />
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="currency-select"
            >
              {currencies.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="form-field">
          <label>{t.notes}</label>
          <textarea
            name="notes"
            placeholder={t.notesPlaceholder}
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

      </form>
    </div>
  );
};

export default Step4;
