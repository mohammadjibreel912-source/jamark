import React, { useContext } from "react";
import "../styles/StepperStyles.css";
import { LanguageContext } from "../context/LanguageContext";
import TopRectangle from "../src/assets/TopRectangle.png";
import logo from "../src/assets/logo.png";

const Sidebar = ({
  step,
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
  // ===================================
  // === المتغيرات الجديدة المُضافة (للتوثيق والبيانات المالية) ===
  // ===================================
  establishmentAddress, // العنوان: "بغداد - العراق - شارع الوحدة"
  establishmentLocation, // الموقع الجغرافي: "https://maps.app.goo/..."
  foundingYear, // سنة التأسيس: "1999"
  registrationCertificate, // شهادة التسجيل الرئيسية: "Certificate of Registration-1"
  additionalCertificates, // الشهادات الإضافية: "شهادة رقم 1، شهادة رقم 2"
  notes, // الملاحظات والتعليمات: "ملاحظات وتعليمات إضافية"
  factoryProducts, // خاص بالمصنع - قائمة/نص المنتجات: "iPad Pro, iPhone 15..."
  // ===================================
}) => {
  const { language } = useContext(LanguageContext);

  const isRTL = language === "ar";

  // ====== Translations ======
  const t = {
    mainTitle: isFactory
      ? language === "ar"
        ? "تسجيل مصنع جديد"
        : "Register New Factory"
      : language === "ar"
      ? "تسجيل شركة جديدة"
      : "Register New Company",

    establishmentInfo:
      language === "ar" ? "معلومات المنشأة" : "Establishment Information",
    factory: language === "ar" ? "مصنع" : "Factory",
    company: language === "ar" ? "شركة" : "Company",
    iraqi: language === "ar" ? "عراقية" : "Iraqi",
    foreign: language === "ar" ? "أجنبية" : "Foreign",

    basicInfo: language === "ar" ? "المعلومات الأساسية" : "Basic Information",

    factoryInfo: language === "ar" ? "معلومات المصنع" : "Factory Information",
    companyInfo: language === "ar" ? "معلومات الشركة" : "Company Information",

    documentationTitle:
      language === "ar"
        ? `توثيق ${isFactory ? "المصنع" : "الشركة"}`
        : `${isFactory ? "Factory" : "Company"} Documentation`,
  };

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
    // تنسيق عرض الشهادات الإضافية
    if (
      Array.isArray(additionalCertificates) &&
      additionalCertificates.length > 0
    ) {
      return additionalCertificates.join(", ");
    }
    return additionalCertificates;
  };

  return (
    <div className="sidebar" dir={isRTL ? "rtl" : "ltr"}>
      <div className="logo-container">
        <img src={logo} alt="COR Platform" className="cor-platform" />
      </div>

      {/* Sidebar content */}
      <div className="sidebar-content">
        <div className="rectangle-container">
          <img
            src={TopRectangle}
            alt="Top Rectangle"
            className="rectangle-div"
          />
        </div>

        {/* Main Title */}
        <div className="status-text">{t.mainTitle}</div>

        {/* Step 1 → Show after going to step 2 */}

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
            {/* Text content */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div>
                <div>{isFactory ? t.factory : t.company}</div>
                <div>{bottomSelected.includes(0) ? t.iraqi : t.foreign}</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 → Show after going to step 3 */}
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
            {/* Text content */}
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

        {/* Step 3 → Show after going to step 4 */}
        {/* يُفترض أن هذا الجزء داخل المكون الأب مثل StepperPage */}
        {step >= 4 &&
          (companyName ||
            activityId ||
            companyType ||
            companyForm ||
            managementMethod ||
            managerName ||
            factoryName ||
            factoryLocation) && (
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <VerticalLine />
              {/* Text content */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {/* 1. العنوان: يتغير بناءً على isFactory */}
                <h3 style={{ margin: 0 }}>
                  {isFactory ? t.factoryInfo : t.companyInfo}
                </h3>

                <div>
                  {/* 2. حقول الشركة المشتركة */}
                  {companyName && (
                    <div>
                      {t.companyName}: {companyName}
                    </div>
                  )}
                  {activityId && (
                    <div>
                      {t.activity}: {activityId}
                    </div>
                  )}
                  {managementMethod && (
                    <div>
                      {t.managementMethod}: {managementMethod}
                    </div>
                  )}
                  {managerName && (
                    <div>
                      {t.managerName}: {managerName}
                    </div>
                  )}

                  {/* 3. حقول الشركة (إذا لم يكن مصنعاً) */}
                  {!isFactory && companyType && (
                    <div>
                      {t.companyType}: {companyType}
                    </div>
                  )}
                  {!isFactory && companyForm && (
                    <div>
                      {t.companyForm}: {companyForm}
                    </div>
                  )}

                  {/* --- فاصل --- */}

                  {/* 4. حقول المصنع (إذا كان مصنعاً) */}
                  {isFactory && (
                    <>
                      {factoryName && (
                        <div>
                          {t.factoryName}: {factoryName}
                        </div>
                      )}
                      {factoryLocation && (
                        <div>
                          {t.factoryLocation}: {factoryLocation}
                        </div>
                      )}
                      {foundationYear && (
                        <div>
                          {t.foundationYear}: {foundationYear}
                        </div>
                      )}
                      {/* عرض رأس المال والعملة معاً */}
                      {(capital || currency) && (
                        <div>
                          {t.capital}: {capital} {currency}
                        </div>
                      )}

                      {/* يمكنك إضافة حقول أخرى للمصنع هنا (مثل certificates) */}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

        {/* Step 4 → Show after going to step 5 */}
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
              <h3 style={{ margin: 0 }}>{t.documentationTitle}</h3>
              <div style={{ fontSize: "14px" }}>
                {/* تفاصيل التوثيق (من الخطوة 4) */}

                {/* عنوان المنشأة */}
                {establishmentAddress && <div>{establishmentAddress}</div>}

                {/* الموقع الجغرافي */}
                {establishmentLocation && (
                  <div style={{ overflowWrap: "break-word" }}>
                    {establishmentLocation}
                  </div>
                )}

                {/* شهادة التسجيل الرئيسية */}
                {registrationCertificate && (
                  <div>{registrationCertificate}</div>
                )}

                {/* الشهادات الإضافية */}
                {additionalCertificates && <div>{formatCertificates()}</div>}

                {/* سنة التأسيس */}
                {foundingYear && <div>{foundingYear}</div>}

                {/* رأس المال */}
                {capital && <div>{capital}</div>}

                {/* منتجات المصنع (إذا كان مصنعاً) أو الملاحظات/التعليمات */}
                {isFactory && factoryProducts && <div>{factoryProducts}</div>}
                {!isFactory && notes && <div>{notes}</div>}

                {/* إذا لم يتم عرض الملاحظات أعلاه، يتم عرضها هنا */}
                {isFactory && notes && <div>{notes}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
