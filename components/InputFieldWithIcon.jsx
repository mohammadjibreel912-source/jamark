
import React from 'react';
import styles from "../styles/step4.module.css"; 

const InputFieldWithIcon = ({
    label, 
    children,
    error, 
    required = true, 
    description,
}) => {
    return (
        <div className={styles.formField}>
            <label>
                {label} {required && <span style={{ color: "red" }}>*</span>}
            </label>
            
            {children} 
            
            {error && <span className={styles.errorText}>{error}</span>}
            {description && <p className={styles.inputDescription}>{description}</p>} 
        </div>
    );
};

export default InputFieldWithIcon;
