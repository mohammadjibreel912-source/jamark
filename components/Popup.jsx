import React from 'react';

function Popup({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
