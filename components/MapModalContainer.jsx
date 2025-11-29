// MapModalContainer.jsx
import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"; // ⬅️ إضافة GoogleMap و Marker
import Modal from "./Modal"; 
// 🛑 حذف: import MapSelector from "./MapSelector"; 

const containerStyle = {
  width: '100%',
  height: '400px' // ارتفاع الخريطة داخل المودال
};

// موقع افتراضي (يجب أن يكون لديك خطوط عرض وطول مبدئية)
const defaultCenter = {
  lat: 31.9539, 
  lng: 35.9106  // مثال: عمان، الأردن
};


// 🛑 المكون الذي يجمع بين منطق تحميل الخريطة والمودال
const MapModalContainer = ({ 
    isOpen, 
    onClose, 
    title, 
    googleMapsApiKey, 
    libraries, 
    onSave, 
    initialLocation, 
    translations, 
    language 
}) => {
    
    // 1. منطق تحميل سكريبت خرائط جوجل
    const mapApiKey = googleMapsApiKey || import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: mapApiKey,
        libraries: libraries || ["places"],
        language: "ar", 
    });

    // 2. حالة الموقع المحدد
    const [selectedLocation, setSelectedLocation] = useState(initialLocation || defaultCenter);
    const mapRef = useRef(null);

    // 3. Handlers
    const handleMapClick = useCallback((e) => {
        setSelectedLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    }, []);

    const handleSaveAndClose = () => {
        onSave(selectedLocation);
        onClose();
    };

    let mapContent;

    if (loadError) {
        mapContent = (
            <div className="map-error" style={{ padding: "20px", color: "red", textAlign: "center", fontSize: "16px" }}>
                فشل تحميل الخريطة. الرجاء التحقق من مفتاح API.
            </div>
        );
    } else if (!isLoaded) {
        mapContent = (
            <div className="map-loading" style={{ padding: "20px", textAlign: "center", fontSize: "16px", color: "#666" }}>
                جاري تحميل الخريطة...
            </div>
        );
    } else {
        // 4. عرض الخريطة ومحدد الموقع
        mapContent = (
            <div>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={selectedLocation}
                    zoom={12} // تكبير/تصغير مبدئي
                    onClick={handleMapClick}
                    onLoad={(map) => { mapRef.current = map; }}
                >
                    <Marker position={selectedLocation} />
                </GoogleMap>
                <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <p style={{ marginBottom: "10px", fontSize: "14px" }}>
                        الموقع المحدد: Lat: **{selectedLocation.lat.toFixed(5)}**, Lng: **{selectedLocation.lng.toFixed(5)}**
                    </p>
                    <button 
                        onClick={handleSaveAndClose}
                        style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}
                    >
                        {translations.saveButton || "Save Location"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={title || "Select Establishment Location"}
        >
            {mapContent}
        </Modal>
    );
};

export default MapModalContainer;