import React, { useEffect, useState, useContext } from "react";
import calendarIcon from "../../src/assets/calendarIcon.png";
import mapIcon from "../../src/assets/mapIcon.png";
import uploadIcon from "../../src/assets/uploadIcon.png";
import plusIcon from "../../src/assets/plusIcon.png";
import "../../styles/step4.css";
import { LookupsService } from "../../services/LookupsService";


import { LanguageContext } from "../../context/LanguageContext";

const Step4 = ({ step }) => {
  const { translations } = useContext(LanguageContext); // get current translations
  const t = translations.step4; // all step4 keys should be in LanguageContext

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
          setCurrencies(currencyList.map((c) => c.code) || []);
          console.log(currencyList);
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
    <div className="factory-form-container">
      <h2 className="form-title">{t.factoryDocumentation}</h2>
      <form onSubmit={handleSubmit}>
        {/* Factory Name */}
        <div className="form-field">
          <label>{t.factoryName} *</label>
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
          <label>{t.factoryLocation} *</label>
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
          <label>{t.registrationCertificate} *</label>
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
          <label>{t.specialtyCertificates} *</label>
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
          <label>{t.foundationYear} *</label>
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
       {/* Capital + Currency */}
<div className="form-field">
  <label>{t.capital} *</label>
  <div className="capital-currency-container">
    <input
      type="number"
      name="capital"
      value={formData.capital}
      onChange={handleChange}
      className="capital-input"
      placeholder="0"
    />
    <select
      name="currency"
      value={formData.currency}
      onChange={handleChange}
      className="currency-select"
    >
      {currencies.map((cur) => (
        <option key={cur.code} value={cur.code}>
          {/* عرض أيقونة + الكود */}
          {cur.icon && (
            <img
              src={baseImageUrl + cur.icon}
              alt={cur.code}
              style={{ width: 20, height: 14, marginRight: 5 }}
            />
          )}
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

        {/* Submit Button */}
       
      </form>
    </div>
  );
};

export default Step4;
