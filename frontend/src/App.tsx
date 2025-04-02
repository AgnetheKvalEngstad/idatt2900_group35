import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TopicPage from "./pages/TopicPage";
import OnboardingPage from "./pages/OnboardingPage";
import ProfilePage from "./pages/ProfilePage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col min-h-screen">
        <Router>
          <Header />
          <div className="flex-grow flex">
            <Routes>
              <Route path="/" element={<OnboardingPage />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/topic/" element={<TopicPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
