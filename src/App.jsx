import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import CardDataPage from "./pages/CardDataPage";
import CardDetails from "./components/CardDetails";
import NotFound from "./components/NotFound";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/${pageNumber}`, { state: { pageNumber } });
  };

  useEffect(() => {
    const pageNumber = location.state?.pageNumber || 1;
    setCurrentPage(pageNumber);
  }, [location]);

  return (
    <>
      <Header
        title="PokeStop"
        color="var(--background-color-light)"
        navigation={["Home", "About", "Contact"]}
      />

      <div className="pagination">
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>

      <Routes>
        <Route path="/:page" element={<CardDataPage pageSize={20} />} />
        <Route path="/" element={<CardDataPage pageSize={20} />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
