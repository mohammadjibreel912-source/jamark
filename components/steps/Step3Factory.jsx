import React, { useState, useContext, useRef, useEffect, useCallback } from "react";
import deleteIcon from "../../src/assets/deleteIcon.png";
import editIcon from "../../src/assets/editIcon.png";
import { LanguageContext } from "../../context/LanguageContext";
import styles from "./../../styles/Step3Factory.module.css";

const UPLOAD_API_URL = "/api/Upload/upload-product-image";
const BASE_IMAGE_URL = "https://corplatform.sfo3.digitaloceanspaces.com/";

const uploadFile = async (file, maxRetries = 5) => {
    const formData = new FormData();
    formData.append('file', file);

    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            const response = await fetch(UPLOAD_API_URL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result && result.path) {
                return result.path;
            }
            throw new Error("Invalid response structure from upload API.");

        } catch (error) {
            if (attempt < maxRetries - 1) {
                const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
                attempt++;
            } else {
                console.error("Upload failed after retries:", error);
                throw new Error("File upload failed after multiple retries.");
            }
        }
    }
};

const InfoIcon = ({ language }) => {
    const iconColor = "#007AFF";
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

const Step3Factory = ({
    activities = [],
    companyName, setCompanyName,
    // 🛑 REMOVE: activityId, setActivityId (If we rely solely on companyActivities)
    companyActivities,
    setCompanyActivities,
    // ... other props
    factoryProducts, setFactoryProducts,
    fieldErrors = {}, 
}) => {
    const { translations, language } = useContext(LanguageContext);

    const t = translations.factory || {};
    const generalT = translations.step4 || {}; 
    
    // --- STATE DECLARATIONS ---
    // 💡 نستخدم companyActivities من الـ props لتحديد القيمة الأولية
    const initialActivityId = Array.isArray(companyActivities) && companyActivities.length > 0 
                                ? companyActivities[0] 
                                : (activities.length > 0 ? activities[0].id : "");
                                
    const [selectedActivityId, setSelectedActivityId] = useState(initialActivityId); 
    const [showActivityDropdown, setShowActivityDropdown] = useState(false);
    const [hoveredActivityId, setHoveredActivityId] = useState(null);

    const dropdownRef = useRef(null);
    
    const products = factoryProducts || []; 

    const [showPopup, setShowPopup] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: "", details: "", image: "" });
    const [editingProduct, setEditingProduct] = useState(null);
    
    const [fileToUpload, setFileToUpload] = useState(null); 
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    // --- END STATE DECLARATIONS ---


    const selectedActivity = activities.find(activity => activity.id === selectedActivityId);

    const toggleDropdown = () => {
        setShowActivityDropdown(prev => !prev);
    };

    const handleActivitySelect = (activityId) => {
        const newId = parseInt(activityId);
        setSelectedActivityId(newId);
        
        // 💡 CRITICAL FIX: تحديث حقل companyActivities في الـ Parent كـ مصفوفة
        if (typeof setCompanyActivities === 'function') {
            setCompanyActivities([newId]); 
        }
        
        setShowActivityDropdown(false);
    };

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
    }, []);
    
    // 💡 FIX: دالة معالجة رفع الملفات
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileToUpload(file); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFileToUpload(null);
            setImagePreviewUrl(editingProduct?.image || ''); 
        }
        setValidationErrors(prev => ({ ...prev, image: '' })); 
    };
    // ----------------------------

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        
        setValidationErrors(prev => ({ ...prev, [name]: '' }));
        
        if (editingProduct) {
            setEditingProduct(prev => ({ ...prev, [name]: value }));
        } else {
            setNewProduct((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleMainFormTextChange = (e) => {
        const { value } = e.target;
        setCompanyName(value);
    };
    
    const handleStartDelete = (product) => {
        setProductToDelete(product);
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            setFactoryProducts(products.filter((product) => product.id !== productToDelete.id));
        }
        setShowConfirmModal(false);
        setProductToDelete(null);
    };
    
    const cancelDelete = () => {
        setShowConfirmModal(false);
        setProductToDelete(null);
    };

    const handleStartEdit = (product) => {
        setEditingProduct(product);
        setNewProduct({ name: "", details: "", image: "" });
        setImagePreviewUrl(product.image); 
        setFileToUpload(null); 
        setValidationErrors({});
        setShowPopup(true);
    };

    const handleClosePopup = useCallback(() => {
        setShowPopup(false);
        setEditingProduct(null);
        setNewProduct({ name: "", details: "", image: "" });
        setFileToUpload(null);
        setImagePreviewUrl('');
        setIsSaving(false);
        setValidationErrors({});
    }, []);
    
    const validateProduct = (data) => {
        const errors = {};
        if (!data.name || data.name.trim() === "") {
            errors.name = t.modal?.requiredField || "This field is required.";
        }
        return errors;
    };

    const handleSave = async () => {
        const productData = editingProduct || newProduct;
        const errors = validateProduct(productData);
        
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        let finalImageUrl = productData.image || "https://placehold.co/32x32";

        try {
            setIsSaving(true);
            
            if (fileToUpload) {
                const path = await uploadFile(fileToUpload);
                finalImageUrl = BASE_IMAGE_URL + path;
            }

            const productToSave = {
                name: productData.name.trim(),
                details: productData.details || (language === "ar" ? t.modal?.detailsPlaceholder : "Product Details"),
                image: finalImageUrl,
            };

            if (editingProduct) {
                setFactoryProducts(products.map(p =>
                    p.id === editingProduct.id ? { ...productToSave, id: editingProduct.id } : p
                ));
            } else {
                const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                setFactoryProducts([...products, { ...productToSave, id: newId }]);
            }

            handleClosePopup();

        } catch (error) {
            console.error("Error during product image upload or save:", error);
            alert(t.modal?.uploadFailed || "Upload Failed! Please try again.");
        } finally {
            setIsSaving(false);
        }
    };
    
    const factoryNameError = fieldErrors.companyName || '';
    const activityError = fieldErrors.companyActivities || ''; 
    const productListError = fieldErrors.factoryProducts || ''; 
    
    const currentProductData = editingProduct || newProduct;
    const popupTitle = editingProduct ? t.modal?.editTitle : t.modal?.addNewTitle; 
    const directionClass = language === "ar" ? styles.rtl : styles.ltr;
    const selectedActivityClass = selectedActivity ? styles.selectedActivity : styles.unselectedActivity;

    return (
        <div className={`${styles.step3Container} ${directionClass}`}>
            <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
                <h2 className={styles.header}>
                    {t.infoTitle || generalT.factoryDocumentation || "Factory Information"}
                </h2>

                {/* --- Factory Name Input --- */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        {t.nameLabel || generalT.factoryName || "Factory Name"} <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={handleMainFormTextChange}
                        placeholder={generalT.factoryNamePlaceholder || "Enter full factory name"}
                        className={`${styles.input} ${factoryNameError ? styles.inputError : ''}`}
                    />
                    {factoryNameError && (
                        <p className={styles.validationError}>{factoryNameError}</p>
                    )}
                </div>

                {/* --- Factory Activity Dropdown --- */}
                <div className={styles.inputGroupRelative} ref={dropdownRef}>
                    <label className={styles.label}>
                        {t.activityLabel || generalT.companyActivities || "Factory Activity"} <span style={{ color: "red" }}>*</span>
                    </label>

                    <div
                        onClick={toggleDropdown}
                        className={`${styles.customSelectHeader} ${selectedActivityClass} ${activityError ? styles.inputError : ''}`}
                    >
                        {selectedActivity
                            ? (language === "ar" ? selectedActivity.nameAr : selectedActivity.name)
                            : t.selectActivityPlaceholder || "Select Activity"}
                        <span className={`${styles.dropdownArrow} ${showActivityDropdown ? styles.arrowRotated : ''}`}>
                            &#9660;
                        </span>
                    </div>

                    {activityError && (
                        <p className={styles.validationError} style={{ marginTop: '5px' }}>
                            {activityError}
                        </p>
                    )}

                    {showActivityDropdown && (
                        <div className={styles.dropdownList}>
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    onClick={(e) => {
                                       e.stopPropagation(); 
                                       handleActivitySelect(activity.id);
                                     }}
                                    onMouseEnter={() => setHoveredActivityId(activity.id)}
                                    onMouseLeave={() => setHoveredActivityId(null)}
                                    className={`${styles.dropdownItem} ${activity.id === selectedActivityId ? styles.itemSelected : ''} ${hoveredActivityId === activity.id ? styles.itemHovered : ''}`}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <div className={styles.itemText} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {language === "ar" ? activity.nameAr : activity.name}
                                    </div>

                                    {activity.examples.length > 0 && (
                                        <div className={styles.infoIconContainer} style={{ flexShrink: 0 }}>
                                            <InfoIcon language={language} />

                                            {hoveredActivityId === activity.id && (
                                                <div className={`${styles.infoTooltip} ${language === "ar" ? styles.tooltipLeft : styles.tooltipRight}`}>
                                                    <p className={styles.tooltipHeader}>
                                                        {t.relatedActivityExamples || "Related Activity Examples:"}
                                                    </p>
                                                    <ul className={styles.tooltipList}>
                                                        {activity.examples.map((example, index) => (
                                                            <li key={index} className={styles.tooltipListItem}>
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

                {/* --- Products Offered Section --- */}
                <div className={styles.productsHeaderGroup}>
                    <label className={styles.label}>
                        {t.productsHeader || "Products Offered"} <span style={{ color: "red" }}>*</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            setShowPopup(true);
                            setEditingProduct(null);
                            setNewProduct({ name: "", details: "", image: "" });
                            setImagePreviewUrl('');
                            setFileToUpload(null);
                            setValidationErrors({});
                        }}
                        className={styles.addProductButton}
                    >
                        {t.addProductButton || "Add Product"}
                    </button>
                </div>
                
                {/* Product List Error Message */}
                {productListError && (
                    <p className={styles.validationError} style={{ marginBottom: '10px' }}>
                        {productListError}
                    </p>
                )}


                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <div className={styles.colImage}>{t.modal?.imageLabel || "Image"}</div>
                        <div className={styles.colName}>{t.modal?.nameLabel || "Product Name"}</div>
                        <div className={styles.colDetails}>{t.modal?.detailsLabel || "Details"}</div>
                        <div className={styles.colActions}>{t.tableActions || "Actions"}</div>
                    </div>

                    {products.length === 0 && (
                        <div className={styles.tableEmptyRow}>
                            {t.noProducts || "No products added yet."}
                        </div>
                    )}

                    {products.map((product) => (
                        <div key={product.id} className={styles.tableRow}>
                            <img
                                src={product.image || "https://placehold.co/40x40/cccccc/333333?text=N/A"}
                                alt={product.name}
                                className={styles.productImage}
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/cccccc/333333?text=Err"; }}
                            />
                            <div className={styles.colName}>{product.name}</div>
                            <div className={styles.colDetails}>{product.details}</div>

                            <div className={styles.actionsGroup}>
                                <button type="button" onClick={() => handleStartEdit(product)} className={styles.actionButton}>
                                    <img src={editIcon} alt="Edit" className={styles.actionIcon} />
                                </button>
                                <button type="button" onClick={() => handleStartDelete(product)} className={styles.actionButton}>
                                    <img src={deleteIcon} alt="Delete" className={styles.actionIcon} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Product Add/Edit Modal (Popup) --- */}
                {showPopup && (
                    <div className={styles.modalBackdrop}>
                        <div className={`${styles.modalContent} ${directionClass}`}>

                            <h2 className={styles.modalHeader}>{popupTitle}</h2>

                            <div className={styles.modalFormBody}>
                                <div className={styles.inputGroup}>
                                    <label>{t.modal?.nameLabel || "Product Name"} <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={currentProductData.name}
                                        onChange={handleTextChange}
                                        placeholder={t.modal?.namePlaceholder || "Product Name"}
                                        className={`${styles.modalInput} ${validationErrors.name ? styles.inputError : ''}`}
                                        disabled={isSaving}
                                    />
                                    {validationErrors.name && (
                                        <p className={styles.validationError}>{validationErrors.name}</p>
                                    )}
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>{t.modal?.detailsLabel || "Details"}</label>
                                    <textarea
                                        name="details"
                                        value={currentProductData.details}
                                        onChange={handleTextChange}
                                        placeholder={t.modal?.detailsPlaceholder || "Type details here"}
                                        rows={4}
                                        className={styles.modalTextarea}
                                        disabled={isSaving}
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>{t.modal?.imageLabel || "Product Image"}</label>
                                    <div className={styles.fileInputGroup}>
                                        <input
                                            type="file"
                                            name="image"
                                            id="product-image-upload"
                                            onChange={handleFileChange}
                                            className={styles.fileInputHidden}
                                            accept="image/*"
                                            disabled={isSaving}
                                        />
                                        <label htmlFor="product-image-upload" className={styles.fileInputLabel}>
                                            {t.modal?.selectImage || "Select Image"}
                                        </label>
                                        <span className={styles.fileNameDisplay}>
                                            {fileToUpload ? fileToUpload.name : (editingProduct ? currentProductData.image.split('/').pop().substring(0, 30) : t.modal?.fileNot  || "No file selected")}
                                        </span>
                                    </div>

                                    {(imagePreviewUrl || currentProductData.image) && (
                                        <div className={styles.imagePreviewContainer}>
                                            <img
                                                src={imagePreviewUrl || currentProductData.image}
                                                alt="Product Preview"
                                                className={styles.imagePreview}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.modalButtonsGroup}>
                                <button type="button" onClick={handleClosePopup} className={styles.cancelButton} disabled={isSaving}>{t.modal?.cancel || "Cancel"}</button>

                              <button
                                type="button"
                                onClick={handleSave}
                                className={styles.primaryButton}
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg
                                            className={styles.spinner}
                                            width="20" height="20" viewBox="0 0 50 50"
                                            style={{ marginRight: language === "ar" ? 0 : 8, marginLeft: language === "ar" ? 8 : 0 }}
                                        >
                                            <circle
                                                cx="25" cy="25" r="20" fill="none"
                                                strokeWidth="5"
                                                stroke="#fff"
                                                strokeDasharray="90, 150"
                                                strokeLinecap="round"
                                                style={{ transformOrigin: '50% 50%' }}
                                            />
                                        </svg>
                                        <span>
                                            {language === "ar" ? "جاري الحفظ..." : "Saving..."}
                                        </span>
                                    </div>
                                ) : (
                                    editingProduct ? t.modal?.save || "Save Changes" : t.modal?.add || "Add"
                                )}
                              </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* --- Confirmation Modal --- */}
                {showConfirmModal && (
                    <div className={styles.modalBackdrop}>
                        <div className={`${styles.confirmModalContent} ${directionClass}`}>
                            <h2 className={styles.modalHeader}>{t.deleteConfirm?.title || "Confirm Deletion"}</h2>
                            <p className={styles.confirmMessage}>{t.deleteConfirm?.message || "Are you sure you want to delete this product? This action cannot be undone."}</p>
                            <div className={styles.modalButtonsGroup}>
                                <button type="button" onClick={cancelDelete} className={styles.cancelButton}>{t.modal?.cancel || "Cancel"}</button>
                                <button type="button" onClick={confirmDelete} className={styles.deleteButton}>{t.deleteConfirm?.confirm || "Yes, Delete"}</button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Step3Factory;