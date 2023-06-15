import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardData from "../components/CardData";
import PropTypes from "prop-types";

function CardDataPage({ pageSize }) {
  const location = useLocation();
  const currentPage = location.state?.pageNumber || 1;

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return <CardData pageSize={pageSize} page={currentPage} />;
}

// prop validation
CardDataPage.propTypes = {
  pageSize: PropTypes.number.isRequired,
}

export default CardDataPage;
