// src/components/Modal.jsx

import React from 'react';
import '../styles/modal.css'; 

const Modal = ({ children, onClose, title }) => {
    // Prevent closing when clicking inside the content box
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        // The modal-overlay closes the modal when clicked
        <div className="modal-overlay" onClick={onClose}>
            {/* The modal-content is the dialog box itself */}
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    {title && <h3>{title}</h3>}
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;