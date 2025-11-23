import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { FaUpload } from "react-icons/fa";
import Select from "react-select";
import calendarIcon from "../../src/assets/calendarIcon.png";
import mapIcon from "../../src/assets/mapIcon.png";
import { LanguageContext } from "../../context/LanguageContext";

const Step4 = ({ currencies = [] }) => {
  const { translations } = useContext(LanguageContext);

  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [addressData, setAddressData] = useState({
    title: "",
    country: "",
    city: "",
    region: "",
    street: "",
    buildingNumber: "",
    floor: "",
    officeNumber: "",
    otherDetails: "",
    poBox: "",
    email: "",
    phone: "",
    fax: "",
    mobile1: "",
    mobile2: "",
    mapLink: "",
    registrationFile: null,
    specialtyFiles: [],
    foundingYear: null,
    capital: "",
    currency: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const files = field === "specialtyFiles" ? Array.from(e.target.files) : e.target.files[0];
    setAddressData((prev) => ({ ...prev, [field]: files }));
  };

  return (
    <div className="main-section" dir={translations.dir} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2 style={{ textAlign: translations.align }}>{translations.step4.companyDocumentation}</h2>

      {/* عنوان الشركة */}
      <div className="form-row" style={{ position: "relative", marginBottom: "10px" }}>
        <label>{translations.step4.companyAddress} <span className="required-star">*</span></label>
        <input
          type="text"
          name="title"
          className="custom-input"
          placeholder={translations.step4.companyAddressPlaceholder}
          value={addressData.title}
          onChange={handleChange}
        />
        <button className="custom-add-btn" type="button" onClick={() => setShowAddressPopup(true)}>+</button>
      </div>

      {/* موقع الشركة */}
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <img src={mapIcon} alt="map" className="input-icon" />
        <input
          type="text"
          name="mapLink"
          value={addressData.mapLink}
          onChange={handleChange}
          placeholder={translations.step4.mapLinkPlaceholder}
          className="custom-input-with-icon"
        />
      </div>

      {/* شهادة تسجيل الشركة */}
      <div className="form-row file-row" style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
        <label>{translations.step4.registrationCertificate} <span className="required-star">*</span></label>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <FaUpload style={{ color: "#28a745", fontSize: "20px" }} />
          <input type="file" onChange={(e) => handleFileChange(e, "registrationFile")} />
          {addressData.registrationFile && <span className="file-name">{addressData.registrationFile.name}</span>}
        </div>
      </div>

      {/* الشهادات الاختصاصية */}
      <div className="form-row file-row" style={{ marginBottom: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
        <label>{translations.step4.specialtyCertificates} <span className="required-star">*</span></label>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <button className="custom-add-btn" type="button">+</button>
          <input type="file" multiple onChange={(e) => handleFileChange(e, "specialtyFiles")} />
        </div>
        {addressData.specialtyFiles.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
            {addressData.specialtyFiles.map((f, i) => (
              <div key={i} className="file-chip">{f.name} ✅</div>
            ))}
          </div>
        )}
      </div>

      {/* سنة التأسيس */}
      <div className="form-row" style={{ position: "relative", marginBottom: "10px" }}>
        <label>{translations.step4.foundingYear} <span className="required-star">*</span></label>
        <DatePicker
          selected={addressData.foundingYear}
          onChange={(date) => setAddressData({ ...addressData, foundingYear: date })}
          showYearPicker
          dateFormat="yyyy"
          placeholderText={translations.step4.foundingYearPlaceholder}
          className="custom-input"
          name="foundingYear"
        />
        <img src={calendarIcon} alt="calendar" className="input-icon" />
      </div>

      {/* رأس المال + العملة */}
      <div className="capital-row">
        <input
          type="number"
          name="capital"
          className="capital-input"
          placeholder={translations.step4.capitalPlaceholder}
          value={addressData.capital}
          onChange={handleChange}
        />
        <Select
          options={currencies.map(c => ({ value: c.code, label: c.code }))}
          value={currencies.find(c => c.code === addressData.currency) && { value: addressData.currency, label: addressData.currency }}
          onChange={(selected) => setAddressData({ ...addressData, currency: selected.value })}
          className="currency-dropdown"
        />
      </div>

      {/* ملاحظات */}
      <div className="form-row" style={{ marginTop: "10px" }}>
        <label>{translations.step4.notes}</label>
        <textarea
          name="notes"
          value={addressData.notes}
          onChange={handleChange}
          placeholder={translations.step4.notesPlaceholder}
          className="custom-input"
          style={{ minHeight: "80px" }}
        />
      </div>

      {/* Popup */}
      {showAddressPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{translations.step4.addressDetails}</h3>
            <div className="popup-row">
              <input placeholder={translations.step4.companyAddress} name="title" value={addressData.title} onChange={handleChange} />
              <input placeholder={translations.step4.country} name="country" value={addressData.country} onChange={handleChange} />
              <input placeholder={translations.step4.city} name="city" value={addressData.city} onChange={handleChange} />
              <input placeholder={translations.step4.region} name="region" value={addressData.region} onChange={handleChange} />
            </div>
            <div className="popup-buttons">
              <button onClick={() => setShowAddressPopup(false)}>{translations.close}</button>
              <button onClick={() => setShowAddressPopup(false)}>{translations.save}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;
