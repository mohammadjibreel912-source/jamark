import React, { useState, useContext } from "react";
import deleteIcon from "../../src/assets/deleteIcon.png";
import editIcon from "../../src/assets/editIcon.png";
import { LanguageContext } from "../../context/LanguageContext";

const productsData = [
  {
    id: 1,
    name: "MacBook Pro 15",
    details: "معالج Apple M2 (8-core CPU)، شاشة 13.6″ بدقة 2560×1664، ذاكرة ‎256 GB SSD",
    image: "https://placehold.co/32x32",
  },
  {
    id: 2,
    name: "iPhone 15",
    details: "معالج A17 Pro، شاشة OLED 6.1″ بدقة 2556×1179، معدل تحديث حتى 120Hz",
    image: "https://placehold.co/32x32",
  },
  {
    id: 3,
    name: "iPad Pro",
    details: "جهاز لوحي فائق القوة بمعالج M4، شاشة OLED 120Hz، ذاكرة حتى 16 GB، تخزين حتى 2 TB",
    image: "https://placehold.co/32x32",
  },
];

const Step3Factory = () => {
  const { language } = useContext(LanguageContext); // 'en' أو 'ar'
  const [products, setProducts] = useState(productsData);

  const addProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: language === "ar" ? "منتج جديد" : "New Product",
      details: language === "ar" ? "تفاصيل المنتج" : "Product Details",
      image: "https://placehold.co/32x32",
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Cairo", direction: language === "ar" ? "rtl" : "ltr" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 style={{ color: "#2E3238", fontSize: 32 }}>
          {language === "ar" ? "معلومات المصنع" : "Factory Information"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
            {language === "ar" ? "اسم المصنع" : "Factory Name"} <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder={language === "ar" ? "كما هو في شهادة التسجيل" : "As in registration certificate"}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 4,
              border: "1px solid #ccc",
              color: "#2E3238",
              fontSize: 14,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
            {language === "ar" ? "نشاط المصنع" : "Factory Activity"} <span style={{ color: "red" }}>*</span>
          </label>
          <select
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 4,
              border: "1px solid #ccc",
              color: "#2E3238",
              fontSize: 14,
            }}
          >
            <option>
              {language === "ar" ? "مصانع الصناعات الغذائية" : "Food Industry Factories"}
            </option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
            {language === "ar" ? "المنتجات التي يقدمها المصنع" : "Products Offered by Factory"}{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <button
            type="button"
            onClick={addProduct}
            style={{
              background: "#05BAA3",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {language === "ar" ? "إضافة منتج" : "Add Product"}
          </button>
        </div>

        <div
          style={{
            borderRadius: 4,
            border: "1px solid #E1E1E1",
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            padding: 10,
            gap: 10,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              fontWeight: "bold",
              fontSize: 14,
              color: "#2E3238",
              borderBottom: "1px solid #E1E1E1",
            }}
          >
            <div style={{ flex: 0.5, textAlign: "center" }}>
              {language === "ar" ? "صورة المنتج" : "Product Image"}
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              {language === "ar" ? "إسم المنتج" : "Product Name"}
            </div>
            <div style={{ flex: 2, textAlign: "right" }}>
              {language === "ar" ? "التفاصيل" : "Details"}
            </div>
            <div style={{ flex: 0.5, textAlign: "center" }}>
              {language === "ar" ? "إجراءات" : "Actions"}
            </div>
          </div>

          {/* Rows */}
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                borderRadius: 4,
                background: "#FAFAFA",
                gap: 10,
              }}
            >
              <img src={product.image} alt={product.name} style={{ width: 40, height: 40, borderRadius: 5 }} />
              <div style={{ flex: 1 }}>{product.name}</div>
              <div style={{ flex: 2 }}>{product.details}</div>
              <div style={{ flex: 0.5, display: "flex", gap: 10, justifyContent: "center" }}>
                <button style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                  <img src={editIcon} alt="Edit" style={{ width: 20, height: 20 }} />
                </button>
                <button style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                  <img src={deleteIcon} alt="Delete" style={{ width: 20, height: 20 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Step3Factory;
