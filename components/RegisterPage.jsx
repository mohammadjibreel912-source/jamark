import React from "react";
import "./RegisterPage.css"; // ملف CSS خارجي

function RegisterPage() {
  return (
    <div className="page">
      <img src="/logo.png" alt="Logo" className="logo" />

      <div className="main-card">
        <div className="inner-card">
          {/* Mini Card 1 */}
          <div className="mini-card">
            <div className="mini-card-header">عنوان 1</div>
            <div className="mini-card-body">
              {/* هنا محتوى النص أو الصور */}
            </div>
          </div>

          {/* Mini Card 2 */}
          <div className="mini-card">
            <div className="mini-card-header">عنوان 2</div>
            <div className="mini-card-body">
              {/* هنا محتوى النص أو الصور */}
            </div>
          </div>
        </div>

        <button className="start-button">البدء بتسجيل المنشأة</button>
      </div>
    </div>
  );
}

export default RegisterPage;
