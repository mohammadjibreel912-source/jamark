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
  const { translations, language } = useContext(LanguageContext);
  const t = translations.step3Factory || {
    // توفير ترجمات افتراضية إذا لم تكن موجودة في ملف اللغة
    factoryInfo: "معلومات المصنع",
    factoryName: "اسم المصنع",
    factoryNamePlaceholder: "كما هو في شهادة التسجيل",
    factoryActivity: "نشاط المصنع",
    selectActivity: "اختر نشاط المصنع",
    productsHeader: "المنتجات التي يقدمها المصنع",
    addProduct: "إضافة منتج",
    productImage: "صورة المنتج",
    productName: "إسم المنتج",
    details: "التفاصيل",
    actions: "إجراءات",
    addNewProduct: "إضافة منتج جديد",
    editProduct: "تعديل المنتج",
    productNamePlaceholder: "إسم المنتج",
    detailsPlaceholder: "اكتب هنا التفاصيل",
    imageUrlPlaceholder: "رابط الصورة",
    cancel: "إلغاء",
    add: "إضافة",
    save: "حفظ التعديلات",
    productDetails: "تفاصيل المنتج",
    foodIndustry: "مصانع الصناعات الغذائية",
    // هنا يجب إضافة باقي الترجمات
  }; 
  
  const [products, setProducts] = useState(productsData);
  const [showPopup, setShowPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", details: "", image: "" });
  
  // 🔥 الحالة الجديدة للمنتج الذي يتم تعديله
  const [editingProduct, setEditingProduct] = useState(null); 

  // Update newProduct state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // إذا كان هناك منتج يتم تعديله، قم بتحديث بياناته
    if (editingProduct) {
        setEditingProduct(prev => ({ ...prev, [name]: value }));
    } else {
        // إذا كان منتج جديد
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 🔥 دالة الحذف
  const handleDeleteProduct = (id) => {
    // يمكنك إضافة تأكيد الحذف هنا
    if (window.confirm(language === "ar" ? "هل أنت متأكد من حذف هذا المنتج؟" : "Are you sure you want to delete this product?")) {
        setProducts(products.filter((product) => product.id !== id));
    }
  };

  // 🔥 دالة بدء التعديل
  const handleStartEdit = (product) => {
    setEditingProduct(product); // ضع بيانات المنتج في حالة التعديل
    setShowPopup(true); // افتح النافذة المنبثقة
  };

  // 🔥 دالة حفظ التعديلات
  const handleSaveEdit = () => {
    if (!editingProduct || !editingProduct.name) return;
    
    // تحديث قائمة المنتجات
    setProducts(products.map(p => 
        p.id === editingProduct.id ? editingProduct : p
    ));

    // إغلاق و إعادة تعيين الحالات
    setEditingProduct(null);
    setShowPopup(false);
  };

  // دالة الإضافة (مُعدَّلة)
  const handleAddProduct = () => {
    if (!newProduct.name) return; // optional validation
    const productToAdd = {
      // إيجاد أعلى ID حالي لضمان عدم التكرار
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1, 
      name: newProduct.name,
      details: newProduct.details || (language === "ar" ? t.productDetails : "Product Details"),
      image: newProduct.image || "https://placehold.co/32x32",
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: "", details: "", image: "" });
    setShowPopup(false);
  };
  
  // دالة الإغلاق العامة
  const handleClosePopup = () => {
      setShowPopup(false);
      setEditingProduct(null);
      setNewProduct({ name: "", details: "", image: "" });
  };
  
  // تحديد البيانات والقيمة للعرض/الإدخال في النافذة المنبثقة
  const currentProductData = editingProduct || newProduct;
  const popupTitle = editingProduct ? t.editProduct : t.addNewProduct;

  return (
    <div style={{ padding: 20, fontFamily: "Cairo", direction: language === "ar" ? "rtl" : "ltr" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 style={{ color: "#2E3238", fontSize: 32 }}>
          {t.factoryInfo}
        </h2>

        {/* Factory Name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
            {t.factoryName} <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder={t.factoryNamePlaceholder}
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
            {t.factoryActivity} <span style={{ color: "red" }}>*</span>
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
            {/* يجب هنا استخدام بيانات Lookups الفعلية */}
            <option>{t.foodIndustry}</option> 
          </select>
        </div>

        {/* Add Product Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
            {t.productsHeader} <span style={{ color: "red" }}>*</span>
          </label>
          <button
            type="button"
            onClick={() => { setShowPopup(true); setEditingProduct(null); setNewProduct({ name: "", details: "", image: "" }); }}
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
            {t.addProduct}
          </button>
        </div>

        {/* Products Table */}
        <div style={{ borderRadius: 4, border: "1px solid #E1E1E1", background: "#FFF", display: "flex", flexDirection: "column", padding: 10, gap: 10 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, fontWeight: "bold", fontSize: 14, color: "#2E3238", borderBottom: "1px solid #E1E1E1" }}>
            <div style={{ flex: 0.5, textAlign: "center" }}>{t.productImage}</div>
            <div style={{ flex: 1, textAlign: language === "ar" ? "right" : "left" }}>{t.productName}</div>
            <div style={{ flex: 2, textAlign: language === "ar" ? "right" : "left" }}>{t.details}</div>
            <div style={{ flex: 0.5, textAlign: "center" }}>{t.actions}</div>
          </div>

          {/* Rows */}
          {products.map((product) => (
            <div key={product.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10, borderRadius: 4, background: "#FAFAFA", gap: 10 }}>
              <img src={product.image} alt={product.name} style={{ width: 40, height: 40, borderRadius: 5 }} />
              <div style={{ flex: 1, textAlign: language === "ar" ? "right" : "left" }}>{product.name}</div>
              <div style={{ flex: 2, textAlign: language === "ar" ? "right" : "left" }}>{product.details}</div>
              
              {/* 🔥 الأزرار مع وظائف الحذف والتعديل */}
              <div style={{ flex: 0.5, display: "flex", gap: 10, justifyContent: "center" }}>
                <button type="button" onClick={() => handleStartEdit(product)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                  <img src={editIcon} alt="Edit" style={{ width: 20, height: 20 }} />
                </button>
                <button type="button" onClick={() => handleDeleteProduct(product.id)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                  <img src={deleteIcon} alt="Delete" style={{ width: 20, height: 20 }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popup (Add/Edit) */}
        {showPopup && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
            <div style={{ width: 591, padding: 35, background: "white", borderRadius: 20, display: "flex", flexDirection: "column", gap: 20, direction: language === "ar" ? "rtl" : "ltr" }}>
              
              {/* العنوان: يتغير بين "إضافة" و "تعديل" */}
              <h2 style={{ textAlign: "center", fontSize: 32, color: "#2E3238" }}>{popupTitle}</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label>{t.productName} <span style={{ color: "red" }}>*</span></label>
                  <input type="text" name="name" value={currentProductData.name} onChange={handleChange} placeholder={t.productNamePlaceholder} style={{ height: 36, padding: 7, borderRadius: 4, outline: "1px #E1E1E1 solid", textAlign: language === "ar" ? "right" : "left" }} />
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label>{t.details}</label>
                  <textarea name="details" value={currentProductData.details} onChange={handleChange} placeholder={t.detailsPlaceholder} rows={4} style={{ padding: 7, borderRadius: 4, outline: "1px #E1E1E1 solid", textAlign: language === "ar" ? "right" : "left" }} />
                </div>

                {/* Image */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label>{t.productImage}</label>
                  <input type="text" name="image" value={currentProductData.image} onChange={handleChange} placeholder={t.imageUrlPlaceholder} style={{ height: 36, padding: 7, borderRadius: 4, outline: "1px #E1E1E1 solid", textAlign: language === "ar" ? "right" : "left" }} />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" onClick={handleClosePopup} style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #E1E1E1", background: "#F5F5F5", cursor: "pointer" }}>{t.cancel}</button>
                
                {/* الزر الرئيسي: إما إضافة أو حفظ التعديلات */}
                <button 
                    type="button" 
                    onClick={editingProduct ? handleSaveEdit : handleAddProduct} 
                    style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", background: "#07126B", color: "#fff" }}
                >
                    {editingProduct ? t.save : t.add}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Step3Factory;