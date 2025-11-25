import { AppProvider } from "../context/AppContext";
import { LanguageProvider } from "../context/LanguageContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import StepperPage from "../components/StepperPage";
import RegistrationPage from "../components/RegistrationPage";
import OTPVerificationPage from "../components/OTPVerificationPage";
import LoginPage from "../components/LoginPage";
import LanguageSwitcher from "../components/LanguageSwitcher";
import CertificateUploadModal from "../components/CertificateUpload";
import CertificateUpload from "../components/CertificateUpload";
import AddressForm from "../components/AddressForm";
import Activities from "../components/Activities";
import Certificates from "../components/Certificates";
import DropzoneUploader from "../components/DropzoneUploader";
import AddProductForm from "../components/AddProductForm";
import ProductsTable from "../components/ProductsTable";

function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <Router>

          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/otp" element={<OTPVerificationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/stepper" element={<StepperPage />} />
                        <Route path="/cer" element={<CertificateUpload />} />
                        <Route path="/address" element={<AddressForm />} />
                        <Route path="/activites" element={<Activities />} />
                        <Route path="/cert" element={<Certificates />} />
                        <Route path="/drop" element={<DropzoneUploader />} />
                        <Route path="/addProd" element={<AddProductForm />} />
                        <Route path="/prod" element={<ProductsTable />} />

          </Routes>
        </Router>
      </LanguageProvider>
    </AppProvider>
  );
}

export default App;
