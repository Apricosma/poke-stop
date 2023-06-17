import { useState } from "react";
import pokemon from "pokemontcgsdk";
import { useNavigate } from "react-router-dom";

pokemon.configure({ apiKey: import.meta.env.VITE_POKEMON_API_KEY });

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    
    try {
      const result = await pokemon.card.where({ q: `name:${searchTerm}` });
      if (result.data.length === 0) {
        setSearchMessage("No results found.");
      } else {
        setSearchMessage("");
        navigate("/search", { state: { searchResults: result.data } });
      }
    } catch (error) {
      navigate("/404");
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="search-bar">
        <input 
          type="text"
          placeholder="Search for a pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      {searchMessage && <p className="search-message">{searchMessage}</p>}
    </div>
  );
};

export default Search;
