// src/components/MapSelector.jsx

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// 🌟 الخطوة 1: استيراد ملفات CSS والوظيفة من Geocoder (ضروريان لظهور المكون)
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

import "leaflet/dist/leaflet.css";

// 💡 حل مشكلة أيقونات Leaflet الافتراضية في React (ضروري)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🌟 تعريف متغير Geocoder من الكائن L (يجب أن يتم هذا بعد استيراد 'leaflet-control-geocoder')
const Geocoder = L.Control.Geocoder;

// -----------------------------------------------------------------
// 🗺️ مكون لإضافة تحكم البحث الجغرافي إلى الخريطة (مركز على الأردن)
// -----------------------------------------------------------------
const GeocoderControl = ({ setSelectedPosition }) => {
  const map = useMap();

  useEffect(() => {
    // التأكد من أن Geocoder متاح ومُهيأ
    if (!Geocoder || !Geocoder.geocoders || !Geocoder.geocoders.nominatim) {
      console.error("Geocoder control not initialized. Check imports.");
      return;
    }

    // 🌟 تحديد حدود البحث (Bounding Box) لمنطقة الأردن تقريباً
    const boundingBox = [30.0, 34.5, 33.3, 39.5];

    // 1. تهيئة محرك البحث وتمرير الحدود
    const geocoderInstance = Geocoder.geocoders.nominatim({
      viewbox: boundingBox,
      bounded: true, // يجبر البحث على البقاء داخل الصندوق
    });

    // 2. إنشاء تحكم البحث وإضافته إلى الخريطة
    const control = L.Control.geocoder({
      geocoder: geocoderInstance,
      position: "topleft", // سيظهر مربع البحث هنا
      placeholder: "Search Address or Location within Jordan...",
      errorMessage: "Nothing found, please try another search.",
      showResultIcons: true,
    }).addTo(map);

    // الاستماع لحدث اختيار نتيجة البحث
    control.on("markgeocode", (e) => {
      const latlng = e.geocode.center;
      setSelectedPosition(latlng);
      map.flyTo(latlng, 15);
    });

    // تنظيف عند إزالة المكون
    return () => {
      control.remove();
    };
  }, [map, setSelectedPosition]);

  return null;
};

// -----------------------------------------------------------------
// 📍 مكون لإدارة النقر وعرض العلامة
// -----------------------------------------------------------------
const LocationMarker = ({ setPosition, position }) => {
  const map = useMapEvents({
    // تحديث الموقع عند النقر
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

// -----------------------------------------------------------------
// 🗺️ المكون الرئيسي لاختيار الموقع الجغرافي
// -----------------------------------------------------------------
const MapSelector = ({ initialLocation, onSave, onClose }) => {
  // نقطة البداية الافتراضية
  const defaultCenter = [31.9566, 35.9457];

  const [selectedPosition, setSelectedPosition] = useState(() => {
    if (initialLocation && initialLocation.lat && initialLocation.lng) {
      return { lat: initialLocation.lat, lng: initialLocation.lng };
    }
    return null;
  });

  const latLng = selectedPosition || defaultCenter;
  const isEditing = selectedPosition !== null;

  const handleSave = () => {
    if (!selectedPosition) {
      alert("الرجاء اختيار موقع على الخريطة أولاً.");
      return;
    }

    const locationData = {
      lat: selectedPosition.lat,
      lng: selectedPosition.lng,
      display: `Lat: ${selectedPosition.lat.toFixed(
        6
      )}, Lng: ${selectedPosition.lng.toFixed(6)}`,
    };
    onSave(locationData);
  };

  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <MapContainer
        center={isEditing ? latLng : defaultCenter}
        zoom={isEditing ? 15 : 8}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* 🌟 المكون المسؤول عن إضافة شريط البحث */}
        <GeocoderControl setSelectedPosition={setSelectedPosition} />

        {/* العلامة والمستمع للنقر */}
        <LocationMarker
          position={selectedPosition}
          setPosition={setSelectedPosition}
        />
      </MapContainer>

      {/* عرض الإحداثيات المختارة */}
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          border: "1px solid #eee",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        {selectedPosition ? (
          <p style={{ color: "#007bff", fontWeight: "bold" }}>
            Selected: Lat: {selectedPosition.lat.toFixed(6)}, Lng:{" "}
            {selectedPosition.lng.toFixed(6)}
          </p>
        ) : (
          <p style={{ color: "#888" }}>
            ابحث عن الموقع أو انقر في أي مكان على الخريطة.
          </p>
        )}
      </div>

      {/* أزرار الحفظ والإلغاء */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "15px",
          gap: "10px",
        }}
      >
        <button
          onClick={handleSave}
          disabled={!selectedPosition}
          style={{
            padding: "10px 20px",
            backgroundColor: selectedPosition ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: selectedPosition ? "pointer" : "not-allowed",
          }}
        >
          حفظ الموقع
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "#eee",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          إلغاء
        </button>
      </div>
    </div>
  );
};

export default MapSelector;
