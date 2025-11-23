import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <button 
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      style={{ padding: "8px 16px", margin: "10px" }}
    >
      {language === "ar" ? "English" : "عربي"}
    </button>
  );
};

export default LanguageSwitcher;
