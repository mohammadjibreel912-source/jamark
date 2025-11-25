import React from "react";
import "../styles/AddressForm.css"; // ضع CSS هنا إذا أردت فصلها

const AddressForm = () => {
  return (
    <div className="container" dir="rtl">

      <div className="title">إضافة عنوان</div>

      {/* الصف الأول */}
      <div className="row">
        <div className="field">
          <label>البلد <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>المدينة <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>المنطقة <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>الشارع أو الحي <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>
      </div>

      {/* الصف الثاني */}
      <div className="row">
        <div className="field">
          <label>رقم البناية <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>الطابق <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>رقم المكتب <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>تفاصيل أخرى <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>
      </div>

      {/* الصف الثالث */}
      <div className="row">
        <div className="field">
          <label>صندوق البريد <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>الرمز البريدي <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field" style={{ width: "calc(50% - 20px)" }}>
          <label>البريد الإلكتروني <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>
      </div>

      {/* الصف الرابع */}
      <div className="row">
        <div className="field">
          <label>الهاتف <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>الفاكس <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>موبايل 1 <span className="required">*</span></label>
          <input className="basic" type="text" />
        </div>

        <div className="field">
          <label>موبايل 2</label>
          <input className="basic" type="text" />
        </div>
      </div>

      <div className="btn">إضافة</div>

    </div>
  );
};

export default AddressForm;
