import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Pagination({ currentPage, onPageChange }) {
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
    navigate(`/${pageNumber}`, { state: { pageNumber } });
  };

  return (
    <>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination;
