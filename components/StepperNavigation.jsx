import React from "react";

const StepperNavigation = ({ step, totalSteps, onPrev, onNext, translations, finalActionText }) => {
  return (
    <div className="buttons-wrapper">
      <button onClick={onPrev} disabled={step === 1}>
        {translations.buttons.prev}
      </button>

      {step < totalSteps ? (
        <button onClick={onNext}>{translations.buttons.next}</button>
      ) : (
        <button>{finalActionText}</button>
      )}
    </div>
  );
};

export default StepperNavigation;
