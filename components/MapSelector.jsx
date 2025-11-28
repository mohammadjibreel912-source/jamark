import React, { useState, useRef, useCallback } from "react";
// نستخدم الاستيراد الخاص بمكتبة الخرائط @react-google-maps/api
import { GoogleMap, Marker, StandaloneSearchBox, useLoadScript } from "@react-google-maps/api";

// -----------------------------------------------------------------
// SVG Icons (بدائل لـ Lucide-React لضمان عمل الكود)
// -----------------------------------------------------------------

// أيقونة الدبوس/الموقع
const MapPinIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// أيقونة البحث
const SearchIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// أيقونة الحفظ
const SaveIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);


// -----------------------------------------------------------------
// 1. مكون اختيار الموقع الجغرافي (MapSelector)
// -----------------------------------------------------------------

/**
 * @typedef {Object} LocationData
 * @property {number} lat - خط العرض
 * @property {number} lng - خط الطول
 */

/**
 * مكون يسمح للمستخدم باختيار موقع جغرافي عبر النقر على الخريطة أو البحث.
 *
 * @param {Object} props
 * @param {LocationData | null} props.initialData - الموقع الأولي (إذا كان متوفراً)
 * @param {(data: LocationData & { display: string }) => void} props.onSave - دالة الحفظ
 * @param {() => void} props.onClose - دالة الإلغاء
 */
const MapSelector = ({ initialData, onSave, onClose }) => {
  // نقطة البداية الافتراضية (مركز الأردن تقريباً)
  const defaultCenter = { lat: 31.9566, lng: 35.9457 };

  // تحديد الموقع المختار (المركز الحالي)
  const [center, setCenter] = useState(
    initialData
      ? { lat: initialData.lat, lng: initialData.lng }
      : defaultCenter
  );
  // تحديد موضع العلامة (Marker) النهائي
  const [selectedPosition, setSelectedPosition] = useState(
    initialData
      ? { lat: initialData.lat, lng: initialData.lng }
      : null
  );

  // حالة لعرض رسائل الخطأ داخل الواجهة
  const [errorMessage, setErrorMessage] = useState("");
  
  // حجم تكبير الخريطة الافتراضي
  const defaultZoom = initialData ? 15 : 8;

  // مرجع لعنصر البحث
  const searchBoxRef = useRef(null);
  // مرجع لكائن الخريطة
  const mapRef = useRef(null);

  // ----------------- وظائف الخريطة -----------------

  // عند تحميل الخريطة (لحفظ المرجع)
  const onLoadMap = useCallback((map) => {
    mapRef.current = map;
    if (selectedPosition) {
      // إذا كان هناك موقع سابق، ركز الخريطة عليه
      map.setCenter(selectedPosition);
      map.setZoom(15);
    }
  }, [selectedPosition]);

  // عند النقر على الخريطة (لتحديد الموقع)
  const onMapClick = useCallback((event) => {
    setErrorMessage(""); // إخفاء أي رسالة خطأ سابقة
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedPosition(newPosition);
    setCenter(newPosition);
  }, []);

  // عند تحميل مربع البحث
  const onLoadSearchBox = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  // عند اختيار موقع من نتائج البحث التلقائي
  const onPlacesChanged = useCallback(() => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    const location = place.geometry.location;

    const newPosition = {
      lat: location.lat(),
      lng: location.lat(),
    };

    setSelectedPosition(newPosition);
    setCenter(newPosition);
    mapRef.current.panTo(newPosition); // تحريك مركز الخريطة
    mapRef.current.setZoom(15);
    setErrorMessage("");
  }, []);

  // ----------------- وظيفة الحفظ -----------------

  const handleSave = () => {
    if (!selectedPosition) {
      setErrorMessage("الرجاء اختيار موقع على الخريطة أولاً لتتمكن من الحفظ.");
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
    onClose();
  };

  // ----------------- عرض المكون -----------------

  return (
    <div className="p-4 w-full bg-white rounded-xl shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-right border-b pb-2">
        اختيار الموقع الجغرافي
      </h2>

      <div className="relative">
        {/* شريط البحث التلقائي */}
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-xl shadow-2xl rounded-lg"
          dir="rtl" // لضمان عرض النص بشكل صحيح داخل شريط البحث
        >
          <StandaloneSearchBox
            onLoad={onLoadSearchBox}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن عنوان أو موقع جغرافي..."
                className="w-full h-12 p-3 pr-10 border border-gray-300 rounded-lg shadow-md text-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-right"
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </StandaloneSearchBox>
        </div>

        {/* مكون الخريطة */}
        <div className="h-96 w-full rounded-lg shadow-inner border border-gray-200">
            <GoogleMap
              mapContainerClassName="h-full w-full rounded-lg"
              center={center}
              zoom={defaultZoom}
              onLoad={onLoadMap}
              onClick={onMapClick} // لتحديد الموقع عند النقر
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                zoomControl: true,
                gestureHandling: "greedy",
              }}
            >
              {/* العلامة (Marker) */}
              {selectedPosition && (
                <Marker
                  position={selectedPosition}
                  draggable={true} // يمكن سحب العلامة
                  onDragEnd={(e) => {
                    const newPosition = {
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    };
                    setSelectedPosition(newPosition);
                    setCenter(newPosition);
                    setErrorMessage("");
                  }}
                  // تخصيص الأيقونة (اختياري)
                  icon={{
                    url: 'https://maps.google.com/mapfiles/kml/paddle/red-stars.png',
                    scaledSize: new window.google.maps.Size(40, 40)
                  }}
                />
              )}
            </GoogleMap>
        </div>
      </div>

      {/* عرض الإحداثيات المختارة */}
      <div
        className="mt-6 p-4 rounded-lg text-right transition-all duration-300"
        dir="rtl"
      >
        {selectedPosition ? (
          <div className="flex items-center space-x-2 space-x-reverse bg-blue-50 border-r-4 border-blue-500 p-3 rounded-md">
            <MapPinIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-gray-700 font-medium text-sm">
              الموقع المختار:{" "}
              <span className="text-blue-700 font-bold ml-1">
                Lat: {selectedPosition.lat.toFixed(6)}, Lng:{" "}
                {selectedPosition.lng.toFixed(6)}
              </span>
            </p>
          </div>
        ) : (
          <div className="bg-gray-100 p-3 rounded-md border border-dashed border-gray-300">
            <p className="text-gray-500 text-sm">
              ابحث عن الموقع أو انقر في أي مكان على الخريطة لتحديد الموقع.
            </p>
          </div>
        )}

        {/* عرض رسالة الخطأ (بديل alert) */}
        {errorMessage && (
          <div className="mt-3 p-3 bg-red-100 text-red-700 border-r-4 border-red-500 rounded-md text-sm font-medium">
            {errorMessage}
          </div>
        )}
      </div>

      {/* أزرار الحفظ والإلغاء */}
      <div className="flex justify-start mt-6 space-x-3 space-x-reverse">
        <button
          onClick={handleSave}
          disabled={!selectedPosition}
          className={`
            flex items-center justify-center gap-1
            px-5 py-2 rounded-lg text-white font-semibold transition-all duration-200 shadow-md
            ${selectedPosition 
              ? 'bg-green-600 hover:bg-green-700 ring-green-300 focus:ring-4' 
              : 'bg-gray-400 cursor-not-allowed'
            }
          `}
        >
          <SaveIcon className="w-5 h-5" />
          حفظ الموقع
        </button>
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold border border-gray-300 hover:bg-gray-300 transition duration-150"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
};


