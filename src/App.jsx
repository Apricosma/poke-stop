import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import CardData from "./components/CardData";
import CardDetails from "./components/CardDetails";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { page } = useParams();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/${pageNumber}`);
  };

  // Update the currentPage state when the page parameter changes
  useEffect(() => {
    const pageNumber = page ? parseInt(page, 10) : 1;
    setCurrentPage(pageNumber);
  }, [page]);

  return (
    <>
      <Header
        title="PokeStop"
        color="var(--background-color-light)"
        navigation={["Home", "About", "Contact"]}
      />

      <Routes>
        <Route
          path="/"
          element={<CardData pageSize={10} page={currentPage} />}
        />
        <Route
          path="/:page"
          element={<CardData pageSize={10} page={currentPage} />}
        />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </>
  );
}

export default App;
