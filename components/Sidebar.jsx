import React, { useContext } from "react";
import "../styles/StepperStyles.css";
import { LanguageContext } from "../context/LanguageContext";
import TopRectangle from "../src/assets/TopRectangle.png";
import logo from "../src/assets/logo.png";

const Sidebar = ({
  step,
locationSummary, // هذه الخاصية لم يتم استخدامها في النهاية
  topSelected = [],
  bottomSelected = [],
  name,
  email,
  phone,
  companyName,
  activityId, 
  companyType,
  companyForm,
  managementMethod,
  managerName,
  isFactory,
  factoryName,
  factoryLocation, 
  foundationYear,
  capital,
  currency,
  translations, 
  activityName, 
  companyTypeName,
  companyFormName,
  managementMethodName,
  establishmentAddress, 
  establishmentLocation, // 🛑 هذه الخاصية هي الكائن الذي يسبب الخطأ
  foundingYear, 
  registrationCertificate, 
  additionalCertificates, 
  notes, 
  factoryProducts, 
}) => {

    // ملاحظة: تم حذف displayLocation = locationSummary?.address || "لم يتم التحديد"; 
    // لأن establishmentLocation هو ما نحتاجه في الخطوة 5.
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";
  const t = translations.sidebar || {}; // استخدام مفاتيح الترجمة من الكائن المُمرر

  const VerticalLine = ({ style }) => (
    <div
      style={{
        width: "4px",
        backgroundColor: "#05BAA3",
        borderRadius: "2px",
        alignSelf: "stretch",
        marginTop: "19px",
        ...style,
      }}
    />
  );

 const formatCertificates = () => {
    // 1. التحقق مما إذا كانت مصفوفة و غير فارغة
    if (
      Array.isArray(additionalCertificates) &&
      additionalCertificates.length > 0
    ) {
      // 2. تعيين اسم الخاصية التي تحمل الاسم (قد تكون name, filename, title)
      const nameKey = 'name'; // افترضنا أن اسم الخاصية هو 'name'

      // 3. تحويل مصفوفة الكائنات إلى مصفوفة من الأسماء، وتصفية أي قيم غير موجودة
      return additionalCertificates
        .map(cert => cert && typeof cert === 'object' ? cert[nameKey] : cert)
        .filter(Boolean) // تصفية القيم الفارغة (مثل null, undefined)
        .join(", ");
    }
    // 4. إذا لم تكن مصفوفة، نعرضها كما هي (قد تكون نصاً واحداً)
    return additionalCertificates;
  };
  
  const renderFactoryProducts = () => {
    if (!isFactory || !Array.isArray(factoryProducts) || factoryProducts.length === 0) {
      return null;
    }

    return (
      <div style={{ marginTop: '5px' }}>
       
        <ul style={{ margin: '0', paddingInlineStart: '20px', fontSize: '14px', listStyleType: 'disc' }}>
          {factoryProducts.map((product, index) => (
            <li key={product.id || index}>
              {product.name}
              {product.details && ` (${product.details})`}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // 💡 وظيفة مساعدة لاستخراج العنوان من الكائن
  const getLocationAddress = (locationObject) => {
    if (!locationObject) return null;
    
    // البحث عن خاصية العنوان
    if (locationObject.address) return locationObject.address;
    if (locationObject.display) return locationObject.display;
    
    // عرض الإحداثيات إذا كان العنوان غير متوفر
    const lat = locationObject.latitude || locationObject.lat;
    const lng = locationObject.longitude || locationObject.lng;

    if (lat && lng) return `${lat}, ${lng}`;
      
    return null;
  };


  return (
    <div className="sidebar" dir={isRTL ? "rtl" : "ltr"}>
      <div className="logo-container">
        <img src={logo} alt="COR Platform" className="cor-platform" />
      </div>

      <div className="sidebar-content">
        <div className="rectangle-container">
          <img
            src={TopRectangle}
            alt="Top Rectangle"
            className="rectangle-div"
          />
        </div>

        <div className="status-text">
            {isFactory ? t.mainTitleFactory : t.mainTitleCompany}
        </div>

        {step >= 2 && (
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <VerticalLine />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div>
                <div>{isFactory ? t.factory : t.company}</div>
                <div>{topSelected.includes(0) ? t.iraqi : t.foreign}</div>
              </div>
            </div>
          </div>
        )}

        {step >= 3 && (name || email || phone) && (
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <VerticalLine />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <h3 style={{ margin: 0 }}>{t.basicInfo}</h3>
              <div>
                {name && <div>{name}</div>}
                {email && <div>{email}</div>}
                {phone && <div>{phone}</div>}
              </div>
            </div>
           
          </div>
        )}

        {step >= 4 &&
          (companyName ||
            activityName ||
            companyTypeName ||
            companyFormName ||
            managementMethodName ||
            managerName ||
            factoryName ||
            factoryLocation ||
            (factoryProducts && factoryProducts.length > 0)) && ( 
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <VerticalLine />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <h3 style={{ margin: 0 }}>
                  {isFactory ? t.factoryInfo : t.companyInfo}
                </h3>

                <div>
                  {isFactory ? (
                    <>
                      {factoryName && (
                        <div>
                           {factoryName}
                        </div>
                      )}
                      
                      {factoryLocation && (
                        <div>
                          {factoryLocation}
                        </div>
                      )}
                      
                      {managerName && (
                        <div>
                         {managerName}
                        </div>
                      )}
                      
                      {(factoryProducts && factoryProducts.length > 0) && (
                        <div> {renderFactoryProducts()}</div>
                      )}
                    </>
                  ) : (
                    <>
                      {companyName && (
                        <div>
                        {companyName}
                        </div>
                      )}
                      
                      {(activityName || activityId) && ( 
                        <div>
                          {activityName || activityId}
                        </div>
                      )}
                      
                      {(companyTypeName || companyType) && (
                        <div>
                        {companyTypeName || companyType}
                        </div>
                      )}
                      
                      {(companyFormName || companyForm) && (
                        <div>
                           {companyFormName || companyForm}
                        </div>
                      )}
                      
                      {(managementMethodName || managementMethod) && (
                        <div>
                        {managementMethodName || managementMethod}
                        </div>
                      )}

                      {managerName && (
                        <div>
                          {managerName}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

    {step >= 5 && (
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <VerticalLine />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <h3 style={{ margin: 0 }}>
                {isFactory ? t.documentationTitleFactory : t.documentationTitleCompany}
            </h3>
              <div style={{ fontSize: "14px" }}>
                
                {/* 1. العنوان */}
                {establishmentAddress && <div>{establishmentAddress}</div>}
                
                {/* 2. الموقع (الإحداثيات/الخريطة) */}
                {establishmentLocation && getLocationAddress(establishmentLocation) && (
                  <div style={{ overflowWrap: "break-word" }}>
                    {getLocationAddress(establishmentLocation)}
                  </div>
                )}
                
                {/* 3. السنة وجنبها م */}
                {foundingYear && <div>{foundingYear} م</div>}

                {/* 4. رأس المال مع العملة */}
                {(capital || currency) && (
                  <div>
                    {capital} {currency}
                  </div>
                )}
                
                {/* 5. اسم الشهادة المرفوعة (شهادة التسجيل) */}
                {registrationCertificate && <div>{registrationCertificate}</div>}
                
                {/* 6. اسماء الشهادات الإضافية (مجمعة) */}
                {additionalCertificates && <div>{formatCertificates()}</div>}

                {/* 7. الملاحظات والتعليقات */}
                {notes && <div>{notes}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;