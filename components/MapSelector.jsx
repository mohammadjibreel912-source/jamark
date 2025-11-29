import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import styles from "../styles/MapSelector.module.css";

const MapSelector = ({
  onSave,
  initialLocation,
  translations,
  language,
}) => {
  const [selectedLocation, setSelectedLocation] = useState(
    initialLocation || { lat: 24.7136, lng: 46.6753 } // Default to Riyadh
  );

  const [markerPosition, setMarkerPosition] = useState(
    initialLocation || { lat: 24.7136, lng: 46.6753 }
  );

  const [showInfo, setShowInfo] = useState(false);
  const isRTL = language === "ar";

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };

  const handleMapClick = useCallback((e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setSelectedLocation(newLocation);
    setMarkerPosition(newLocation);
    setShowInfo(true);
  }, []);

  const handleSaveLocation = () => {
    if (onSave) {
      onSave({
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        address: `${selectedLocation.lat}, ${selectedLocation.lng}`,
      });
    }
  };

  return (
    <div
      className={styles.mapSelectorContainer}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className={styles.mapWrapper}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={selectedLocation}
          zoom={13}
          onClick={handleMapClick}
        >
          <Marker
            position={markerPosition}
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo && (
              <InfoWindow onCloseClick={() => setShowInfo(false)}>
                <div className={styles.infoWindow}>
                  <p>{translations?.selectedLocation || "Selected Location"}</p>
                  <p>
                    {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                  </p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      </div>

      <div className={styles.coordinatesDisplay}>
        <p>
          <strong>{translations?.latitude || "Latitude"}:</strong>{" "}
          {selectedLocation.lat.toFixed(6)}
        </p>
        <p>
          <strong>{translations?.longitude || "Longitude"}:</strong>{" "}
          {selectedLocation.lng.toFixed(6)}
        </p>
      </div>

      <button
        type="button"
        className={styles.saveButton}
        onClick={handleSaveLocation}
      >
        {translations?.save || "Save Location"}
      </button>
    </div>
  );
};

export default MapSelector;