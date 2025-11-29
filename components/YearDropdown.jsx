import React from 'react';
import styles from "../styles/Step4.module.css"; 

const YearDropdown = ({ selectedYear, onSelect, language }) => {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    return (
        <div
            className={styles.yearDropdownList}
            style={{
                [language === "ar" ? "right" : "left"]: 0,
            }}
        >
            {years.map((year) => (
                <div
                    key={year}
                    onClick={() => onSelect(year)}
                    className={`${styles.yearDropdownItem} ${year === selectedYear ? styles.yearDropdownItemSelected : ""}`}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            year === selectedYear ? "#d0f0ff" : "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            year === selectedYear ? "#e0f7ff" : "white")
                    }
                >
                    {year}
                </div>
            ))}
        </div>
    );
};

export default YearDropdown;