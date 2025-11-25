import React from "react";
import "../styles/CertificateUpload.css";

import deleteIcon from "../src/assets/delete.png";
import wordIcon from "../src/assets/word.png";
import excelIcon from "../src/assets/excel.png";
import imgIcon from "../src/assets/img.png";
import pdfIcon from "../src/assets/pdf.png";
import plusIcon from "../src/assets/plus.png";

const CertificateUpload = () => {
  return (
    <div className="file-upload-container" dir="rtl">

      <div className="header">الشهادات الإختصاصية</div>

      <div className="file-items-grid" style={{ flexDirection: "row-reverse" }}>

        {/* إضافة ملف جديد */}
        <div className="file-item add-new">
          <img src={plusIcon} alt="إضافة" className="add-icon" />
        </div>

        {/* ملف Word */}
        <div className="file-item file-word">
          <img src={deleteIcon} className="delete-button" alt="حذف" />
          <img src={wordIcon} alt="Word" />
          <div className="file-extension">file.docx</div>
        </div>

        {/* ملف Excel */}
        <div className="file-item file-excel">
          <img src={deleteIcon} className="delete-button" alt="حذف" />
          <img src={excelIcon} alt="Excel" />
          <div className="file-extension">file.xlsx</div>
        </div>

        {/* ملف صورة */}
        <div className="file-item file-image">
          <img src={deleteIcon} className="delete-button" alt="حذف" />
          <img src={imgIcon} alt="Image" />
          <div className="file-extension">file.png</div>
        </div>

        {/* ملف PDF */}
        <div className="file-item file-pdf">
          <img src={deleteIcon} className="delete-button" alt="حذف" />
          <img src={pdfIcon} alt="PDF" />
          <div className="file-extension">file.pdf</div>
        </div>

      </div>

    </div>
  );
};

export default CertificateUpload;
