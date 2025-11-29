// MapModalContainer.jsx
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"; 
import Modal from "./Modal"; 

// 🗺️ Component Constants
const containerStyle = {
  width: '100%',
  height: '400px' // ارتفاع الخريطة داخل المودال
};

// موقع افتراضي (عمان، الأردن)
const defaultCenter = {
  lat: 31.9539, 
  lng: 35.9106 
};

// 🛠️ Normalization Helper Function
// This function maps incoming location objects (which might have 'latitude'/'longitude')
// to the standard 'lat'/'lng' structure required by Google Maps and React state.
const normalizeLocation = (location) => {
    if (!location) return defaultCenter;
    
    // Check for the keys mentioned in your error (latitude, longitude) or standard lat/lng
    const normalizedLat = location.lat || location.latitude;
    const normalizedLng = location.lng || location.longitude;

    if (normalizedLat && normalizedLng) {
        return {
            lat: Number(normalizedLat), // Ensure they are numbers
            lng: Number(normalizedLng), // Ensure they are numbers
            // Keep other properties if they exist
            address: location.address || location.display,
        };
    }
    return defaultCenter;
};


// 🛑 MapModalContainer Component
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
    
    // 1. Map API Key Setup (using useMemo for stable API key access)
    const mapApiKey = useMemo(() => 
        googleMapsApiKey || import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY, 
        [googleMapsApiKey]
    );

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: mapApiKey,
        libraries: libraries || ["places"],
        language: language === "ar" ? "ar" : "en", // Use the correct language prop
    });

    // 2. State Initialization (FIX APPLIED HERE)
    // We normalize the initialLocation object before setting it to state.
    const [selectedLocation, setSelectedLocation] = useState(() => 
        normalizeLocation(initialLocation)
    );
    const mapRef = useRef(null);
    
    // Use an effect to reset the location if initialLocation changes while the modal is closed
    // useEffect(() => {
    //     setSelectedLocation(normalizeLocation(initialLocation));
    // }, [initialLocation]);

    // 3. Handlers
    const handleMapClick = useCallback((e) => {
        // When clicking, we update lat and lng. We do not get a new address easily here.
        setSelectedLocation(prev => ({
            ...prev, // Keep existing address/display property if possible
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }));
    }, []);

    const handleSaveAndClose = () => {
        // Ensure that the object being saved contains all necessary keys.
        // We ensure we save the lat/lng AND the address/display property.
        onSave({
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
            // If the parent component expects 'latitude' and 'longitude' keys on save, 
            // you should map them back here. Assuming the parent now expects 'lat'/'lng'
            // or the component calling onSave will do the mapping.
            latitude: selectedLocation.lat, // Include both for compatibility
            longitude: selectedLocation.lng, // Include both for compatibility
            address: selectedLocation.address,
        });
        onClose();
    };

    let mapContent;

    if (loadError) {
        mapContent = (
            <div className="map-error" style={{ padding: "20px", color: "red", textAlign: "center", fontSize: "16px" }}>
                {language === 'ar' ? "فشل تحميل الخريطة. الرجاء التحقق من مفتاح API." : "Map failed to load. Please check the API key."}
            </div>
        );
    } else if (!isLoaded) {
        mapContent = (
            <div className="map-loading" style={{ padding: "20px", textAlign: "center", fontSize: "16px", color: "#666" }}>
                {language === 'ar' ? "جاري تحميل الخريطة..." : "Loading map..."}
            </div>
        );
    } else {
        // 4. عرض الخريطة ومحدد الموقع
        mapContent = (
            <div>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    // Use selectedLocation for the center, which now guaranteed has .lat/.lng
                    center={selectedLocation} 
                    zoom={12} 
                    onClick={handleMapClick}
                    onLoad={(map) => { mapRef.current = map; }}
                >
                    {/* Use selectedLocation for the marker position */}
                    <Marker position={selectedLocation} />
                </GoogleMap>
                <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <p style={{ marginBottom: "10px", fontSize: "14px" }}>
                        {language === 'ar' ? "الموقع المحدد" : "Selected Location"}: Lat: **{selectedLocation.lat.toFixed(5)}**, Lng: **{selectedLocation.lng.toFixed(5)}**
                    </p>
                    <button 
                        onClick={handleSaveAndClose}
                        style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}
                    >
                        {translations?.saveButton || "Save Location"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={title || (language === 'ar' ? "تحديد موقع المنشأة" : "Select Establishment Location")}
        >
            {mapContent}
        </Modal>
    );
};

export default MapModalContainer;