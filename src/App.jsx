import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import "./App.css";
import CardData from "./components/CardData";
import CardDetails from "./components/CardDetails";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1;
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/${pageNumber}`, { state: { pageNumber } });
  };

  useEffect(() => {
    const pageNumber = location.state?.pageNumber || 1;
    setCurrentPage(pageNumber);
  }, [location.state?.pageNumber]);

  // Update the currentPage state when the page parameter changes
  useEffect(() => {
    const currentPageFromUrl = location.pathname.substring(1);
    let pageNumber = parseInt(currentPageFromUrl, 10);
    if (isNaN(pageNumber)) {
      pageNumber = 1; // default to page 1 if the URL doesn't contain a valid page number
    }
    setCurrentPage(pageNumber);
    sessionStorage.setItem("currentPage", currentPage);
  }, [location.pathname, location.state?.pageNumber]);

  return (
    <>
      <Header
        title="PokeStop"
        color="var(--background-color-light)"
        navigation={["Home", "About", "Contact"]}
      />

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>

      <Routes>
        <Route
          path="/:page"
          element={<CardData pageSize={10} page={currentPage} />}
        />
        <Route
          path="/"
          element={<CardData pageSize={10} page={currentPage} />}
        />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
