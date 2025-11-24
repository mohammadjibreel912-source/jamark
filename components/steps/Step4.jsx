import React from "react";
import Step4Factory from "./Step4Factory"; // your current Step4
import Step4Company from "./Step4Company";   // your company form

const Step4 = (props) => {
  const { isFactory } = props; // get from parent (StepperPage)
  return isFactory ? <Step4Factory {...props} /> : <Step4Company {...props} />;
};

export default Step4;
