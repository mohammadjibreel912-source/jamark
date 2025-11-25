import React from 'react';
import '../styles/AddProductForm.css'; // سيتم تحديث هذا الملف الآن

const AddProductForm = () => {
  return (
    // الحاوية الخارجية
    <div className="form-page-container-outer">
      {/* بطاقة النموذج الداخلية (الآن بحجم متوسط وتوسيط) */}
      <div className="main-form-card">
        
        {/* العنوان */}
        <h2 className="form-title">
          إضافة منتج جديد
        </h2>

        {/* حاوية حقول النموذج (RTL) */}
        <form className="form-fields-container" dir="rtl">
          
          {/* حقل اسم المنتج */}
          <div className="form-group">
            {/* هنا التسمية تكون 100% عرض ومحاذاة لليمين */}
            <label htmlFor="productName" className="form-label">
              إسم المنتج
            </label>
            <input
              type="text"
              id="productName"
              placeholder="إسم المنتج"
              className="custom-input-style"
            />
          </div>

          {/* حقل التفاصيل (مساحة نصية) */}
          <div className="form-group">
            <label htmlFor="details" className="form-label">
              التفاصيل
            </label>
            <textarea
              id="details"
              rows={4}
              placeholder="اكتب هنا التفاصيل"
              className="custom-textarea-style"
            />
          </div>

          {/* قسم تحميل صورة المنتج */}
          {/* نستخدم حاوية بسيطة لضمان أن منطقة الـ Label وحقل التحميل محاذيان لليمين */}
          <div className="form-group">
            <label className="form-label">
                صورة المنتج
            </label>
            {/* منطقة التحميل ذات الحجم الأصغر */}
            <label htmlFor="image-upload" className="upload-area-small">
                <span className="upload-area-icon">+</span>
                <p className="upload-text">رفع صورة</p>
                <input type="file" id="image-upload" className="hidden" accept="image/*" />
            </label>
          </div>

          {/* زر الإرسال */}
          <div className="button-container">
            <button
              type="submit"
              className="submit-button"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;