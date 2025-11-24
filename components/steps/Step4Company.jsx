import React, { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "../../styles/Step4Company.css";
import plusIcon from "../../src/assets/plusIcon.png";

const Step4Company = () => {
  const { translations, language } = useContext(LanguageContext);
  const t = translations.step4;

  const [formData, setFormData] = useState({
    companyName: "",
    companyActivities: [],
    companyType: "",
    companyForm: "",
    managementMethod: "",
    managerName: "",
  });

  const [activityInput, setActivityInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleActivityAdd = () => {
    if (activityInput.trim() && !formData.companyActivities.includes(activityInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        companyActivities: [...prev.companyActivities, activityInput.trim()],
      }));
      setActivityInput("");
    }
  };

  const handleActivityRemove = (act) => {
    setFormData((prev) => ({
      ...prev,
      companyActivities: prev.companyActivities.filter((a) => a !== act),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Form Submitted:", formData);
    alert(t.formSubmitted);
  };

  return (
    <div className="company-form-container" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
      <h2 className="form-title">{t.companyInformation}</h2>

      <form onSubmit={handleSubmit}>
        {/* Company Name */}
        <div className="form-field">
          <label>
            {t.companyName} <span className="required">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            placeholder={t.companyNamePlaceholder}
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        {/* Company Activities */}
        <div className="form-field">
          <label>
            {t.companyActivities} <span className="required">*</span>
          </label>
          <div className="input-with-icon-container">
            <input
              type="text"
              placeholder={t.activityPlaceholder}
              value={activityInput}
              onChange={(e) => setActivityInput(e.target.value)}
            />
            <img
              alt="plusIcon"
              className="input-icon"
              src={plusIcon}
              onClick={handleActivityAdd}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="activities-list">
            {formData.companyActivities.map((act) => (
              <div key={act} className="activity-item">
                {act}
                <span className="remove-activity" onClick={() => handleActivityRemove(act)}>×</span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Type */}
        <div className="form-field">
          <label>
            {t.companyType} <span className="required">*</span>
          </label>
          <input
            type="text"
            name="companyType"
            placeholder={t.companyTypePlaceholder}
            value={formData.companyType}
            onChange={handleChange}
          />
        </div>

        {/* Company Form */}
        <div className="form-field">
          <label>{t.companyForm} <span className="required">*</span></label>
          <input
            type="text"
            name="companyForm"
            placeholder={t.companyFormPlaceholder}
            value={formData.companyForm}
            onChange={handleChange}
          />
        </div>

        {/* Management Method */}
        <div className="form-field">
          <label>{t.managementMethod} <span className="required">*</span></label>
          <input
            type="text"
            name="managementMethod"
            placeholder={t.managementMethodPlaceholder}
            value={formData.managementMethod}
            onChange={handleChange}
          />
        </div>

        {/* Manager Name */}
        <div className="form-field">
          <label>{t.managerName} <span className="required">*</span></label>
          <input
            type="text"
            name="managerName"
            placeholder={t.managerNamePlaceholder}
            value={formData.managerName}
            onChange={handleChange}
          />
        </div>

       
      </form>
    </div>
  );
};

export default Step4Company;
