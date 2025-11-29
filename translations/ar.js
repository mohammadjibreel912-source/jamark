export default {
    // ------------------------------------
    // 1. الخطوة 1: اختيار نوع المنشأة (Step 1)
    // ------------------------------------
    step1: {
        foreignCompany: "منشأة أجنبية",
        iraqiCompany: "منشأة عراقية",
        industrial: "منشأة صناعية",
        nonIndustrial: "منشأة غير صناعية",

        foreignSetup: "أجنبية",
        iraqiSetup: "عراقية",
        factory: "مصنع",
        company: "شركة",
    },

    // ------------------------------------
    // 2. الخطوة 2: معلومات الاتصال الأساسية (Step 2)
    // ------------------------------------
    step2: {
        basicInfo: "البيانات الأساسية",
        name: "الاسم",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",

        validation: {
            nameRequired: "حقل الاسم مطلوب.",
            emailRequired: "حقل البريد الإلكتروني مطلوب.",
            phoneRequired: "حقل رقم الهاتف مطلوب.",
            invalidEmail: "الرجاء إدخال صيغة بريد إلكتروني صحيحة.",
        },
    },

    // ------------------------------------
    // 3. الخطوة 3: معلومات الشركة غير الصناعية (Step 3)
    // ------------------------------------
    step3: {
        companyInformation: "معلومات الشركة",
        companyName: "اسم الشركة",
        companyNamePlaceholder: "أدخل اسم الشركة بالكامل",

        companyActivities: "أنشطة الشركة",
        activitiesSelected: "تم اختيار",
        chooseActivity: "اختر نشاط الشركة...",
        selectActivitiesTitle: "اختيار أنشطة الشركة",

        companyType: "نوع الشركة",
        companyForm: "شكل الشركة",

        managementMethodCompany: "طريقة إدارة الشركة",
        authorizedManagerName: "اسم المدير المفوض",
        managerNamePlaceholder: "أدخل الاسم الرباعي للمدير المفوض",

        selectOptionPlaceholder: "اختر قيمة",
        loading: "جاري التحميل...",
        chooseCompanyType: "اختر نوع الشركة",
        chooseCompanyForm: "اختر شكل الشركة",
        chooseManagementMethod: "اختر طريقة الإدارة",

        validation: {
            requiredField: "هذا الحقل مطلوب.",
            companyNameRequired: "اسم الشركة مطلوب.",
            activitiesRequired: "يجب اختيار نشاط واحد للشركة على الأقل.",
            companyTypeRequired: "نوع الشركة مطلوب.",
            companyFormRequired: "شكل الشركة مطلوب.",
            managementMethodRequired: "طريقة الإدارة مطلوبة.",
            managerNameRequired: "اسم المدير المفوض مطلوب.",
        },
    },

    // ------------------------------------
    // 4. الخطوة 4: وثائق وتفاصيل المنشأة (Step 4)
    // ------------------------------------
    step4: {
        // المفاتيح الإضافية المطلوبة لبناء العناوين
        address: "عنوان",
        location: "موقع",
        certificate: "شهادة",
        registration: "تسجيل",
        uploadFilePlaceholder: "اختر ملفاً...",
        addressFactoryPlaceholder: "انقر على إشارة الزائد لإدخال العنوان",
        plusIconAlt: "أيقونة الزائد", // Added based on en.js

        // العناوين الموحدة لـ (الشركة / المصنع)
        factoryDocumentation: "توثيق المنشأة", 
        factoryName: "اسم المنشأة", 
        factoryNamePlaceholder: "كما هو في شهادة التسجيل",
        factoryLocation: "موقع المنشأة", 
        factoryLocationPlaceholder: "رابط خرائط جوجل أو الإحداثيات",
        
        // الوثائق والبيانات المالية
        registrationCertificate: "شهادة التسجيل",
        specialtyCertificates: "الشهادات الاختصاصية (ISO, FSSC, FDA, GMP, إلخ)",
        foundationYear: "سنة التأسيس",
        foundationYearPlaceholder: "اختر السنة",
        capital: "رأس المال",
        capitalPlaceholder: "المبلغ",
        notes: "ملاحظات وتعليقات إضافية",
        notesPlaceholder: "ملاحظات إضافية",
        
        // --- Keys for File/Certificate Management ---
        uploadMultipleFiles: "إدارة الملفات بالنقر على أيقونة الزائد", 
        moreFiles: "المزيد",

        // ملخص غير الصناعية (Company Fields)
        companyInformation: "معلومات الشركة",
        companyName: "اسم الشركة",
        companyActivities: "أنشطة الشركة",
        activityPlaceholder: "أضف نشاطاً",
        companyType: "نوع الشركة",
        companyTypePlaceholder: "ذات مسؤولية محدودة",
        companyForm: "شكل الشركة",
        companyFormPlaceholder: "اعتيادية",
        managementMethod: "طريقة إدارة الشركة",
        managementMethodPlaceholder: "مدير مفوض",
        managerName: "إسم المدير المفوض",
        managerNamePlaceholder: "الاسم الكامل",

        // عام
        saveButton: "حفظ البيانات",
        formSubmitted: "تم إرسال البيانات بنجاح!",
    },

    // ------------------------------------
    // 5. الخطوة 5: الدفع (Step 5)
    // ------------------------------------
    step5: {
        cardSection: {
            cardHolderName: "اسم صاحب البطاقة",
            cardHolderNamePlaceholder: "الاسم كما يظهر على البطاقة",
            cardNumber: "رقم البطاقة",
            cardNumberPlaceholder: "1234 5678 9101 1121",
            expiryDate: "تاريخ الانتهاء",
            expiryDatePlaceholder: "MM/YY",
            cvv: "CVV",
            cvvPlaceholder: "123",
            visa: "VISA",
        },
        actions: {
            payAndSubmit: "الدفع وتقديم الطلب",
        },
        invoice: {
            title: "ملخص الفاتورة",
            companyRegistration: "تسجيل الشركة",
            technicalSupport: "الدعم الفني",
            serviceTax: "ضريبة الخدمة",
            totalLabel: "المبلغ الإجمالي",
        },
        pageTitle: "الدفع الإلكتروني",
    },

    // ------------------------------------
    // 6. إدارة منتجات المصنع / الصناعة (Factory)
    // ------------------------------------
    factory: {
        infoTitle: "معلومات المصنع",
        nameLabel: "اسم المصنع",
        activityLabel: "نشاط المصنع",
        selectActivityPlaceholder: "اختر نشاط المصنع",
        productsHeader: "المنتجات التي يقدمها المصنع",
        addProductButton: "إضافة منتج",
        tableActions: "إجراءات",
        noProducts: "لا توجد منتجات مضافة بعد.",
        foodIndustry: "مصانع الصناعات الغذائية",
        relatedActivityExamples: "أمثلة الأنشطة ذات الصلة:",

        modal: {
            addNewTitle: "إضافة منتج جديد",
            editTitle: "تعديل المنتج",
            imageLabel: "صورة المنتج",
            nameLabel: "اسم المنتج",
            detailsLabel: "التفاصيل",
            namePlaceholder: "اسم المنتج",
            detailsPlaceholder: "اكتب هنا التفاصيل",
            selectImage: "اختيار صورة",
            cancel: "إلغاء",
            add: "إضافة",
            save: "حفظ التعديلات",
            uploading: "جاري الرفع...",
            uploadFailed: "فشل الرفع! الرجاء المحاولة مجدداً.",
            fileNotSelected: "لم يتم اختيار ملف.",
            requiredField: "هذا الحقل مطلوب.",
            validationError: "يرجى ملء جميع الحقول المطلوبة.",
        },
        deleteConfirm: {
            title: "تأكيد الحذف",
            message: "هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.",
            confirm: "نعم، احذف",
        },
    },

    // ------------------------------------
    // 7. نموذج العنوان (Address Form Modal)
    // ------------------------------------
    addressForm: {
        title: "إضافة عنوان",
        country: "البلد",
        city: "المدينة",
        area: "المنطقة",
        streetOrDistrict: "الشارع أو الحي",
        buildingNumber: "رقم البناية",
        floor: "الطابق",
        officeNumber: "رقم المكتب",
        otherDetails: "تفاصيل أخرى",
        poBox: "صندوق البريد",
        zipCode: "الرمز البريدي",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        fax: "الفاكس",
        mobile1: "موبايل 1",
        mobile2: "موبايل 2",
        addButton: "إضافة",
        required: "*",
        cancelButton: "إلغاء",
        requiredFields: "يرجى ملء الحقول المطلوبة: البلد، المدينة، الشارع أو الحي.",
    },

    // ------------------------------------
    // 8. عناصر واجهة المستخدم العامة (Buttons/Links)
    // ------------------------------------
    buttons: {
        next: "التالي",
        prev: "السابق",
        save: "حفظ",
        close: "إغلاق",
    },

    // ------------------------------------
    // 9. صفحة تسجيل الدخول (Login)
    // ------------------------------------
    login: {
        title: "تسجيل الدخول",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        loginBtn: "تسجيل الدخول",
        noAccount: "ليس لديك حساب؟",
        register: "تسجيل",
    },

    // ------------------------------------
    // 10. صفحة رمز التحقق (OTP)
    // ------------------------------------
    otp: {
        title: "التحقق من الحساب",
        subtext: "أدخل رمز التحقق",
        timerText: "إعادة الإرسال بعد",
        button: "تحقق من الحساب",
    },

    // ------------------------------------
    // 11. صفحة التسجيل (Registration)
    // ------------------------------------
    registration: {
        title: "إنشاء حساب جديد",
        name: "الاسم",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        haveAccount: "هل لديك حساب؟",
        login: "تسجيل الدخول",
        submit: "إنشاء الحساب",
    },

    // ------------------------------------
    // 12. صفحة الترحيب (Welcome)
    // ------------------------------------
    welcome: {
        industrial: "منشأة صناعية",
        industrialSub: "(مصنع)",
        industrialInfo: "بيانات المصنع",
        industrialDocs: "المستندات المطلوبة",

        nonIndustrial: "منشأة غير صناعية",
        nonIndustrialSub: "(شركة)",
        nonIndustrialInfo: "بيانات الشركة",
        nonIndustrialDocs: "المستندات المطلوبة",

        startBtn: "ابدأ بتسجيل منشأتك",

        factoryItems: [
            "اسم المصنع",
            "موقع وعنوان المصنع",
            "سنة التأسيس",
            "رأس المال",
            "المنتجات المقدمة",
        ],
        factoryDocs: ["الشهادات التخصصية", "شهادة تسجيل المصنع"],

        companyItems: [
            "اسم الشركة",
            "موقع وعنوان الشركة",
            "سنة التأسيس",
            "رأس المال",
            "نوع الشركة",
            "شكل الشركة",
            "طريقة الإدارة",
            "اسم المدير المفوض",
        ],

        companyDocs: ["الشهادات التخصصية", "شهادات تسجيل الشركة"],
    },
    
    // ------------------------------------
    // 13. نموذج إضافة منتج (AddProduct)
    // ------------------------------------
    addProduct: {
        title: "إضافة منتج جديد",
        productName: "إسم المنتج",
        productNamePlaceholder: "إسم المنتج",
        details: "التفاصيل",
        detailsPlaceholder: "اكتب هنا التفاصيل",
        productImage: "صورة المنتج",
        uploadImage: "رفع صورة",
        submitButton: "إضافة",
    },
    
    // ------------------------------------
    // 14. إدارة الشهادات (Certificates)
    // ------------------------------------
    certificates: {
        title: "الشهادات المتخصصة",
        placeholder: "اكتب هنا اسم الشهادة الاختصاصية",
        dropdownPlaceholder: "اختيار",
        option1: "خيار 1",
        option2: "خيار 2",
        option3: "خيار 3",
        addButton: "إضافة",
        tableName: "إسم الشهادة",
        tableAction: "الإجراء",
        noCertificates: "لا توجد شهادات متخصصة حاليًا.",
        saveButton: "حفظ",
        alertSuccess: "تم حفظ الشهادات بنجاح",
        alertEdit: "جاري تعديل الشهادة رقم: {id} - (في التطبيق الحقيقي سيفتح نموذج التعديل)",
        deleteAriaLabel: "حذف",
        editAriaLabel: "تعديل",
        modalTitle: "تأكيد الحذف",
        modalMessage: "هل أنت متأكد من حذف هذه الشهادة؟",
        modalConfirm: "حذف",
        modalCancel: "إلغاء",
    },
    
    // ------------------------------------
    // 15. Sidebar Labels
    // ------------------------------------
    sidebar: {
        mainTitleCompany: "تسجيل شركة جديدة",
        mainTitleFactory: "تسجيل مصنع جديد",
        establishmentInfo: "معلومات المنشأة",
        factory: "مصنع",
        company: "شركة",
        iraqi: "عراقية",
        foreign: "أجنبية",
        basicInfo: "المعلومات الأساسية",
        factoryInfo: "معلومات المصنع",
        companyInfo: "معلومات الشركة",
        documentationTitleCompany: "توثيق الشركة",
        documentationTitleFactory: "توثيق المصنع",

        // حقول الخطوة الثالثة (معلومات المنشأة)
        companyNameLabel: "اسم الشركة",
        activityLabel: "أنشطة الشركة",
        companyTypeLabel: "نوع الشركة",
        companyFormLabel: "شكل الشركة",
        managementMethodLabel: "طريقة الإدارة",
        managerNameLabel: "اسم المدير",
        
        factoryNameLabel: "اسم المصنع",
        factoryActivityLabel: "نشاط المصنع",
        factoryProductsLabel: "المنتجات",
        
        // حقول الخطوة الرابعة (البيانات المالية والتوثيق)
        capitalLabel: "رأس المال"
    }
};