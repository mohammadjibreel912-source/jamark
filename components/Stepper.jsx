import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "../styles/Stepper.module.css"; 

const Stepper = ({ step = 1, totalSteps = 5, isRTL = false }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const displaySteps = isRTL ? [...steps].reverse() : steps;

  return (
    <div
      className={`${styles.container} ${isRTL ? styles.rtl : styles.ltr}`}
    >
      <LanguageSwitcher />

      {displaySteps.map((s, index) => {
        const isCurrent = s === step;
        const isCompleted = isRTL ? s > step : s < step;

        const connectorClass = isCompleted ? styles.connectorCompleted : styles.connectorDefault;
        
        let circleClass = styles.circleDefault;
        if (isCurrent) {
          circleClass = styles.circleCurrent;
        } else if (isCompleted) {
          circleClass = styles.circleCompleted;
        }
        
        const numberClass = isCurrent ? styles.numberCurrent : styles.numberDefault;

        return (
          <React.Fragment key={s}>
            {index > 0 && (
              <div
                className={`${styles.connector} ${connectorClass}`}
              />
            )}

            <div
              className={`${styles.circle} ${circleClass}`}
            >
              {isCompleted && !isCurrent ? (
                <div
                  className={styles.checkmark}
                />
              ) : (
                <span
                  className={numberClass}
                >
                  {s}
                </span>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;