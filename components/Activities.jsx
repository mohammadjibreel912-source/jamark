// src/components/Activities.js

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
// import "../styles/Activities.css";

// --- Constants ---
const API_URL = "/api/Activities"; // يجب التأكد من أن هذا المسار يعمل لجلب البيانات

// بيانات وهمية احتياطية (Fallback data)
const fallbackActivities = [
  {
    id: 9901,
    code: 21345,
    nameAr: "تجارة واستيراد الأجهزة الطبية والمخبرية",
    name: "Medical devices trade",
  },
  {
    id: 9902,
    code: 87654,
    nameAr: "خدمات استشارات الأمن السيبراني والبرمجة",
    name: "Cyber security and programming consultation",
  },
  {
    id: 9903,
    code: 30123,
    nameAr: "صيانة وتشغيل المزارع السمكية",
    name: "Maintenance of fish farms",
  },
  {
    id: 9904,
    code: 251410,
    nameAr: "تصنيع أنظمة الطاقة الشمسية",
    name: "Manufacturing solar thermal systems",
  },
  {
    id: 9905,
    code: 141001,
    nameAr: "تصنيع الملابس الجاهزة",
    name: "Manufacturing ready-made garments",
  },
];

// --- SVG Icons (Trash) ---
const TrashIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="icon-trash"
    style={{ cursor: "pointer", minWidth: "24px", minHeight: "24px" }}
  >
    <path
      d="M6.5625 22C5.90937 22 5.35046 21.7717 4.88575 21.3152C4.42104 20.8586 4.18829 20.3091 4.1875 19.6667V4.5H3V2.16667H8.9375V1H16.0625V2.16667H22V4.5H20.8125V19.6667C20.8125 20.3083 20.5801 20.8578 20.1154 21.3152C19.6507 21.7725 19.0914 22.0008 18.4375 22H6.5625ZM18.4375 4.5H6.5625V19.6667H18.4375V4.5ZM8.9375 17.3333H11.3125V6.83333H8.9375V17.3333ZM13.6875 17.3333H16.0625V6.83333H13.6875V17.3333Z"
      fill="#ef4444"
    />
  </svg>
);

