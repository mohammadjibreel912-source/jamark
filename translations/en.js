export default {
    // ------------------------------------
    // 1. Step 1: Establishment Type Selection
    // ------------------------------------
    step1: {
        foreignCompany: "Foreign Establishment",
        iraqiCompany: "Iraqi Establishment",
        industrial: "Industrial Establishment",
        nonIndustrial: "Non-Industrial Establishment",

        // Text inside parentheses ()
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
            // General
            requiredField: "This field is required.",

            // Step 3 Specific Errors
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
        // Document & Detail Fields (Used for both Factory/Company)
        factoryDocumentation: "Establishment Documentation", // Generalizing for both
        factoryName: "Establishment Name", // Generalizing for both
        factoryNamePlaceholder: "As in registration certificate",
        factoryLocation: "Establishment Location", // Generalizing for both
        factoryLocationPlaceholder: "Google Maps link or coordinates",
        registrationCertificate: "Registration Certificate",
        specialtyCertificates: "Specialty Certificates (ISO, FSSC, FDA, GMP, etc.)",
        foundationYear: "Foundation Year",
        foundationYearPlaceholder: "Select Year",
        capital: "Capital",
        capitalPlaceholder: "Amount",
        notes: "Notes and Additional Comments",
        notesPlaceholder: "Additional notes",

        // Non-Industrial Summary/Detail Fields
        companyInformation: "Company Information",
        companyName: "Company Name",
        companyNamePlaceholder: "As on registration certificate",
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

        // General
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
};