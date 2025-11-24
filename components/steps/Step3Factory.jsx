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
  const { language } = useContext(LanguageContext);
  const [products, setProducts] = useState(productsData);
  const [showPopup, setShowPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", details: "", image: "" });

  // Update newProduct state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Add product to the list and close popup
  const handleAddProduct = () => {
    if (!newProduct.name) return; // optional validation
    const productToAdd = {
      id: products.length + 1,
      name: newProduct.name,
      details: newProduct.details || (language === "ar" ? "تفاصيل المنتج" : "Product Details"),
      image: newProduct.image || "https://placehold.co/32x32",
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: "", details: "", image: "" });
    setShowPopup(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Cairo", direction: language === "ar" ? "rtl" : "ltr" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 style={{ color: "#2E3238", fontSize: 32 }}>
          {language === "ar" ? "معلومات المصنع" : "Factory Information"}
        </h2>

        {/* Factory Name */}
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

        {/* Factory Activity */}
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
            <option>{language === "ar" ? "مصانع الصناعات الغذائية" : "Food Industry Factories"}</option>
          </select>
        </div>

        {/* Add Product Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
            {language === "ar" ? "المنتجات التي يقدمها المصنع" : "Products Offered by Factory"} <span style={{ color: "red" }}>*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowPopup(true)}
            style={{
              background: "#05BAA3",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 6,
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            {language === "ar" ? "إضافة منتج" : "Add Product"}
          </button>
        </div>

        {/* Products Table */}
        <div style={{ borderRadius: 4, border: "1px solid #E1E1E1", background: "#FFF", display: "flex", flexDirection: "column", padding: 10, gap: 10 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, fontWeight: "bold", fontSize: 14, color: "#2E3238", borderBottom: "1px solid #E1E1E1" }}>
            <div style={{ flex: 0.5, textAlign: "center" }}>{language === "ar" ? "صورة المنتج" : "Product Image"}</div>
            <div style={{ flex: 1, textAlign: "right" }}>{language === "ar" ? "إسم المنتج" : "Product Name"}</div>
            <div style={{ flex: 2, textAlign: "right" }}>{language === "ar" ? "التفاصيل" : "Details"}</div>
            <div style={{ flex: 0.5, textAlign: "center" }}>{language === "ar" ? "إجراءات" : "Actions"}</div>
          </div>

          {/* Rows */}
          {products.map((product) => (
            <div key={product.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10, borderRadius: 4, background: "#FAFAFA", gap: 10 }}>
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

        {/* Popup */}
        {showPopup && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
            <div style={{ width: 591, padding: 35, background: "white", borderRadius: 20, display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 style={{ textAlign: "center", fontSize: 32, color: "#2E3238" }}>{language === "ar" ? "إضافة منتج جديد" : "Add New Product"}</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label>{language === "ar" ? "إسم المنتج" : "Product Name"} <span style={{ color: "red" }}>*</span></label>
                  <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder={language === "ar" ? "إسم المنتج" : "Product Name"} style={{ height: 36, padding: 7, borderRadius: 4, outline: "1px #E1E1E1 solid", textAlign: "right" }} />
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label>{language === "ar" ? "التفاصيل" : "Details"}</label>
                  <textarea name="details" value={newProduct.details} onChange={handleChange} placeholder={language === "ar" ? "اكتب هنا التفاصيل" : "Write details here"} rows={4} style={{ padding: 7, borderRadius: 4, outline: "1px #E1E1E1 solid", textAlign: "right" }} />
                </div>

                {/* Image */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label>{language === "ar" ? "صورة المنتج" : "Product Image"}</label>
                  <input type="text" name="image" value={newProduct.image} onChange={handleChange} placeholder={language === "ar" ? "رابط الصورة" : "Image URL"} style={{ height: 36, padding: 7, borderRadius: 4, outline: "1px #E1E1E1 solid", textAlign: "right" }} />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" onClick={() => setShowPopup(false)} style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer" }}>{language === "ar" ? "إلغاء" : "Cancel"}</button>
                <button type="button" onClick={handleAddProduct} style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", background: "#07126B", color: "#fff" }}>{language === "ar" ? "إضافة" : "Add"}</button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Step3Factory;