const Activities = ({ initialActivities, onSave, onClose }) => {
  // 1. التهيئة: استخدام initialActivities لتهيئة قائمة المختارة
  const [allActivities, setAllActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState(
    initialActivities || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // دالة جلب جميع البيانات مرة واحدة
  const fetchAllActivities = async () => {
    setLoading(true);
    setError(null);
    let activitiesToProcess = [];

    try {
      const response = await axios.get(API_URL);

      if (response.data && Array.isArray(response.data)) {
        activitiesToProcess = response.data;
      } else {
        activitiesToProcess = fallbackActivities;
        setError("فشل في قراءة بيانات API. تم عرض بيانات احتياطية.");
      }
    } catch (err) {
      activitiesToProcess = fallbackActivities;
      setError("⚠️ فشل في جلب الأنشطة. تم عرض بيانات احتياطية.");
    }

    // تحويل وتخزين القائمة الكاملة
    setAllActivities(
      activitiesToProcess.map((activity) => ({
        id: activity.id,
        name: activity.name,
        nameAr: activity.nameAr,
        code: activity.code,
      }))
    );
    setLoading(false);
  };

  // تأثير: جلب جميع البيانات عند تحميل المكون لأول مرة
  useEffect(() => {
    fetchAllActivities();
  }, []);

  // دالة التصفية المعتمدة على البحث والقائمة المختارة (لإخفاء المختارة من القائمة المتاحة)
  const filterActivities = useCallback(() => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    const selectedIds = new Set(selectedActivities.map((a) => a.id));

    const filteredList = allActivities.filter((activity) => {
      // إزالة الأنشطة المختارة بالفعل
      if (selectedIds.has(activity.id)) return false;

      // تطبيق البحث المحلي (بالاسم أو الرمز)
      if (!lowerCaseSearch) return true;

      return (
        (activity.nameAr &&
          activity.nameAr.toLowerCase().includes(lowerCaseSearch)) ||
        (activity.name &&
          activity.name.toLowerCase().includes(lowerCaseSearch)) ||
        String(activity.code).includes(lowerCaseSearch)
      );
    });

    return filteredList;
  }, [searchTerm, allActivities, selectedActivities]);
  const availableActivities = filterActivities();

  // دالة تبديل حالة الاختيار
  const toggleActivitySelection = (activityToToggle) => {
    const isSelected = selectedActivities.some(
      (a) => a.id === activityToToggle.id
    );

    if (isSelected) {
      // إلغاء الاختيار
      setSelectedActivities((prevSelected) =>
        prevSelected.filter((a) => a.id !== activityToToggle.id)
      );
    } else {
      // الاختيار
      setSelectedActivities((prevSelected) => [
        ...prevSelected,
        activityToToggle,
      ]);
    }
  };

  // منع السلوك الافتراضي للـ Form عند البحث
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // دالة للتعامل مع النقر على زر الحفظ (إرسال القائمة النهائية إلى Step3Company)
  const handleSave = () => {
    // 🛑 تمرير الكائنات الكاملة للربط الصحيح في Step3Company
    onSave(selectedActivities);
  };

  return (
    <div dir="rtl">
      <div className="activities-container" style={{ padding: "0 20px" }}>
        {/* شريط البحث */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="ابحث باسم النشاط أو الرمز..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </form>

        {/* جدول جميع الأنشطة المتاحة */}
        <div
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginTop: "15px",
          }}
        >
          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
          )}

          {loading && allActivities.length === 0 && (
            <p style={{ textAlign: "center", padding: "20px" }}>
              جار تحميل جميع الأنشطة...
            </p>
          )}

          {!loading &&
            allActivities.length > 0 &&
            availableActivities.length === 0 && (
              <p style={{ textAlign: "center", opacity: 0.7, padding: "20px" }}>
                {searchTerm
                  ? "لا توجد نتائج مطابقة للبحث أو تم اختيار جميع النتائج."
                  : "لا توجد أنشطة متاحة للاختيار."}
              </p>
            )}

          {availableActivities.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f8f8" }}>
                  <th
                    style={{
                      width: "65%",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                      textAlign: "right",
                    }}
                  >
                    النشاط
                  </th>
                  <th
                    style={{
                      width: "25%",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    الرمز
                  </th>
                  <th
                    style={{
                      width: "10%",
                      textAlign: "center",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    الإختيار
                  </th>
                </tr>
              </thead>
              <tbody>
                {availableActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    onClick={() => toggleActivitySelection(activity)}
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #f5f5f5",
                    }}
                  >
                    <td style={{ padding: "10px" }}>
                      {activity.nameAr || activity.name}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {activity.code || activity.id}
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {/* أيقونة اختيار بسيطة أو مكانها */}
                      <span
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          border: "1px solid #05BAA3",
                          borderRadius: "4px",
                        }}
                      ></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* --- قسم الأنشطة المختارة --- */}
        <div className="selected-section" style={{ marginTop: "20px" }}>
          <h3>الأنشطة المختارة ({selectedActivities.length})</h3>

          {selectedActivities.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f8f8" }}>
                  <th
                    style={{
                      width: "65%",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                      textAlign: "right",
                    }}
                  >
                    النشاط
                  </th>
                  <th
                    style={{
                      width: "25%",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    الرمز
                  </th>
                  <th
                    style={{
                      width: "10%",
                      textAlign: "center",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    الإجراء
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    style={{ borderBottom: "1px solid #f5f5f5" }}
                  >
                    <td style={{ padding: "10px" }}>
                      {activity.nameAr || activity.name}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {activity.code || activity.id}
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      <TrashIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleActivitySelection(activity);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "#6b7280",
                padding: "15px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
              }}
            >
              لا توجد أنشطة مختارة حاليًا.
            </p>
          )}
        </div>

        {/* زر الحفظ والإغلاق */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        >
          <button
            className="save-btn"
            onClick={handleSave}
            style={{
              flexGrow: 1,
              padding: "12px",
              background: "#05BAA3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            حفظ وإغلاق
          </button>
          {/* زر الإلغاء */}
          <button
            onClick={onClose}
            style={{
              padding: "12px",
              background: "#e0e0e0",
              color: "#333",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
              flexGrow: 1,
            }}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activities;
 