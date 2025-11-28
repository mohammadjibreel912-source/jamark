// src/context/AppContext.jsx
import React, { createContext, useState } from "react";

// 1. إنشاء الـ Context
export const AppContext = createContext();

// 2. إنشاء الـ Provider
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    certificateFiles: [],
    specialFiles: [],
    // أي بيانات ثانية تريد مشاركتها بين المكونات
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
