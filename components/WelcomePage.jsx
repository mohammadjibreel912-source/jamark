import React from "react";
import "../styles/WelcomePage.css"
import factoryIcon from "../src/assets/factory.png";
import companyIcon from "../src/assets/company.png";
import logoImg from "../src/assets/logo.png";
import backgroundImg from "../src/assets/7d9b9ef5-7dca-4d13-861a-57702efa2f45.jpg";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <img src={logoImg} alt="Logo" className="logo" />

      <div className="card-container">
        <div className="mini-cards-wrapper">
          <div className="mini-card">
            <div className="header">
              <img src={factoryIcon} alt="Factory Icon" className="icon" />
              <div className="title-container">
                <h3 className="title">منشأة صناعية</h3>
                <div className="sub-title">(مصنع)</div>
              </div>
            </div>

            <div className="section">
              <div className="section-title">معلومات المصنع</div>
              <ul>
                <li>إسم المصنع</li>
                <li>موقع وعنوان المصنع</li>
                <li>سنة التأسيس</li>
                <li>رأس المال</li>
                <li>المنتجات التي يقدمها المصنع</li>
              </ul>
            </div>

            <div className="section">
              <div className="section-title">الوثائق المطلوبة</div>
              <ul>
                <li>الشهادات الإختصاصية</li>
                <li>شهادة تسجيل المصنع</li>
              </ul>
            </div>
          </div>

          <div className="mini-card">
            <div className="header">
              <img src={companyIcon} alt="Company Icon" className="icon" />
              <div className="title-container">
                <h3 className="title">منشأة غير صناعية</h3>
                <div className="sub-title">(شركة)</div>
              </div>
            </div>

            <div className="section">
              <div className="section-title">معلومات الشركة</div>
              <ul>
                <li>إسم الشركة</li>
                <li>موقع وعنوان الشركة</li>
                <li>سنة التأسيس</li>
                <li>رأس المال</li>
                <li>نوع الشركة</li>
                <li>شكل الشركة</li>
                <li>طريقة إدارة الشركة</li>
                <li>إسم المدير المفوض</li>
              </ul>
            </div>

            <div className="section">
              <div className="section-title">الوثائق المطلوبة</div>
              <ul>
                <li>الشهادات الإختصاصية</li>
                <li>شهادات تسجيل الشركة</li>
              </ul>
            </div>
          </div>
        </div>

<Link to="/stepper" className="button-link">
  البدء بتسجيل المنشأة
</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
