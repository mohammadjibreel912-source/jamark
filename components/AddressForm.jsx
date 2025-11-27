// src/components/AddressForm.jsx

import React, { useContext, useState, useEffect } from "react";
// افترض أنك تستخدم هذا المسار للـ Context
import { LanguageContext } from "../context/LanguageContext";
import "../styles/AddressForm.css";

/**
 * نموذج لإدخال بيانات العنوان التفصيلية.
 * @param {object | null} initialData - البيانات المحفوظة مسبقًا للعنوان.
 * @param {function} onSave - دالة يتم استدعاؤها لحفظ بيانات العنوان في المكون الأب.
 * @param {function} onClose - دالة لإغلاق النافذة المنبثقة (Modal).
 */
const AddressForm = ({ onSave, onClose, initialData }) => {
  // 1. استخدام السياق لجلب الترجمات واللغة
  const { translations, language } = useContext(LanguageContext);
  const t = translations.addressForm || {};

  // 2. 🌟 تحديد الحالة الافتراضية لجميع الحقول
  const defaultAddressState = {
    country: "",
    city: "",
    area: "",
    streetOrDistrict: "",
    buildingNumber: "",
    floor: "",
    officeNumber: "",
    otherDetails: "",
    poBox: "",
    zipCode: "",
    email: "",
    phone: "",
    fax: "",
    mobile1: "",
    mobile2: "",
    summary: "", // لتجنب الأخطاء في حالة وجوده في initialData
  };

  // 3. 🔑 التعديل الرئيسي: تهيئة الحالة إما بـ initialData أو بالقيمة الافتراضية
  const [addressData, setAddressData] = useState(
    initialData || defaultAddressState
  );

  // 💡 (ملاحظة: بما أننا نستخدم initialData في useState، فإنه سيتم تحميل البيانات
  // بشكل صحيح في كل مرة يتم فيها تحميل AddressForm داخل الـ Modal.)

  // دالة لتحديث الحالة عند تغيير أي حقل
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. دالة للتعامل مع حفظ العنوان
  const handleSave = () => {
    // التحقق من الحقول الإلزامية الأساسية (البلد، المدينة، الشارع/الحي)
    if (
      !addressData.country ||
      !addressData.city ||
      !addressData.streetOrDistrict
    ) {
      alert(
        language === "ar"
          ? "الرجاء ملء الحقول الإلزامية: البلد، المدينة، الشارع أو الحي."
          : "Please fill in the required fields: Country, City, Street or District."
      );
      return;
    }

    // بناء سلسلة العنوان المختصرة (Summary)
    const addressSummary = `${addressData.country}، ${addressData.city}، ${
      addressData.streetOrDistrict
    }${
      addressData.buildingNumber
        ? `، مبنى رقم: ${addressData.buildingNumber}`
        : ""
    }`;

    // إرسال البيانات (بما في ذلك العنوان المختصر) إلى المكون الأب
    onSave({
      ...addressData,
      summary: addressSummary, // هذا المفتاح سيظهر في Step4
    });

    onClose(); // إغلاق النافذة
  };

  // دالة الإلغاء
  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="container"
      // تعيين اتجاه الكتابة بناءً على اللغة
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="title">{t.title || "إضافة عنوان"}</div>

      {/* الصف الأول */}
      <div className="row">
        <div className="field">
          <label>
            {t.country || "البلد"}{" "}
            <span className="required" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            className="basic"
            type="text"
            name="country"
            value={addressData.country}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>
            {t.city || "المدينة"}{" "}
            <span className="required" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            className="basic"
            type="text"
            name="city"
            value={addressData.city}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>{t.area || "المنطقة"}</label>
          <input
            className="basic"
            type="text"
            name="area"
            value={addressData.area}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>
            {t.streetOrDistrict || "الشارع أو الحي"}{" "}
            <span className="required" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            className="basic"
            type="text"
            name="streetOrDistrict"
            value={addressData.streetOrDistrict}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* الصف الثاني */}
      <div className="row">
        <div className="field">
          <label>{t.buildingNumber || "رقم البناية"}</label>
          <input
            className="basic"
            type="text"
            name="buildingNumber"
            value={addressData.buildingNumber}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>{t.floor || "الطابق"}</label>
          <input
            className="basic"
            type="text"
            name="floor"
            value={addressData.floor}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>{t.officeNumber || "رقم المكتب"}</label>
          <input
            className="basic"
            type="text"
            name="officeNumber"
            value={addressData.officeNumber}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>{t.otherDetails || "تفاصيل أخرى"}</label>
          <input
            className="basic"
            type="text"
            name="otherDetails"
            value={addressData.otherDetails}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* الصف الثالث */}
      <div className="row">
        <div className="field">
          <label>{t.poBox || "صندوق البريد"}</label>
          <input
            className="basic"
            type="text"
            name="poBox"
            value={addressData.poBox}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>{t.zipCode || "الرمز البريدي"}</label>
          <input
            className="basic"
            type="text"
            name="zipCode"
            value={addressData.zipCode}
            onChange={handleChange}
          />
        </div>

        <div className="field" style={{ width: "calc(50% - 20px)" }}>
          <label>{t.email || "البريد الإلكتروني"}</label>
          <input
            className="basic"
            type="text"
            name="email"
            value={addressData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* الصف الرابع */}
      <div className="row">
        <div className="field">
          <label>{t.phone || "الهاتف"}</label>
          <input
            className="basic"
            type="text"
            name="phone"
            value={addressData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>{t.fax || "الفاكس"}</label>
          <input
            className="basic"
            type="text"
            name="fax"
            value={addressData.fax}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>{t.mobile1 || "موبايل 1"}</label>
          <input
            className="basic"
            type="text"
            name="mobile1"
            value={addressData.mobile1}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>{t.mobile2 || "موبايل 2"}</label>
          <input
            className="basic"
            type="text"
            name="mobile2"
            value={addressData.mobile2}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* أزرار الحفظ والإلغاء */}
      <div
        className="button-group"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "20px",
        }}
      >
        <div className="btn primary-btn" onClick={handleSave}>
          {t.addButton || "إضافة وحفظ العنوان"}
        </div>
        <div
          className="btn secondary-btn"
          onClick={handleCancel}
          style={{
            backgroundColor: "#ccc",
            marginLeft: language === "ar" ? "0" : "10px",
            marginRight: language === "ar" ? "10px" : "0",
          }}
        >
          {language === "ar" ? "إلغاء" : "Cancel"}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
