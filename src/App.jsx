import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CardDataPage from "./pages/CardDataPage";
import CardDetails from "./components/CardDetails";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <div className="main-wrapper">
      <Header
        title="PokeStop"
        color="var(--background-color-light)"
        navigation={["Home", "About", "Contact"]}
      />

      <Routes>
        <Route path="/:page" element={<CardDataPage pageSize={20} />} />
        <Route path="/" element={<CardDataPage pageSize={20} />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
