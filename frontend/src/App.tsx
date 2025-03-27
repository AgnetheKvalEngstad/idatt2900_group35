import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TopicPage from "./pages/TopicPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-grow flex">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/topic/" element={<TopicPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
