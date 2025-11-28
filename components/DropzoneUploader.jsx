// src/components/DropzoneUploader.jsx

import React, { useState, useRef } from "react";
<<<<<<< HEAD
import "../styles/DropzoneUploader.css"; 

// 1. Document Icon Component (for cleanliness)
const DocumentIcon = () => (
    <div className="document-icon-wrapper">
        {/* SVG code for the document icon */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="currentColor"
        >
            <path
                d="M24 4L24.234 4.014C24.6804 4.06665 25.0961 4.26816 25.414 4.58602C25.7318 4.90389 25.9334 5.31957 25.986 5.766L26 6V14L26.01 14.3C26.0816 15.2523 26.4915 16.1477 27.1657 16.8241C27.8399 17.5005 28.7339 17.9133 29.686 17.988L30 18H38L38.234 18.014C38.6804 18.0666 39.0961 18.2682 39.414 18.586C39.7318 18.9039 39.9334 19.3196 39.986 19.766L40 20V38C40.0001 39.5304 39.4153 41.003 38.3654 42.1165C37.3155 43.23 35.8798 43.9002 34.352 43.99L34 44H14C12.4696 44.0001 10.997 43.4153 9.88348 42.3654C8.76999 41.3155 8.09978 39.8798 8.01 38.352L8 38V10C7.99991 8.46958 8.58465 6.99697 9.63457 5.88348C10.6845 4.76999 12.1202 4.09978 13.648 4.01L14 4H24Z"
                fill="#9CA3AF"
            />
            <path d="M38 14H30L29.998 5.99799L38 14Z" fill="#9CA3AF" />
        </svg>
    </div>
);

// تمرير onSave و onClose
const DropzoneUploader = ({
    title = "الشهادات الإختصاصية",
    onSave,
    onClose,
}) => {
    // لم نعد بحاجة لـ [files, setFiles] لأننا نرسل الملفات مباشرة إلى onSave
    const fileInputRef = useRef(null);

    // 🔥 دالة تغيير الملف (عند النقر)
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files);
            
            // 💡 تنفيذ onSave مباشرة وإرسال الملفات الجديدة
            onSave(newFiles); 
            
            // تفريغ المدخل للسماح باختيار نفس الملف مرة أخرى (إن لزم الأمر)
            event.target.value = null;
        } else {
             // إذا لم يتم اختيار ملف، نغلق المودال
            onClose();
        }
    };

    const handleDropzoneClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // 🔥 دالة سحب وإفلات الملف
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            
            // 💡 تنفيذ onSave مباشرة وإرسال الملفات الجديدة
            onSave(droppedFiles);

            e.dataTransfer.clearData();
        }
    };

    return (
        <div className="upload-card-container" dir="rtl">
            {/* Header */}
            <h1 className="text-xl font-bold text-gray-800 mb-6 text-right">
                {title}
            </h1>

            {/* Dropzone Area */}
            <div
                className="dropzone-area"
                onClick={handleDropzoneClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <DocumentIcon />

                <p className="text-gray-600 text-lg mb-1">
                    <span className="instruction-link">إنقر لرفع الشهادات</span> أو اسحب
                    وأفلت
                </p>

                <p className="text-gray-400 text-sm">PDF, Excel, Word, .Else..</p>

                {/* Hidden file input */}
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* 🔥 تم حذف قائمة الملفات المختارة (Files List) */}
            {/* 🔥 تم حذف أزرار الإجراءات (Save/Cancel Buttons) */}

        </div>
    );
};

export default DropzoneUploader;
=======
import "../styles/DropzoneUploader.css"; // تأكد من أن ملف الـ CSS موجود

// 1. Document Icon Component (for cleanliness)
const DocumentIcon = () => (
  <div className="document-icon-wrapper">
    {/* SVG code for the document icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="currentColor"
    >
      <path
        d="M24 4L24.234 4.014C24.6804 4.06665 25.0961 4.26816 25.414 4.58602C25.7318 4.90389 25.9334 5.31957 25.986 5.766L26 6V14L26.01 14.3C26.0816 15.2523 26.4915 16.1477 27.1657 16.8241C27.8399 17.5005 28.7339 17.9133 29.686 17.988L30 18H38L38.234 18.014C38.6804 18.0666 39.0961 18.2682 39.414 18.586C39.7318 18.9039 39.9334 19.3196 39.986 19.766L40 20V38C40.0001 39.5304 39.4153 41.003 38.3654 42.1165C37.3155 43.23 35.8798 43.9002 34.352 43.99L34 44H14C12.4696 44.0001 10.997 43.4153 9.88348 42.3654C8.76999 41.3155 8.09978 39.8798 8.01 38.352L8 38V10C7.99991 8.46958 8.58465 6.99697 9.63457 5.88348C10.6845 4.76999 12.1202 4.09978 13.648 4.01L14 4H24Z"
        fill="#9CA3AF"
      />
      <path d="M38 14H30L29.998 5.99799L38 14Z" fill="#9CA3AF" />
    </svg>
  </div>
);

// 🔥 تمرير onSave و onClose
const DropzoneUploader = ({
  title = "الشهادات الإختصاصية",
  onSave,
  onClose,
}) => {
  // 🔥 الحالة لحفظ مصفوفة من الملفات
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      // 🔥 إضافة الملفات الجديدة إلى الملفات الموجودة
      setFiles((prev) => [...prev, ...newFiles]);
      event.target.value = null;
    }
  };

  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
      e.dataTransfer.clearData();
    }
  };

  // 🔥 دالة لحذف ملف من القائمة
  const removeFile = (fileToRemove) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  // 🔥 دالة عند الضغط على زر الحفظ (إرسال الملفات إلى Step4)
  const handleSave = () => {
    // يتم الرفع الفعلي في Step4.jsx
    onSave(files);
  };

  return (
    <div className="upload-card-container" dir="rtl">
      {/* Header */}
      <h1 className="text-xl font-bold text-gray-800 mb-6 text-right">
        {title}
      </h1>

      {/* Dropzone Area */}
      <div
        className="dropzone-area"
        onClick={handleDropzoneClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <DocumentIcon />

        <p className="text-gray-600 text-lg mb-1">
          <span className="instruction-link">إنقر لرفع الشهادات</span> أو اسحب
          وأفلت
        </p>

        <p className="text-gray-400 text-sm">PDF, Excel, Word, .Else..</p>

        {/* Hidden file input */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* 🔥 قائمة الملفات المختارة */}
      {files.length > 0 && (
        <div className="selected-files-list">
          <p className="text-gray-800 font-semibold mb-2 mt-4">
            الملفات المختارة:
          </p>
          {files.map((file, index) => (
            <div key={index} className="file-display">
              <span className="file-name">{file.name}</span>
              <button
                className="remove-file-button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(file);
                }}
              >
                إزالة
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 أزرار الإجراءات */}
      <div
        className="action-buttons-group"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          className="save-button"
          onClick={handleSave}
          disabled={files.length === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: files.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          حفظ ورفع ({files.length})
        </button>
        <button
          className="cancel-button"
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "#eee",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          إلغاء
        </button>
      </div>
    </div>
  );
};

export default DropzoneUploader;
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
