import React, { useState, useContext, useRef, useEffect } from "react";
import deleteIcon from "../../src/assets/deleteIcon.png";
import editIcon from "../../src/assets/editIcon.png";
import { LanguageContext } from "../../context/LanguageContext";

// 🔥 مكون InfoIcon الذي يحمل كود SVG المطلوب
const InfoIcon = ({ language }) => {
    const iconColor = "#007AFF"; 
    // ضبط الهامش بناءً على اتجاه اللغة
    const marginAdjustment = language === "ar" ? { marginRight: 5 } : { marginLeft: 5 };

    return (
        <svg 
            width="20" height="22" viewBox="0 0 20 22" fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ minWidth: 20, minHeight: 22, ...marginAdjustment }}
        >
            <path d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM10 14C9.73478 14 9.48043 14.1054 9.29289 14.2929C9.10536 14.4804 9 14.7348 9 15C9 15.2652 9.10536 15.5196 9.29289 15.7071C9.48043 15.8946 9.73478 16 10 16C10.2652 16 10.5196 15.8946 10.7071 15.7071C10.8946 15.5196 11 15.2652 11 15C11 14.7348 10.8946 14.4804 10.7071 14.2929C10.5196 14.1054 10.2652 14 10 14ZM10 4.5C9.03859 4.5 8.11656 4.88192 7.43674 5.56174C6.75692 6.24156 6.375 7.16359 6.375 8.125C6.375 8.39022 6.48036 8.64457 6.66789 8.83211C6.85543 9.01964 7.10978 9.125 7.375 9.125C7.64022 9.125 7.89457 9.01964 8.08211 8.83211C8.26964 8.64457 8.375 8.39022 8.375 8.125C8.37533 7.83004 8.45594 7.54072 8.60818 7.28809C8.76043 7.03545 8.97857 6.82902 9.2392 6.69092C9.49984 6.55282 9.79316 6.48827 10.0877 6.50419C10.3822 6.52011 10.6669 6.61589 10.9111 6.78127C11.1553 6.94666 11.35 7.1754 11.4741 7.44297C11.5982 7.71054 11.6472 8.00686 11.6157 8.30014C11.5843 8.59342 11.4736 8.87261 11.2955 9.10777C11.1175 9.34292 10.8788 9.52518 10.605 9.635C9.929 9.905 9 10.597 9 11.75V12C9 12.2652 9.10536 12.5196 9.29289 12.7071C9.48043 12.8946 9.73478 13 10 13C10.2652 13 10.5196 12.8946 10.7071 12.7071C10.8946 12.5196 11 12.2652 11 12C11 11.756 11.05 11.634 11.261 11.53L11.348 11.49C12.1288 11.1759 12.776 10.6 13.1787 9.86092C13.5814 9.12188 13.7145 8.26578 13.5551 7.43938C13.3958 6.61299 12.9539 5.86776 12.3052 5.33147C11.6566 4.79518 10.8416 4.50122 10 4.5Z" fill={iconColor}/>
        </svg>
    );
};

// بيانات وهمية للمنتجات
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


