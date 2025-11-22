import { AppProvider } from "../context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import StepperPage from "../components/StepperPage";
import RegistrationPage from "../components/RegistrationPage";
import OTPVerificationPage from "../components/OTPVerificationPage";
import LoginPage from "../components/LoginPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/stepper" element={<StepperPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/otp" element={<OTPVerificationPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
