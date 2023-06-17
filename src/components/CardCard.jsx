import PropTypes from "prop-types";

const Card = ({ card, onCardClick }) => {
  return (
    <div key={card.id} className="card" onClick={() => onCardClick(card.id)}>
      <img
        className="card-image"
        src={card.images.small}
        alt={card.name}
      />
      <div className="card-container">
        <h2 className="card-name">{card.name}</h2>
        <p>${card.cardmarket?.prices?.averageSellPrice}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Card;
