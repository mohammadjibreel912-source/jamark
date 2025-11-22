import { AppProvider } from "../context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
