import React, { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "../../styles/Step5.css";

export default function Step5() {
  const { translations } = useContext(LanguageContext);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  // Format card number in groups of 4 digits
  const formatCardNumber = (num) =>
    num.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  return (
    <div className="page">
      <div className="grid">
        {/* Form Section */}
        <div className="form-section">
          <div className="form-title">{translations.step5.pageTitle}</div>

          <div className="field">
            <label>
              {translations.step5.cardSection.cardHolderName}{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder={translations.step5.cardSection.cardHolderNamePlaceholder}
            />
          </div>

          <div className="field">
            <label>
              {translations.step5.cardSection.cardNumber}{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder={translations.step5.cardSection.cardNumberPlaceholder}
              maxLength={19}
            />
          </div>

          <div className="inline">
            <div className="flex-1 field">
              <label>
                {translations.step5.cardSection.cvv}{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder={translations.step5.cardSection.cvvPlaceholder}
                maxLength={3}
                type="password"
              />
            </div>
            <div className="flex-1 field">
              <label>
                {translations.step5.cardSection.expiryDate}{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder={translations.step5.cardSection.expiryDatePlaceholder}
                maxLength={5}
              />
            </div>
          </div>

          <div className="save-card-bottom">
            <span>{translations.step5.cardSection.saveCard}</span>
          </div>

          {/* Invoice Summary */}
          <div className="invoice">
            <div className="invoice-header">{translations.step5.invoice.header}</div>
            <ul className="invoice-list">
              <li className="invoice-item">
                <span>{translations.step5.invoice.companyRegistration}</span>
                <span>$1000</span>
              </li>
              <li className="invoice-item">
                <span>{translations.step5.invoice.technicalSupport}</span>
                <span>$400</span>
              </li>
              <li className="invoice-item">
                <span>{translations.step5.invoice.serviceTax}</span>
                <span>$100</span>
              </li>
            </ul>
            <div className="total-row">
              <div className="total-label">{translations.step5.invoice.totalLabel}</div>
              <div className="total">$1500</div>
            </div>
          </div>
        </div>

        {/* Card Preview */}
        <div className="card">
          <div className="card-header">
            <div className="chip" />
            <div className="card-number">
              {cardNumber ? formatCardNumber(cardNumber) : translations.step5.cardSection.cardNumberPlaceholder}
            </div>
          </div>

          <div className="card-row">
            <div className="card-info">
              <div className="card-label">{translations.step5.cardSection.cardHolderName}</div>
              <div className="card-value">{cardName || translations.step5.cardSection.cardHolderNamePlaceholder}</div>
            </div>
            <div className="card-info">
              <div className="card-label">{translations.step5.cardSection.expiryDate}</div>
              <div className="card-value">{expiry || translations.step5.cardSection.expiryDatePlaceholder}</div>
            </div>
          </div>

          <div className="card-row">
            <div className="card-info">
              <div className="card-label">{translations.step5.cardSection.cvv}</div>
              <div className="card-value">{cvv || "123"}</div>
            </div>
          </div>

          <div className="save-card">
            <span>{translations.step5.cardSection.saveCard}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
