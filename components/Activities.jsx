import React, { useState } from 'react';
import '../styles/Activities.css'; // استيراد ملف CSS

// بيانات محاكاة (في تطبيق React حقيقي، ستأتي هذه البيانات من State أو Props)
const mockActivities = [
  { id: 9432145, name: "استيراد وتجارة المواد الغذائية والسلع الاستهلاكية بالجملة", isSelected: true },
  { id: 5325325, name: "تجارة أجهزة الطاقة المتجددة وأنظمة الألواح الشمسية", isSelected: true },
  { id: 1232345, name: "تخليص المعاملات الجمركية وإدارة المنافذ", isSelected: false },
  { id: 4224512, name: "إدارة وتشغيل موانئ جافة ومستودعات تبريد", isSelected: false },
];

// أيقونة الاختيار (التي تظهر في حالة الاختيار في الجدول العلوي)
const SelectedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="2.5" width="19" height="18" rx="4.5" stroke="#05BAA3"/>
    <rect x="6" y="6" width="12" height="11" rx="3" fill="#05BAA3"/>
  </svg>
);

// أيقونة سلة المهملات (التي تظهر في جدول الأنشطة المختارة)
const TrashIcon = ({ onClick }) => (
  <svg 
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    className="icon-trash" // استخدام فئة CSS
  >
    <path d="M6.5625 22C5.90937 22 5.35046 21.7717 4.88575 21.3152C4.42104 20.8586 4.18829 20.3091 4.1875 19.6667V4.5H3V2.16667H8.9375V1H16.0625V2.16667H22V4.5H20.8125V19.6667C20.8125 20.3083 20.5801 20.8578 20.1154 21.3152C19.6507 21.7725 19.0914 22.0008 18.4375 22H6.5625ZM18.4375 4.5H6.5625V19.6667H18.4375V4.5ZM8.9375 17.3333H11.3125V6.83333H8.9375V17.3333ZM13.6875 17.3333H16.0625V6.83333H13.6875V17.3333Z" fill="#ef4444"/>
  </svg>
);


const ActivitiesPage = () => {
  // استخدام حالة React لمحاكاة البيانات
  const [activities, setActivities] = useState(mockActivities);
  const [searchTerm, setSearchTerm] = useState('');

  // استخراج الأنشطة المختارة ديناميكياً
  const selectedActivities = activities.filter(a => a.isSelected);

  // دالة لمحاكاة تبديل حالة الاختيار
  const toggleActivitySelection = (id) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === id ? { ...activity, isSelected: !activity.isSelected } : activity
      )
    );
  };
  
  // دالة للبحث
  const filteredActivities = activities.filter(activity => 
    activity.name.includes(searchTerm) || String(activity.id).includes(searchTerm)
  );
  
  // دالة للتعامل مع النقر على زر الحفظ
  const handleSave = () => {
      console.log('Saved Activities:', selectedActivities);
      alert('تم حفظ الأنشطة بنجاح (محاكاة)');
  }
  
  return (
    // تم نقل dir="rtl" إلى هذا العنصر
    <div dir="rtl">
      <div className="container">
        
        {/* شريط البحث */}
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="اسم النشاط" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon"></span>
        </div>

        {/* جدول جميع الأنشطة (الترتيب: [الإختيار] - [الرمز] - [النشاط]) */}
        <table>
          <thead>
            <tr>
              {/* العمود 1: الإختيار (أقصى اليسار) */}
              <th>الإختيار</th> 
              {/* العمود 2: الرمز (وسط) */}
              <th>الرمز</th>
              {/* العمود 3: النشاط (أقصى اليمين) */}
              <th>النشاط</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((activity) => (
              <tr key={activity.id} onClick={() => toggleActivitySelection(activity.id)}>
                {/* الإختيار (مركز) */}
                <td>
                  {activity.isSelected ? (
                    <SelectedIcon />
                  ) : (
                    <span className="icon-checkbox"></span>
                  )}
                </td>
                {/* الرمز (يمين) */}
                <td>{activity.id}</td>
                {/* النشاط (يمين) */}
                <td>{activity.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* قسم الأنشطة المختارة */}
        <div className="selected-section">
          <h3>الأنشطة المختارة ({selectedActivities.length})</h3>
          
          {selectedActivities.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {/* الترتيب المادي في JSX (الذي سيظهر عكسياً في RTL): [الرمز] - [النشاط] - [الإجراء] */}
                  
                  {/* العمود 1 في HTML: الرمز (20% - سيظهر أقصى اليمين في RTL) */}
                  <th>الرمز</th>
                  
                  {/* العمود 2 في HTML: النشاط (70% - سيظهر في الوسط في RTL) */}
                  <th>النشاط</th>
                  
                  {/* العمود 3 في HTML: الإجراء (10% - سيظهر أقصى اليسار في RTL) */}
                  <th>الإجراء</th> 
                </tr>
              </thead>
              <tbody>
                {selectedActivities.map((activity) => (
                  <tr key={activity.id}>
                    {/* العمود 1: الرمز */}
                    <td>{activity.id}</td>
                    
                    {/* العمود 2: النشاط */}
                    <td>{activity.name}</td>

                    {/* العمود 3: الإجراء (TrashIcon) */}
                    <td>
                      <TrashIcon onClick={(e) => { 
                          e.stopPropagation(); // منع تبديل الاختيار عند النقر على الأيقونة
                          toggleActivitySelection(activity.id);
                      }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
                لا توجد أنشطة مختارة حاليًا.
            </p>
          )}

        </div>

        {/* زر الحفظ */}
        <button className="save-btn" onClick={handleSave}>حفظ</button>
      </div>
    </div>
  );
};

export default ActivitiesPage;