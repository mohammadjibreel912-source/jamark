import React, { useState } from "react";
import "../styles/StepperStyles.css";
import logoImg from "../src/assets/logo.png";
import sidebarBg from "../src/assets/background.jpg";
import iraqiIcon from "../src/assets/iraqi.png";
import foreignIcon from "../src/assets/foreign.png";
import building from "../src/assets/building.png";
import industry from "../src/assets/industry.png";

const StepperPage = () => {
  const [step, setStep] = useState(1);
  const [topSelected, setTopSelected] = useState([]);
  const [bottomSelected, setBottomSelected] = useState([]);

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
       <div className="stepper-wrapper">
  {[1,2,3,4,5].map(s => (
    <div 
      key={s} 
      className={`step ${s===step ? 'active' : ''} ${s<step ? 'completed' : ''}`}
    >
      <span>{s}</span> {/* ضفنا span حول الرقم */}
    </div>
  ))}
  <div className="stepper-progress" style={{width: `${((step-1)/4)*100}%`}}></div>
</div>


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

        <div className="buttons-wrapper">
          <button onClick={handleNext} disabled={step===5}>التالي</button>
          <button onClick={handlePrev} disabled={step===1}>السابق</button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-content">
          <img src={logoImg} alt="Logo" className="logo"/>
          <div className="status-text">{status}</div>
        </div>
      </div>
    </div>
  );
};

export default StepperPage;
