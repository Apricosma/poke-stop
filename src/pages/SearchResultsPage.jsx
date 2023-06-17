import { useLocation, useNavigate } from "react-router-dom";
import Search from "../components/Search";
import CardCard from "../components/CardCard";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    navigate(`/card/${cardId}`);
  };

  return (
    <div className="container">
      <h1>Search Results:</h1>
      <Search />
      <div className="card-grid">
        {searchResults.map((card) => (
          <CardCard key={card.id} card={card} onCardClick={handleCardClick}/>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
