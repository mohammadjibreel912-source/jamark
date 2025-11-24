import React, { createContext, useState } from "react";
import ar from "../translations/ar";
import en from "../translations/en";
export const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ar"); 

  const translations = language === "ar" ? ar : en;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
