import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="min-h-screen max-h-screen flex flex-col">
      <Header />
      <div className="flex-grow overflow-auto">
        <Homepage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
