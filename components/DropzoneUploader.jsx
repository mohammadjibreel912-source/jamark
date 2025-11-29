// src/components/DropzoneUploader.jsx

import React, { useRef, useCallback } from "react";
import "../styles/DropzoneUploader.css"; 

// 1. Document Icon Component
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
    onFilesAdded, // تم تغيير الاسم ليتناسب مع Step4
    onClose,
}) => {
    const fileInputRef = useRef(null);

    // دالة تغيير الملف (عند النقر)
    const handleFileChange = useCallback((event) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files);
            onFilesAdded(newFiles); 
            event.target.value = null;
        } 
    }, [onFilesAdded]);

    const handleDropzoneClick = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // دالة سحب وإفلات الملف
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            onFilesAdded(droppedFiles);
            e.dataTransfer.clearData();
        }
    }, [onFilesAdded]);

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
                    <span className="instruction-link">إنقر لرفع الشهادات</span> أو اسحب وأفلت
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

            {/* 🛑 منطقة أزرار الإجراءات - مهمة للإغلاق */}
            <div className="action-buttons-container" style={{ textAlign: 'left', marginTop: '20px' }}>
                <button
                    type="button"
                    className="cancel-button" 
                    onClick={onClose} // يستدعي دالة إغلاق المودال الأب
                >
                    إلغاء
                </button>
            </div>
        </div>
    );
};

export default DropzoneUploader;