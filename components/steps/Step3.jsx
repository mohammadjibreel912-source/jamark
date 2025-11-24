import React from "react";
import Step3Factory from "./Step3Factory";
import Step3Company from "./Step3Company";

const Step3 = (props) => {
  return props.isFactory ? (
    <Step3Factory {...props} />
  ) : (
    <Step3Company {...props} />
  );
};

export default Step3;
