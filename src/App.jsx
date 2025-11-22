import { AppProvider } from "../context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import StepperPage from "../components/StepperPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/stepper" element={<StepperPage />} />

        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
