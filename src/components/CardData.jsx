import { useState, useEffect } from "react";
import pokemon from "pokemontcgsdk";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import SortButton from "./SortButton";

pokemon.configure({ apiKey: import.meta.env.VITE_POKEMON_API_KEY });

const CardData = ({ pageSize, page }) => {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
	const [activeButton, setActiveButton] = useState(null);

  // get card data
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const result = await pokemon.card.where({ pageSize, page });
        setCardData(result.data);
      } catch (error) {
        navigate("/404");
      }
    };

    fetchCardData();
  }, [pageSize, page, navigate]);

  // set current page
  useEffect(() => {
    const pageNumber = location.state?.pageNumber || 1;
    setCurrentPage(pageNumber);
  }, [location]);

  const handleCardClick = (cardId) => {
    navigate(`/card/${cardId}`);
  };

  if (!cardData) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/${pageNumber}`, { state: { pageNumber } });
  };

  const handleSort = (sortType, isAscending) => {
    const sortedData = [...cardData];

    switch (sortType) {
      case "name":
        sortedData.sort((a, b) =>
          isAscending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
        break;
      case "price":
        sortedData.sort((a, b) =>
          isAscending
            ? a.cardmarket?.prices?.averageSellPrice -
              b.cardmarket?.prices?.averageSellPrice
            : b.cardmarket?.prices?.averageSellPrice -
              a.cardmarket?.prices?.averageSellPrice
        );
        break;

      default:
        break;
    }

    setCardData(sortedData);
  };

  return (
    <>
      <div className="pagination container button-list">
        <SortButton sortType="name" onSort={handleSort} activeButton={activeButton} 
          setActiveButton={setActiveButton} />
        <SortButton sortType="price" onSort={handleSort} activeButton={activeButton} 
          setActiveButton={setActiveButton} />
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      <div className="container index-wrapper">
        <div className="card-grid">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="card"
              onClick={() => handleCardClick(card.id)}
            >
              <img
                src={card.images.small}
                alt={card.name}
                className="card-image"
              />
              <div className="card-container">
                <h3 className="card-name">{card.name}</h3>
                <p>${card.cardmarket?.prices?.averageSellPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

CardData.propTypes = {
  pageSize: PropTypes.number,
  page: PropTypes.number,
};

export default CardData;
