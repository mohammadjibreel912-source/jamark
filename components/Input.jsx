import React from 'react';

function Input({ label, ...props }) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
}

export default Input;
