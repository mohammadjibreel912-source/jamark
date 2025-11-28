import React, { createContext, useState, useEffect } from "react";
import ar from "../translations/ar";
import en from "../translations/en";

// Key used for storing the language in localStorage
const LANGUAGE_STORAGE_KEY = "appLanguage";

// Function to safely get the initial language from localStorage
const getInitialLanguage = () => {
  // 1. Check if window and localStorage are available
  if (
    typeof window !== "undefined" &&
    localStorage.getItem(LANGUAGE_STORAGE_KEY)
  ) {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  }
  // 2. Default to 'en' as requested
  return "en";
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Initialize state using the function to read from localStorage
  const [language, setCurrentLanguage] = useState(getInitialLanguage);

  // Set the language in state and update localStorage
  const setLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
  };

  const translations = language === "ar" ? ar : en;

  const toggleLanguage = () => {
    // Determine the new language
    const newLang = language === "ar" ? "en" : "ar";
    // Use the updated setLanguage function to handle both state and localStorage
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translations, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
