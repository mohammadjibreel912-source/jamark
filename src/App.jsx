import { AppProvider } from "../context/AppContext";
import { LanguageProvider } from "../context/LanguageContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import StepperPage from "../components/StepperPage";
import RegistrationPage from "../components/RegistrationPage";
import OTPVerificationPage from "../components/OTPVerificationPage";
import LoginPage from "../components/LoginPage";
import LanguageSwitcher from "../components/LanguageSwitcher";

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
          </Routes>
        </Router>
      </LanguageProvider>
    </AppProvider>
  );
}

export default App;
