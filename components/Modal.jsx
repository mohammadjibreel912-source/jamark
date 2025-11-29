import React from "react";
import styles from "../styles/Modal.module.css"; // تأكد من وجود هذا الملف

const Modal = ({ onClose, title, children }) => {
  return (
    <>
      {/* 🆕 Overlay/Backdrop */}
      <div 
        className={styles.modalOverlay} 
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 🆕 Modal Content */}
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()} // منع إغلاق الـ Modal عند النقر داخلها
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflowY: "auto",
            zIndex: 1000,
            position: "relative",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          {/* 🆕 Modal Header */}
          {title && (
            <div
              className={styles.modalHeader}
              style={{
                padding: "20px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                ✕
              </button>
            </div>
          )}

          {/* 🆕 Modal Body */}
          <div
            className={styles.modalBody}
            style={{
              padding: "20px",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Modal;