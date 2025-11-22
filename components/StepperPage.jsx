import React, { useState } from "react";
import "../styles/StepperStyles.css";
import logoImg from "../src/assets/logo.png";
import iraqiIcon from "../src/assets/iraqi.png";
import foreignIcon from "../src/assets/foreign.png";
import building from "../src/assets/building.png";
import industry from "../src/assets/industry.png";
import rightRectangle from "../src/assets/RightRectangle.png";

const StepperPage = () => {
  const [step, setStep] = useState(1);
  const [topSelected, setTopSelected] = useState([]);
  const [bottomSelected, setBottomSelected] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSelect = (section, index) => {
    if(section === "top") {
      if(topSelected.includes(index)) setTopSelected(topSelected.filter(i => i !== index));
      else if(topSelected.length < 2) setTopSelected([...topSelected, index]);
    } else {
      if(bottomSelected.includes(index)) setBottomSelected(bottomSelected.filter(i => i !== index));
      else if(bottomSelected.length < 2) setBottomSelected([...bottomSelected, index]);
    }
  };

  let status = "اختر نوع المنشأة";
  if(bottomSelected.includes(0)) status = "تسجيل شركة جديدة";
  if(bottomSelected.includes(1)) status = "تسجيل مصنع جديد";

  return (
    <div className="page-wrapper">
      {/* Content */}
      <div className="content-wrapper">
        {/* Stepper */}
        <div className="stepper-wrapper">
          {[1,2,3,4,5].map(s => (
            <div 
              key={s} 
              className={`step ${s===step ? 'active' : ''} ${s<step ? 'completed' : ''}`}
            >
              <span>{s}</span>
            </div>
          ))}
          <div className="stepper-progress" style={{width: `${((step-1)/4)*100}%`}}></div>
        </div>

        {/* Step 1: اختيار نوع المنشأة */}
        {step === 1 && (
          <div className="cards-wrapper">
            <div className="row">
              <div className={`card-wrapper ${topSelected.includes(1) ? 'selected' : ''}`} onClick={()=>handleSelect("top",1)}>
                <img src={foreignIcon} alt="منشأة أجنبية" className="card-image"/>
                <div className="card-title">منشأة أجنبية</div>
              </div>
              <div className={`card-wrapper ${topSelected.includes(0) ? 'selected' : ''}`} onClick={()=>handleSelect("top",0)}>
                <img src={iraqiIcon} alt="منشأة عراقية" className="card-image"/>
                <div className="card-title">منشأة عراقية</div>
              </div>
            </div>

            <div className="row">
              <div className={`card-wrapper ${bottomSelected.includes(1) ? 'selected' : ''}`} onClick={()=>handleSelect("bottom",1)}>
                <img src={industry} alt="منشأة صناعية" className="card-image"/>
                <div className="card-title">منشأة صناعية</div>
                <div className="card-subtitle">(مصنع)</div>
              </div>
              <div className={`card-wrapper ${bottomSelected.includes(0) ? 'selected' : ''}`} onClick={()=>handleSelect("bottom",0)}>
                <img src={building} alt="منشأة غير صناعية" className="card-image"/>
                <div className="card-title">منشأة غير صناعية</div>
                <div className="card-subtitle">(شركة)</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: المعلومات الأساسية + ملخص الاختيارات */}
      {step === 2 && (
        <div
          className="main-section"
          dir="rtl"
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {/* Left side: Form */}
          <div
            className="form-section"
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <h2 style={{ textAlign: "right", marginBottom: "10px" }}>المعلومات الأساسية</h2>

            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ textAlign: "right" }}>
                الاسم <span className="required-star">*</span>
              </label>
              <input
                type="text"
                placeholder="الاسم الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", textAlign: "right", direction: "rtl", padding: "8px" }}
              />
            </div>

            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ textAlign: "right" }}>
                البريد الإلكتروني <span className="required-star">*</span>
              </label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", textAlign: "right", direction: "rtl", padding: "8px" }}
              />
            </div>

            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ textAlign: "right" }}>
                رقم الهاتف <span className="required-star">*</span>
              </label>
              <input
                type="text"
                placeholder="07XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: "100%", textAlign: "right", direction: "rtl", padding: "8px" }}
              />
            </div>
          </div>
        </div>
      )}


        {/* أزرار التالي والسابق */}
        <div className="buttons-wrapper">
          <button onClick={handleNext} disabled={step===5}>التالي</button>
          <button onClick={handlePrev} disabled={step===1}>السابق</button>
        </div>
      </div>

   


      {/* Sidebar */}
<div className="sidebar">
  <div className="sidebar-content">
    <img src={logoImg} alt="Logo" className="logo" />
    <div className="status-text">{status}</div>
    <h3>معلومات المنشأة</h3>

    {/* Container واحد للصورة والنصوص */}
    <div style={{ display: "flex", alignItems: "flex-start", direction: "rtl", gap: "10px" }}>
      {/* الصورة على اليمين */}
      <img src={rightRectangle} alt="rightRectangle" style={{ height: "50px" }} />

      {/* النصوص بجانب الصورة */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {/* اختيارات المنشأة */}
        {bottomSelected.includes(0) && <span>شركة</span>}
        {bottomSelected.includes(1) && <span>مصنع</span>}

        {/* معلومات المستخدم تظهر فقط في Step 3 */}
        {step === 3 && (
  <div
    style={{
      display: "flex",
      direction: "rtl",
      gap: "10px",
      alignItems: "stretch", // الصورة تمتد لارتفاع النصوص
    }}
  >
    {/* الصورة على اليسار */}
    <div style={{ display: "flex", alignItems: "stretch" }}>
      <img
        src={rightRectangle}
        alt="rightRectangle"
        style={{
          height: "100%", // يمتد لارتفاع النصوص
          width: "auto",
          objectFit: "cover",
        }}
      />
    </div>

    {/* النصوص بجانب الصورة */}
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
      <h3 style={{ margin: "0 0 5px 0" }}>المعلومات الأساسية</h3>
      {bottomSelected.includes(0) && <span>شركة</span>}
      {bottomSelected.includes(1) && <span>مصنع</span>}

      {name && <span>الاسم: {name}</span>}
      {email && <span>البريد الإلكتروني: {email}</span>}
      {phone && <span>رقم الهاتف: {phone}</span>}
    </div>
  </div>
)}

      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default StepperPage;
