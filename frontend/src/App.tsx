import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TopicPage from "./pages/TopicPage";
import OnboardingPage from "./pages/OnboardingPage";
import ProfilePage from "./pages/ProfilePage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";

/**
 * Main App component that sets up the routing and layout of the application.
 *
 * @returns The main App component.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow flex justify-center items-center">
            <Routes>
              <Route path="/" element={<OnboardingPage />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/topic/" element={<TopicPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
