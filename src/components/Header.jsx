import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Header = ({ title, color, navigation }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    // this looks strange in the url but it was the only way I could fix
    // an issue with refreshing
    navigate("/poke-stop/");
  };

  return (
    <header className="app-header" style={{ backgroundColor: color }}>
      <div className="container header-content" style={{ display: "flex" }}>
        <h3 onClick={handleTitleClick}>{title}</h3>
        <nav>
          <ul style={{ listStyleType: "none", display: "flex", gap: "10px" }}>
            {navigation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  navigation: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
