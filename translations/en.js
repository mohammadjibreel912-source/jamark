export default {
    // ------------------------------------
    // 1. Step 1: Establishment Type Selection
    // ------------------------------------
    step1: {
        foreignCompany: "Foreign Establishment",
        iraqiCompany: "Iraqi Establishment",
        industrial: "Industrial Establishment",
        nonIndustrial: "Non-Industrial Establishment",

        foreignSetup: "Foreign",
        iraqiSetup: "Iraqi",
        factory: "Factory",
        company: "Company",
    },

    // ------------------------------------
    // 2. Step 2: Basic Contact Information
    // ------------------------------------
    step2: {
        basicInfo: "Basic Information",
        name: "Name",
        email: "Email",
        phone: "Phone",

        validation: {
            nameRequired: "The Name field is required.",
            emailRequired: "The Email field is required.",
            phoneRequired: "The Phone number is required.",
            invalidEmail: "Please enter a valid email address format.",
        },
    },

    // ------------------------------------
    // 3. Step 3: Non-Industrial Company Information
    // ------------------------------------
    step3: {
        companyInformation: "Company Information",
        companyName: "Company Name",
        companyNamePlaceholder: "Enter full company name",

        companyActivities: "Company Activities",
        activitiesSelected: "Selected",
        chooseActivity: "Select company activity...",
        selectActivitiesTitle: "Select Company Activities",

        companyType: "Company Type",
        companyForm: "Company Form",

        managementMethodCompany: "Management Method",
        authorizedManagerName: "Authorized Manager Name",
        managerNamePlaceholder: "Enter full name of the authorized manager",

        selectOptionPlaceholder: "Select an option",
        loading: "Loading...",
        chooseCompanyType: "Choose Company Type",
        chooseCompanyForm: "Choose Company Form",
        chooseManagementMethod: "Choose Management Method",

        validation: {
            requiredField: "This field is required.",
            companyNameRequired: "Company name is required.",
            activitiesRequired: "At least one company activity must be selected.",
            companyTypeRequired: "Company Type is required.",
            companyFormRequired: "Company Form is required.",
            managementMethodRequired: "Management Method is required.",
            managerNameRequired: "Authorized Manager Name is required.",
        },
    },

    // ------------------------------------
    // 4. Step 4: Factory/Company Documentation and Details
    // ------------------------------------
    step4: {
        // General Keys (Used for both Factory/Company)
        factoryDocumentation: "Establishment Documentation", 
        factoryName: "Establishment Name", 
        factoryNamePlaceholder: "As in registration certificate",
        factoryLocation: "Establishment Location", 
        factoryLocationPlaceholder: "Google Maps link or coordinates",
        
        // Keys needed for Address/Location/Certificate building
        address: "Address",
        location: "Location",
        certificate: "Certificate", 
        registration: "Registration", 
        addressFactoryPlaceholder: "Click plus to enter address",
        uploadFilePlaceholder: "Select a file...", // Added based on ar.js
        plusIconAlt: "Plus icon", 

        // Document Fields
        registrationCertificate: "Registration Certificate",
        specialtyCertificates: "Specialty Certificates (ISO, FSSC, FDA, GMP, etc.)", 
        foundationYear: "Foundation Year",
        foundationYearPlaceholder: "Select Year",
        capital: "Capital",
        capitalPlaceholder: "Amount",
        notes: "Notes and Additional Comments",
        notesPlaceholder: "Additional notes",

        // --- Keys for File/Certificate Management ---
        uploadMultipleFiles: "Manage files by clicking the plus icon", 
        moreFiles: "More",

        // Non-Industrial Summary Fields (Company) - Retained for Step 4 summary display
        companyInformation: "Company Information",
        companyName: "Company Name",
        companyActivities: "Company Activities",
        activityPlaceholder: "Add an activity",
        companyType: "Company Type",
        companyTypePlaceholder: "Limited Liability Company",
        companyForm: "Company Form",
        companyFormPlaceholder: "Ordinary",
        managementMethod: "Management Method",
        managementMethodPlaceholder: "Authorized Manager",
        managerName: "Manager Name",
        managerNamePlaceholder: "Full Name",

        // Actions
        saveButton: "Save",
        formSubmitted: "Form submitted successfully!",
    },
    
    // ------------------------------------
    // 5. Step 5: Payment
    // ------------------------------------
    step5: {
        cardSection: {
            cardHolderName: "Card Holder Name",
            cardHolderNamePlaceholder: "Name as shown on card",
            cardNumber: "Card Number",
            cardNumberPlaceholder: "1234 5678 9101 1121",
            expiryDate: "Expiry Date",
            expiryDatePlaceholder: "MM/YY",
            cvv: "CVV",
            cvvPlaceholder: "123",
            visa: "VISA",
        },
        actions: {
            payAndSubmit: "Pay & Submit",
        },
        invoice: {
            title: "Invoice Summary",
            companyRegistration: "Company Registration",
            technicalSupport: "Technical Support",
            serviceTax: "Service Tax",
            totalLabel: "Total Amount",
        },
        pageTitle: "Electronic Payment",
    },

    // ------------------------------------
    // 6. Factory/Industrial Product Management
    // ------------------------------------
    factory: {
        infoTitle: "Factory Information",
        nameLabel: "Factory Name",
        activityLabel: "Factory Activity",
        selectActivityPlaceholder: "Select Factory Activity",
        productsHeader: "Products Offered by Factory",
        addProductButton: "Add Product",
        tableActions: "Actions",
        noProducts: "No products added yet.",
        foodIndustry: "Food Industry Factories",
        relatedActivityExamples: "Related Activity Examples:",

        modal: {
            addNewTitle: "Add New Product",
            editTitle: "Edit Product",
            imageLabel: "Product Image",
            nameLabel: "Product Name",
            detailsLabel: "Details",
            namePlaceholder: "Product Name",
            detailsPlaceholder: "Type details here",
            selectImage: "Select Image",
            cancel: "Cancel",
            add: "Add",
            save: "Save Changes",
            uploading: "Uploading...",
            uploadFailed: "Upload Failed! Please try again.",
            fileNotSelected: "No file selected.",
            requiredField: "This field is required.",
            validationError: "Please fill in all required fields.",
        },
        deleteConfirm: {
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this product? This action cannot be undone.",
            confirm: "Yes, Delete",
        },
    },

    // ------------------------------------
    // 7. Address Form Modal
    // ------------------------------------
    addressForm: {
        title: "Add Address",
        country: "Country",
        city: "City",
        area: "Area / State",
        streetOrDistrict: "Street or District",
        buildingNumber: "Building Number",
        floor: "Floor",
        officeNumber: "Office Number",
        otherDetails: "Other Details",
        poBox: "PO Box",
        zipCode: "Zip Code",
        email: "Email",
        phone: "Phone",
        fax: "Fax",
        mobile1: "Mobile 1",
        mobile2: "Mobile 2",
        addButton: "Add",
        required: "*",
        cancelButton: "Cancel",
        requiredFields: "Please fill in the required fields: Country, City, Street or District.",
    },

    // ------------------------------------
    // 8. General UI Elements (Buttons/Links)
    // ------------------------------------
    buttons: {
        next: "Next",
        prev: "Previous",
        save: "Save",
        close: "Close",
    },

    // ------------------------------------
    // 9. Login Page
    // ------------------------------------
    login: {
        title: "Login",
        email: "Email",
        password: "Password",
        loginBtn: "Login",
        noAccount: "Don't have an account?",
        register: "Register",
    },

    // ------------------------------------
    // 10. OTP Page
    // ------------------------------------
    otp: {
        title: "Account Verification",
        subtext: "Enter the OTP code",
        timerText: "Resend after",
        button: "Verify Account",
    },

    // ------------------------------------
    // 11. Registration Page
    // ------------------------------------
    registration: {
        title: "Create New Account",
        name: "Name",
        email: "Email",
        phone: "Phone",
        password: "Password",
        confirmPassword: "Confirm Password",
        haveAccount: "Already have an account?",
        login: "Login",
        submit: "Create Account",
    },

    // ------------------------------------
    // 12. Welcome Page
    // ------------------------------------
    welcome: {
        industrial: "Industrial Establishment",
        industrialSub: "(Factory)",
        industrialInfo: "Factory Information",
        industrialDocs: "Required Documents",

        nonIndustrial: "Non-Industrial Establishment",
        nonIndustrialSub: "(Company)",
        nonIndustrialInfo: "Company Information",
        nonIndustrialDocs: "Required Documents",

        startBtn: "Start Registering Your Establishment",

        factoryItems: [
            "Factory Name",
            "Factory Location and Address",
            "Year of Establishment",
            "Capital",
            "Products Offered",
        ],
        factoryDocs: ["Specialized Certificates", "Factory Registration Certificate"],

        companyItems: [
            "Company Name",
            "Company Location and Address",
            "Year of Establishment",
            "Capital",
            "Company Type",
            "Company Form",
            "Management Method",
            "Authorized Manager Name",
        ],

        companyDocs: ["Specialized Certificates", "Company Registration Certificates"],
    },

    // ------------------------------------
    // 13. Add Product Modal
    // ------------------------------------
    addProduct: {
        title: "Add New Product",
        productName: "Product Name",
        productNamePlaceholder: "Product Name",
        details: "Details",
        detailsPlaceholder: "Write details here",
        productImage: "Product Image",
        uploadImage: "Upload Image",
        submitButton: "Add",
    },
    
    // ------------------------------------
    // 14. Certificates Management
    // ------------------------------------
    certificates: {
        title: "Specialty Certificates",
        placeholder: "Write the specialty certificate name here",
        dropdownPlaceholder: "Select",
        option1: "Option 1",
        option2: "Option 2",
        option3: "Option 3",
        addButton: "Add",
        tableName: "Certificate Name",
        tableAction: "Action",
        noCertificates: "No specialty certificates currently available.",
        saveButton: "Save",
        alertSuccess: "Certificates saved successfully",
        alertEdit: "Editing certificate no: {id} - (In a real app, an edit form would open)",
        deleteAriaLabel: "Delete",
        editAriaLabel: "Edit",
        modalTitle: "Confirm Deletion",
        modalMessage: "Are you sure you want to delete this certificate?",
        modalConfirm: "Delete",
        modalCancel: "Cancel",
    },
    
    // ------------------------------------
    // 15. Sidebar Labels
    // ------------------------------------
    sidebar: {
        mainTitleCompany: "Register New Company",
        mainTitleFactory: "Register New Factory",
        establishmentInfo: "Establishment Information",
        factory: "Factory",
        company: "Company",
        iraqi: "Iraqi",
        foreign: "Foreign",
        basicInfo: "Basic Information",
        factoryInfo: "Factory Information",
        companyInfo: "Company Information",
        documentationTitleCompany: "Company Documentation",
        documentationTitleFactory: "Factory Documentation",

        // Step 3 Fields (Establishment Info)
        companyNameLabel: "Company Name",
        activityLabel: "Company Activity",
        companyTypeLabel: "Company Type",
        companyFormLabel: "Company Form",
        managementMethodLabel: "Management Method",
        managerNameLabel: "Manager Name",
        
        factoryNameLabel: "Factory Name",
        factoryActivityLabel: "Factory Activity",
        factoryProductsLabel: "Products",
        
        // Step 4 Fields (Financial/Documentation)
        capitalLabel: "Capital"
    }
};