const Step3Factory = ({
  activities = [], // قائمة أنشطة المصانع (الـ Lookups)
  companyName, setCompanyName, 
  activityId, setActivityId
}) => {
  const { translations, language } = useContext(LanguageContext);
  
  // حالة النشاط المحلي، مرتبطة بالـ Prop activityId
  const [selectedActivityId, setSelectedActivityId] = useState(activityId || activities[0]?.id || ""); 
  
  // حالة التحكم في ظهور قائمة الأنشطة الرئيسية المخصصة
  const [showActivityDropdown, setShowActivityDropdown] = useState(false); 

  // 🔥 حالة جديدة لتتبع الأنشطة التي يتم التمرير عليها لإظهار القائمة الفرعية (الأمثلة)
  const [hoveredActivityId, setHoveredActivityId] = useState(null); 

  // مرجع للـ Dropdown لكي نتمكن من إغلاقه عند النقر خارجياً
  const dropdownRef = useRef(null); 

  // العثور على النشاط المختار وأمثلته
  const selectedActivity = activities.find(activity => activity.id === selectedActivityId);

  const [products, setProducts] = useState(productsData);
  const [showPopup, setShowPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", details: "", image: "" });
  const [editingProduct, setEditingProduct] = useState(null); 
  
  // الترجمات الافتراضية
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
  }; 
  
  // دالة لتبديل حالة القائمة المخصصة
  const toggleDropdown = () => {
    setShowActivityDropdown(prev => !prev);
  };

  // دالة لتحديد النشاط (وتحديث الحالة الأب)
  const handleActivitySelect = (activityId) => {
    const newId = parseInt(activityId);
    setSelectedActivityId(newId);
    setActivityId(newId); // تحديث الحالة في المكون الأب
    setShowActivityDropdown(false); // أغلق القائمة بعد الاختيار
  };

  // useEffect لإغلاق القائمة عند النقر خارجياً
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
  
  // Update newProduct / editingProduct state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (editingProduct) {
        setEditingProduct(prev => ({ ...prev, [name]: value }));
    } else {
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // دالة الحذف
  const handleDeleteProduct = (id) => {
    if (window.confirm(language === "ar" ? "هل أنت متأكد من حذف هذا المنتج؟" : "Are you sure you want to delete this product?")) {
        setProducts(products.filter((product) => product.id !== id));
    }
  };

  // دالة بدء التعديل
  const handleStartEdit = (product) => {
    setEditingProduct(product); 
    setShowPopup(true); 
  };

  // دالة حفظ التعديلات
  const handleSaveEdit = () => {
    if (!editingProduct || !editingProduct.name) return;
    
    setProducts(products.map(p => 
        p.id === editingProduct.id ? editingProduct : p
    ));

    setEditingProduct(null);
    setShowPopup(false);
  };

  // دالة الإضافة
  const handleAddProduct = () => {
    if (!newProduct.name) return; 
    const productToAdd = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1, 
      name: newProduct.name,
      details: newProduct.details || (language === "ar" ? t.productDetails : "Product Details"),
      image: newProduct.image || "https://placehold.co/32x32",
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: "", details: "", image: "" });
    setShowPopup(false);
  };
  
  // دالة الإغلاق العامة للـ Popup
  const handleClosePopup = () => {
      setShowPopup(false);
      setEditingProduct(null);
      setNewProduct({ name: "", details: "", image: "" });
  };
  
  const currentProductData = editingProduct || newProduct;
  const popupTitle = editingProduct ? t.editProduct : t.addNewProduct;

  return (
    <div style={{ padding: 20, fontFamily: "Cairo", direction: language === "ar" ? "rtl" : "ltr" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: 20 }} onSubmit={(e) => e.preventDefault()}>
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
        </div>

        {/* Factory Activity - Custom Dropdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, position: 'relative' }} ref={dropdownRef}>
          <label style={{ color: "#2E3238", fontSize: 16, fontWeight: 400 }}>
            {t.factoryActivity} <span style={{ color: "red" }}>*</span>
          </label>

          {/* الزر الذي يفتح القائمة (Custom Select Header) */}
          <div 
            onClick={toggleDropdown}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 4,
              border: "1px solid #ccc",
              cursor: "pointer",
              background: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: selectedActivity ? '#2E3238' : '#777',
              fontSize: 14,
            }}
          >
            {selectedActivity 
              ? (language === "ar" ? selectedActivity.nameAr : selectedActivity.name)
              : t.selectActivity}
            <span style={{ transform: showActivityDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                &#9660; {/* رمز السهم لأسفل */}
            </span>
          </div>

          {/* القائمة المنبثقة المخصصة */}
          {showActivityDropdown && (
            <div style={{
                position: 'absolute',
                top: 'calc(100% + 5px)',
                [language === "ar" ? 'right' : 'left']: 0,
                width: '100%',
                maxWidth: 450,
                zIndex: 100,
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                maxHeight: 300,
                overflowY: 'auto',
            }}>
                {activities.map((activity) => (
                    <div 
                        key={activity.id}
                        onClick={() => handleActivitySelect(activity.id)}
                        // 🔥 تعيين الحالة عند التمرير وإلغائها عند المغادرة
                        onMouseEnter={() => setHoveredActivityId(activity.id)} 
                        onMouseLeave={() => setHoveredActivityId(null)} 
                        style={{
                            padding: '8px 10px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            fontSize: 14,
                            borderBottom: '1px solid #eee',
                            background: activity.id === selectedActivityId ? '#f0f0ff' : (hoveredActivityId === activity.id ? '#f5f5f5' : 'transparent'), // تظليل عند التمرير
                        }}
                    >
                        <div style={{ fontWeight: 'bold' }}>
                            {language === "ar" ? activity.nameAr : activity.name}
                        </div>

                        {/* حاوية أيقونة المعلومات والقائمة الفرعية */}
                        {activity.examples.length > 0 && (
                            <div style={{ position: 'relative', cursor: 'help' }}>
                                <InfoIcon language={language} />

                                {/* 🔥 عرض القائمة المتداخلة إذا تم التمرير على هذا النشاط */}
                                {hoveredActivityId === activity.id && (
                                    <div style={{
                                        position: 'absolute',
                                        // يظهر على الجانب المقابل لاتجاه الكتابة
                                        [language === "ar" ? 'left' : 'right']: '105%', 
                                        top: 0,
                                        width: 250,
                                        background: '#fff',
                                        border: '1px solid #ccc',
                                        borderRadius: 4,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                        padding: 10,
                                        zIndex: 101, // تأكد أنه يظهر فوق القائمة الرئيسية
                                    }}>
                                        
                                        <ul style={{ margin: 0, paddingInlineStart: language === "ar" ? 15 : 20, listStyleType: 'disc', textAlign: language === "ar" ? "right" : "left" }}>
                                            {activity.examples.map((example, index) => (
                                                <li key={index} style={{ marginBottom: 3, fontSize: 12 }}>
                                                    {language === "ar" ? example.nameAr : example.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
          )}
        </div>

        {/* ... (بقية مكون الجدول والـ Popup) */}
      
      </form>
    </div>
  );
};

export default Step3Factory;