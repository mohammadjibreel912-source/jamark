import React from "react";
<<<<<<< HEAD
// تأكد من وجود ملف الـ CSS
import "../styles/CertificateUpload.css"; 

// 🔥 استيراد جميع الأيقونات المطلوبة
// يجب أن تكون هذه الأيقونات متطابقة مع الأيقونات المستخدمة في المكون الثابت
import deleteIcon from "../src/assets/delete.png"; 
import wordIcon from "../src/assets/word.png";
import excelIcon from "../src/assets/excel.png"; 
import imgIcon from "../src/assets/img.png";
import pdfIcon from "../src/assets/pdf.png";
import plusIcon from "../src/assets/plus.png"; 

// دالة تحديد الأيقونة حسب نوع الملف
const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['doc', 'docx'].includes(extension)) return wordIcon;
    if (['xls', 'xlsx'].includes(extension)) return excelIcon;
    if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) return imgIcon;
    if (extension === 'pdf') return pdfIcon;
    return wordIcon; // أيقونة افتراضية
};


// استقبال الـ Props (وظائف ومصفوفة الملفات)
const CertificateUpload = ({ 
    uploadedFiles = [], 
    onOpenUploader, 
    onDeleteFile,
    // onDone: إذا كان هناك زر 'تم'
}) => {
    
    return (
        <div className="file-upload-container" dir="rtl">

            <div className="header">الشهادات الإختصاصية</div>

            {/* 🔥 تطبيق الـ Inline Style المفضل: flexDirection: "row-reverse" */}
            <div className="file-items-grid" style={{ flexDirection: "row-reverse" }}>

                {/* 1. زر إضافة ملف جديد (Add New) */}
                <div 
                    className="file-item add-new"
                    onClick={onOpenUploader} // ربط بدالة فتح المودال/الـ Uploader
                    style={{ cursor: 'pointer' }} // إضافة مؤشر ليدل على التفاعل
                >
                    <img src={plusIcon} alt="إضافة" className="add-icon" />
                    {/* يمكن إضافة نص هنا اختياريًا */}
                </div>

                {/* 2. عرض الملفات المرفوعة ديناميكياً باستخدام map */}
                {uploadedFiles.map((file, index) => (
                    <div 
                        key={index} 
                        // لتطبيق ستايل خاص لكل نوع ملف من الـ CSS (مثل file-word)
                        className={`file-item file-${file.name.split('.').pop()}`}
                    >
                        
                        {/* زر الحذف */}
                        <img 
                            src={deleteIcon} 
                            className="delete-button" 
                            alt="حذف"
                            onClick={() => onDeleteFile(file)} // ربط بدالة الحذف
                            style={{ cursor: 'pointer' }}
                        />
                        
                        {/* أيقونة الملف المناسبة */}
                        <img 
                            src={getFileIcon(file.name)} 
                            alt={file.name} 
                        />
                        
                        {/* اسم الملف */}
                        <div className="file-extension">
                            {file.name}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* إذا كان هناك زر 'تم' (onDone) */}
            {/* يمكنك إضافة زر 'تم' هنا بنفس الستايل المفضل لديك من الأمثلة السابقة إذا لزم الأمر */}

        </div>
    );
};

export default CertificateUpload;
=======
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
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
