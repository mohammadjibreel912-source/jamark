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
  activityId, // يُستخدم كـ Fallback ID
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
  translations, // ✅ يجب تمرير كائن الترجمة كاملاً من الأب
  activityName, 
  companyTypeName,
  companyFormName,
  managementMethodName,
  establishmentAddress, 
  establishmentLocation, 
  foundingYear, 
  registrationCertificate, 
  additionalCertificates, 
  notes, 
  factoryProducts, 
}) => {
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
    if (
      Array.isArray(additionalCertificates) &&
      additionalCertificates.length > 0
    ) {
      return additionalCertificates.join(", ");
    }
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
                {establishmentAddress && <div>{establishmentAddress}</div>}
                {establishmentLocation && (
                  <div style={{ overflowWrap: "break-word" }}>
                    {establishmentLocation}
                  </div>
                )}
                {foundingYear && <div>{foundingYear}</div>}

                {(capital || currency) && (
                  <div>
                    <strong>{t.capitalLabel}:</strong> {capital} {currency}
                  </div>
                )}
                
                {registrationCertificate && <div>{registrationCertificate}</div>}
                {additionalCertificates && <div>{formatCertificates()}</div>}

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