// -----------------------------------------------------------------
// 2. المكون الرئيسي للتطبيق (App)
// -----------------------------------------------------------------

// قم بتحديد المفاتيح (Keys) اللازمة لـ Google Maps
const googleMapsApiKey = ""; 
const libraries = ["places"];


const App = () => {
  // للتحكم في حالة تحميل سكريبتات Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
    language: "ar", // لضمان عرض عناصر الخريطة باللغة العربية
    region: "JO",   // يمكن تحديد المنطقة لنتائج البحث (اختياري)
  });

  // حالة الموقع المختار النهائي (للتطبيق التجريبي)
  const [savedLocation, setSavedLocation] = useState(null);
  // حالة التحكم في ظهور/إخفاء مكون اختيار الخريطة
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // دالة تُمرر إلى المكون لحفظ الموقع
  const handleSaveLocation = (data) => {
    setSavedLocation(data);
    console.log("تم حفظ الموقع:", data);
  };

  if (loadError) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        خطأ في تحميل الخريطة: تأكد من صحة مفتاح Google Maps API.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">جارٍ تحميل خرائط Google...</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex justify-center items-start pt-10" dir="rtl">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          تجربة: محدد الموقع الجغرافي (React + Google Maps)
        </h1>

        {/* واجهة العرض الرئيسية */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            الموقع المحفوظ حالياً
          </h2>

          {savedLocation ? (
            <div className="bg-green-50 border-r-4 border-green-500 p-4 rounded-lg mb-6 flex justify-between items-center shadow-inner">
              <p className="text-green-800 font-medium">
                تم تحديد الموقع:{" "}
                <span className="font-bold text-green-700">
                  {savedLocation.display}
                </span>
              </p>
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition"
              >
                تعديل الموقع
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg mb-6 flex justify-between items-center shadow-inner">
              <p className="text-blue-800 font-medium">
                لم يتم اختيار موقع بعد.
              </p>
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition"
              >
                اختيار الموقع الآن
              </button>
            </div>
          )}
        </div>
        
        {/* نافذة المودال لمحدد الموقع */}
        {isSelectorOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <MapSelectorComponent
                initialData={savedLocation}
                onSave={handleSaveLocation}
                onClose={() => setIsSelectorOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSelector;