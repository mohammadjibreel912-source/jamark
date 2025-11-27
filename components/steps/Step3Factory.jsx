import React, { useState, useContext, useRef, useEffect } from "react";
import deleteIcon from "../../src/assets/deleteIcon.png";
import editIcon from "../../src/assets/editIcon.png";
import { LanguageContext } from "../../context/LanguageContext";

// 🔥 مكون InfoIcon الذي يحمل كود SVG المطلوب
const InfoIcon = ({ language }) => {
  const iconColor = "#007AFF";
  const marginAdjustment =
    language === "ar" ? { marginRight: 5 } : { marginLeft: 5 };

  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: 20, minHeight: 22, ...marginAdjustment }}
    >
      <path
        d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM10 14C9.73478 14 9.48043 14.1054 9.29289 14.2929C9.10536 14.4804 9 14.7348 9 15C9 15.2652 9.10536 15.5196 9.29289 15.7071C9.48043 15.8946 9.73478 16 10 16C10.2652 16 10.5196 15.8946 10.7071 15.7071C10.8946 15.5196 11 15.2652 11 15C11 14.7348 10.8946 14.4804 10.7071 14.2929C10.5196 14.1054 10.2652 14 10 14ZM10 4.5C9.03859 4.5 8.11656 4.88192 7.43674 5.56174C6.75692 6.24156 6.375 7.16359 6.375 8.125C6.375 8.39022 6.48036 8.64457 6.66789 8.83211C6.85543 9.01964 7.10978 9.125 7.375 9.125C7.64022 9.125 7.89457 9.01964 8.08211 8.83211C8.26964 8.64457 8.375 8.39022 8.375 8.125C8.37533 7.83004 8.45594 7.54072 8.60818 7.28809C8.76043 7.03545 8.97857 6.82902 9.2392 6.69092C9.49984 6.55282 9.79316 6.48827 10.0877 6.50419C10.3822 6.52011 10.6669 6.61589 10.9111 6.78127C11.1553 6.94666 11.35 7.1754 11.4741 7.44297C11.5982 7.71054 11.6472 8.00686 11.6157 8.30014C11.5843 8.59342 11.4736 8.87261 11.2955 9.10777C11.1175 9.34292 10.8788 9.52518 10.605 9.635C9.929 9.905 9 10.597 9 11.75V12C9 12.2652 9.10536 12.5196 9.29289 12.7071C9.48043 12.8946 9.73478 13 10 13C10.2652 13 10.5196 12.8946 10.7071 12.7071C10.8946 12.5196 11 12.2652 11 12C11 11.756 11.05 11.634 11.261 11.53L11.348 11.49C12.1288 11.1759 12.776 10.6 13.1787 9.86092C13.5814 9.12188 13.7145 8.26578 13.5551 7.43938C13.3958 6.61299 12.9539 5.86776 12.3052 5.33147C11.6566 4.79518 10.8416 4.50122 10 4.5Z"
        fill={iconColor}
      />
    </svg>
  );
};

// 🔥 بيانات وهمية للمنتجات - تم إعادتها
const productsData = [
  {
    id: 1,
    name: "MacBook Pro 15",
    details:
      "معالج Apple M2 (8-core CPU)، شاشة 13.6″ بدقة 2560×1664، ذاكرة ‎256 GB SSD",
    image: "https://placehold.co/32x32",
  },
  {
    id: 2,
    name: "iPhone 15",
    details:
      "معالج A17 Pro، شاشة OLED 6.1″ بدقة 2556×1179، معدل تحديث حتى 120Hz",
    image: "https://placehold.co/32x32",
  },
  {
    id: 3,
    name: "iPad Pro",
    details:
      "جهاز لوحي فائق القوة بمعالج M4، شاشة OLED 120Hz، ذاكرة حتى 16 GB، تخزين حتى 2 TB",
    image: "https://placehold.co/32x32",
  },
];

const Step3Factory = ({
  activities = [],
  companyName,
  setCompanyName,
  activityId,
  setActivityId,
  activityName,
}) => {
  const { translations, language } = useContext(LanguageContext);
  const [selectedActivityId, setSelectedActivityId] = useState(
    activityId || activities[0]?.id || ""
  );
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [hoveredActivityId, setHoveredActivityId] = useState(null);

  const dropdownRef = useRef(null);
  const selectedActivity = activities.find(
    (activity) => activity.id === selectedActivityId
  );

  const [products, setProducts] = useState(productsData); // ⬅️ يتم تعيين الحالة هنا
  const [showPopup, setShowPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    details: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null); // الترجمات الافتراضية
  const t = translations.step3Factory || {
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
  }; // ... (بقية دوال المكون)
  const toggleDropdown = () => {
    setShowActivityDropdown((prev) => !prev);
  };

  const handleActivitySelect = (activityId) => {
    const newId = parseInt(activityId);
    setSelectedActivityId(newId);
    setActivityId(newId);
    const activity = list.find((act) => act.id === id);
    activityName = activity;
    setShowActivityDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActivityDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDeleteProduct = (id) => {
    if (
      window.confirm(
        language === "ar"
          ? "هل أنت متأكد من حذف هذا المنتج؟"
          : "Are you sure you want to delete this product?"
      )
    ) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setShowPopup(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduct || !editingProduct.name) return;
    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );

    setEditingProduct(null);
    setShowPopup(false);
  };

  const handleAddProduct = () => {
    if (!newProduct.name) return;
    const productToAdd = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name: newProduct.name,
      details:
        newProduct.details ||
        (language === "ar" ? t.productDetails : "Product Details"),
      image: newProduct.image || "https://placehold.co/32x32",
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: "", details: "", image: "" });
    setShowPopup(false);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    setEditingProduct(null);
    setNewProduct({ name: "", details: "", image: "" });
  };
  const currentProductData = editingProduct || newProduct;
  const popupTitle = editingProduct ? t.editProduct : t.addNewProduct;

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Cairo",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
           {" "}
      <form
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
        onSubmit={(e) => e.preventDefault()}
      >
               {" "}
        <h2 style={{ color: "#2E3238", fontSize: 32 }}>
                    {t.factoryInfo}       {" "}
        </h2>
                {/* Factory Name */}       {" "}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                   {" "}
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
                        {t.factoryName} <span style={{ color: "red" }}>*</span> 
                   {" "}
          </label>
                   {" "}
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
                 {" "}
        </div>
                {/* Factory Activity - Custom Dropdown */}       {" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            position: "relative",
          }}
          ref={dropdownRef}
        >
                   {" "}
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
                        {t.factoryActivity}{" "}
            <span style={{ color: "red" }}>*</span>         {" "}
          </label>
                    {/* الزر الذي يفتح القائمة (Custom Select Header) */}       
           {" "}
          <div
            onClick={toggleDropdown}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 4,
              border: "1px solid #ccc",
              cursor: "pointer",
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: selectedActivity ? "#2E3238" : "#777",
              fontSize: 14,
            }}
          >
                       {" "}
            {selectedActivity
              ? language === "ar"
                ? selectedActivity.nameAr
                : selectedActivity.name
              : t.selectActivity}
                       {" "}
            <span
              style={{
                transform: showActivityDropdown
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
                              &#9660; {/* رمز السهم لأسفل */}           {" "}
            </span>
                     {" "}
          </div>
                    {/* القائمة المنبثقة المخصصة */}         {" "}
          {showActivityDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 5px)",
                [language === "ar" ? "right" : "left"]: 0,
                width: "100%",
                zIndex: 100,
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: 4,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                maxHeight: 300,
                overflowY: "auto",
              }}
            >
                             {" "}
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => handleActivitySelect(activity.id)}
                  onMouseEnter={() => setHoveredActivityId(activity.id)}
                  onMouseLeave={() => setHoveredActivityId(null)}
                  style={{
                    padding: "8px 10px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    fontSize: 14,
                    borderBottom: "1px solid #eee",
                    background:
                      activity.id === selectedActivityId
                        ? "#f0f0ff"
                        : hoveredActivityId === activity.id
                        ? "#f5f5f5"
                        : "transparent",
                  }}
                >
                                         {" "}
                  <div style={{ fontWeight: "bold" }}>
                                               {" "}
                    {language === "ar" ? activity.nameAr : activity.name}       
                                   {" "}
                  </div>
                                         {" "}
                  {/* حاوية أيقونة المعلومات والقائمة الفرعية */}               
                         {" "}
                  {activity.examples.length > 0 && (
                    <div style={{ position: "relative", cursor: "help" }}>
                                                     {" "}
                      <InfoIcon language={language} />                         
                           {" "}
                      {/* عرض القائمة المتداخلة إذا تم التمرير على هذا النشاط */}
                                                     {" "}
                      {hoveredActivityId === activity.id && (
                        <div
                          style={{
                            position: "absolute",
                            [language === "ar" ? "left" : "right"]: "105%",
                            top: 0,
                            width: 250,
                            background: "#fff",
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            padding: 10,
                            zIndex: 101,
                          }}
                        >
                          <p
                            style={{
                              margin: "0 0 5px 0",
                              fontWeight: "bold",
                              textAlign: language === "ar" ? "right" : "left",
                            }}
                          >
                            {language === "ar"
                              ? "أمثلة الأنشطة ذات الصلة:"
                              : "Related Activity Examples:"}
                          </p>
                          <ul
                            style={{
                              margin: 0,
                              paddingInlineStart: language === "ar" ? 15 : 20,
                              listStyleType: "disc",
                              textAlign: language === "ar" ? "right" : "left",
                            }}
                          >
                            {activity.examples.map((example, index) => (
                              <li
                                key={index}
                                style={{ marginBottom: 3, fontSize: 12 }}
                              >
                                {language === "ar"
                                  ? example.nameAr
                                  : example.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                                                 {" "}
                    </div>
                  )}
                                     {" "}
                </div>
              ))}
                         {" "}
            </div>
          )}
                 {" "}
        </div>
                {/* Add Product Button */}       {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
                   {" "}
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
                        {t.productsHeader}{" "}
            <span style={{ color: "red" }}>*</span>         {" "}
          </label>
                   {" "}
          <button
            type="button"
            onClick={() => {
              setShowPopup(true);
              setEditingProduct(null);
              setNewProduct({ name: "", details: "", image: "" });
            }}
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
                        {t.addProduct}         {" "}
          </button>
                 {" "}
        </div>
                {/* Products Table */}       {" "}
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
                    {/* Header */}         {" "}
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
                       {" "}
            <div style={{ flex: 0.5, textAlign: "center" }}>
              {t.productImage}
            </div>
                       {" "}
            <div
              style={{
                flex: 1,
                textAlign: language === "ar" ? "right" : "left",
              }}
            >
              {t.productName}
            </div>
                       {" "}
            <div
              style={{
                flex: 2,
                textAlign: language === "ar" ? "right" : "left",
              }}
            >
              {t.details}
            </div>
                       {" "}
            <div style={{ flex: 0.5, textAlign: "center" }}>{t.actions}</div>   
                 {" "}
          </div>
                    {/* Rows */}         {" "}
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
                           {" "}
              <img
                src={product.image}
                alt={product.name}
                style={{ width: 40, height: 40, borderRadius: 5 }}
              />
                           {" "}
              <div
                style={{
                  flex: 1,
                  textAlign: language === "ar" ? "right" : "left",
                }}
              >
                {product.name}
              </div>
                           {" "}
              <div
                style={{
                  flex: 2,
                  textAlign: language === "ar" ? "right" : "left",
                }}
              >
                {product.details}
              </div>
                                         {" "}
              {/* الأزرار مع وظائف الحذف والتعديل */}             {" "}
              <div
                style={{
                  flex: 0.5,
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                               {" "}
                <button
                  type="button"
                  onClick={() => handleStartEdit(product)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                                   {" "}
                  <img
                    src={editIcon}
                    alt="Edit"
                    style={{ width: 20, height: 20 }}
                  />
                                 {" "}
                </button>
                               {" "}
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                                   {" "}
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    style={{ width: 20, height: 20 }}
                  />
                                 {" "}
                </button>
                             {" "}
              </div>
                         {" "}
            </div>
          ))}
                 {" "}
        </div>
                {/* Popup (Add/Edit) */}       {" "}
        {showPopup && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
                       {" "}
            <div
              style={{
                width: 591,
                padding: 35,
                background: "white",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                direction: language === "ar" ? "rtl" : "ltr",
              }}
            >
                                         {" "}
              {/* العنوان: يتغير بين "إضافة" و "تعديل" */}             {" "}
              <h2
                style={{ textAlign: "center", fontSize: 32, color: "#2E3238" }}
              >
                {popupTitle}
              </h2>
                           {" "}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 15 }}
              >
                                {/* Name */}               {" "}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}
                >
                                   {" "}
                  <label>
                    {t.productName} <span style={{ color: "red" }}>*</span>
                  </label>
                                   {" "}
                  <input
                    type="text"
                    name="name"
                    value={currentProductData.name}
                    onChange={handleChange}
                    placeholder={t.productNamePlaceholder}
                    style={{
                      height: 36,
                      padding: 7,
                      borderRadius: 4,
                      outline: "1px #E1E1E1 solid",
                      textAlign: language === "ar" ? "right" : "left",
                    }}
                  />
                                 {" "}
                </div>
                                {/* Details */}               {" "}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}
                >
                                    <label>{t.details}</label>
                                   {" "}
                  <textarea
                    name="details"
                    value={currentProductData.details}
                    onChange={handleChange}
                    placeholder={t.detailsPlaceholder}
                    rows={4}
                    style={{
                      padding: 7,
                      borderRadius: 4,
                      outline: "1px #E1E1E1 solid",
                      textAlign: language === "ar" ? "right" : "left",
                    }}
                  />
                                 {" "}
                </div>
                                {/* Image */}               {" "}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}
                >
                                    <label>{t.productImage}</label>
                                   {" "}
                  <input
                    type="text"
                    name="image"
                    value={currentProductData.image}
                    onChange={handleChange}
                    placeholder={t.imageUrlPlaceholder}
                    style={{
                      height: 36,
                      padding: 7,
                      borderRadius: 4,
                      outline: "1px #E1E1E1 solid",
                      textAlign: language === "ar" ? "right" : "left",
                    }}
                  />
                                 {" "}
                </div>
                             {" "}
              </div>
                            {/* Buttons */}             {" "}
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}
              >
                               {" "}
                <button
                  type="button"
                  onClick={handleClosePopup}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "1px solid #E1E1E1",
                    background: "#F5F5F5",
                    cursor: "pointer",
                  }}
                >
                  {t.cancel}
                </button>
                                               {" "}
                {/* الزر الرئيسي: إما إضافة أو حفظ التعديلات */}               {" "}
                <button
                  type="button"
                  onClick={editingProduct ? handleSaveEdit : handleAddProduct}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    background: "#07126B",
                    color: "#fff",
                  }}
                >
                                      {editingProduct ? t.save : t.add}         
                       {" "}
                </button>
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
        )}
             {" "}
      </form>
         {" "}
    </div>
  );
};

export default Step3Factory;
