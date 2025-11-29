import React, { useContext } from 'react';
import styles from '../styles/AddProductForm.module.css';
import { LanguageContext } from '../context/LanguageContext';

const AddProductForm = () => {
  const { translations, language, toggleLanguage } = useContext(LanguageContext);
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <div className={styles["form-page-container-outer"]} dir={dir}>
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-150"
        >
          {translations.addProduct.languageToggle}
        </button>
      </div>

      <div className={styles["main-form-card"]}>
        
        <h2 className={styles["form-title"]}>
          {translations.addProduct.title}
        </h2>

        <form className={styles["form-fields-container"]}>
          
          <div className={styles["form-group"]}>
            <label htmlFor="productName" className={styles["form-label"]}>
              {translations.addProduct.productName}
            </label>
            <input
              type="text"
              id="productName"
              placeholder={translations.addProduct.productNamePlaceholder}
              className={styles["custom-input-style"]}
              dir={dir} 
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="details" className={styles["form-label"]}>
              {translations.addProduct.details}
            </label>
            <textarea
              id="details"
              rows={4}
              placeholder={translations.addProduct.detailsPlaceholder}
              className={styles["custom-textarea-style"]}
              dir={dir} 
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
                {translations.addProduct.productImage}
            </label>
            <label htmlFor="image-upload" className={styles["upload-area-small"]}>
                <span className={styles["upload-area-icon"]}>+</span>
                <p className={styles["upload-text"]}>{translations.addProduct.uploadImage}</p>
                <input type="file" id="image-upload" className={styles["hidden"]} accept="image/*" />
            </label>
          </div>

          <div className={styles["button-container"]}>
            <button
              type="submit"
              className={styles["submit-button"]}
            >
              {translations.addProduct.submitButton}
            </button>
          </div>
        </form>
        <style dangerouslySetInnerHTML={{__html: `.${styles.hidden} { display: none; }`}} />
      </div>
    </div>
  );
};

export default AddProductForm;