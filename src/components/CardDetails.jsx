import { useState, useEffect } from "react";
import pokemon from "pokemontcgsdk";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import Collapse from "react-collapse";
import { Helmet } from "react-helmet";

pokemon.configure({ apiKey: import.meta.env.VITE_POKEMON_API_KEY });

const CardDetails = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isAbilitiesOpen, setIsAbilitiesOpen] = useState(false);
  const [isAttacksOpen, setIsAttacksOpen] = useState(false);
  const [isWeaknessesOpen, setIsWeaknessesOpen] = useState(false);
  const [isResistancesOpen, setIsResistancesOpen] = useState(false);
  const [isSetOpen, setIsSetOpen] = useState(false);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const card = await pokemon.card.find(id);
        setCardData(card);
      } catch (error) {
        setError(error);
      }
    };

    fetchCardData();
  }, [id]);

  if (error) {
    navigate("/404");
    return null;
  }

  if (!cardData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>PokeStop | {cardData.name}</title>
      </Helmet>
      <div className="container details-wrapper">
        <div className="card-details">
          <img
            src={cardData.images.small}
            alt={cardData.name}
            className="card-image-details"
          />
          <div className="details-container">
            <h3 className="card-name-details">{cardData.name}</h3>
            <p>Card Id: {cardData.id}</p>
            <p>Artist: {cardData.artist}</p>
            <p>HP: {cardData.hp}</p>

            <p>Supertype: {cardData.supertype}</p>
            <p>Subtypes: {cardData.subtypes.join(", ")}</p>
            {cardData.level ? (
              <p>Level: {cardData.level}</p>
            ) : (
              <p>Level: N/a</p>
            )}

            <p>Types: {cardData.types.join(", ")}</p>
            <p>Rarity: {cardData.rarity ? cardData.rarity : "N/a"}</p>

            <p>
              Evolves From:{" "}
              {cardData.evolvesFrom ? cardData.evolvesFrom : "None"}
            </p>
            <p>
              Evolves To:{" "}
              {cardData.evolvesTo ? cardData.evolvesTo.join(", ") : "None"}
            </p>

            <p>
              Average Sell Price (Cardmarket): $
              {cardData.cardmarket.prices.averageSellPrice}
            </p>
            <p>
              Low Price (Cardmarket): ${cardData.cardmarket.prices.lowPrice}
            </p>

            <p>
              Flavortext: {cardData.flavorText ? cardData.flavorText : "N/a"}
            </p>

            {cardData.abilities?.length > 0 && (
              <div className="drawer-wrapper">
                <h4
                  className="drawer"
                  onClick={() => setIsAbilitiesOpen(!isAbilitiesOpen)}
                >
                  Abilities <span>{isAbilitiesOpen ? "-" : "+"}</span>
                </h4>
                <Collapse isOpened={isAbilitiesOpen}>
                  {cardData.abilities.map((ability, index) => (
                    <div key={index}>
                      <p>Name: {ability.name}</p>
                      <p>Type: {ability.type}</p>
                      <p>Text: {ability.text}</p>
                    </div>
                  ))}
                </Collapse>
              </div>
            )}

            {cardData.attacks?.length > 0 && (
              <div className="drawer-wrapper">
                <h4
                  className="drawer"
                  onClick={() => setIsAttacksOpen(!isAttacksOpen)}
                >
                  Attacks <span>{isAttacksOpen ? "-" : "+"}</span>
                </h4>
                <Collapse isOpened={isAttacksOpen}>
                  {cardData.attacks.map((attack, index) => (
                    <div key={index} className="attack-container">
                      <p>Name: {attack.name}</p>
                      <p>Cost: {attack.cost.join(", ")}</p>
                      <p>Converted Energy Cost: {attack.convertedEnergyCost}</p>
                      <p>Damage: {attack.damage}</p>
                      <p>Text: {attack.text}</p>
                    </div>
                  ))}
                </Collapse>
              </div>
            )}

            {cardData.weaknesses?.length > 0 && (
              <div className="drawer-wrapper">
                <h4
                  className="drawer"
                  onClick={() => setIsWeaknessesOpen(!isWeaknessesOpen)}
                >
                  Weaknesses <span>{isWeaknessesOpen ? "-" : "+"}</span>
                </h4>
                <Collapse isOpened={isWeaknessesOpen}>
                  {cardData.weaknesses.map((weakness, index) => (
                    <div key={index}>
                      <p>Type: {weakness.type}</p>
                      <p>Value: {weakness.value}</p>
                    </div>
                  ))}
                </Collapse>
              </div>
            )}

            {cardData.resistances?.length > 0 && (
              <div className="drawer-wrapper">
                <h4
                  className="drawer"
                  onClick={() => setIsResistancesOpen(!isResistancesOpen)}
                >
                  Resistances <span>{isResistancesOpen ? "-" : "+"}</span>
                </h4>
                <Collapse isOpened={isResistancesOpen}>
                  {cardData.resistances.map((resistance, index) => (
                    <div key={index}>
                      <p>Type: {resistance.type}</p>
                      <p>Value: {resistance.value}</p>
                    </div>
                  ))}
                </Collapse>
              </div>
            )}

            {cardData.set && (
              <div className="drawer-wrapper">
                <h4 className="drawer" onClick={() => setIsSetOpen(!isSetOpen)}>
                  Set <span>{isSetOpen ? "-" : "+"}</span>
                </h4>
                <Collapse isOpened={isSetOpen}>
                  <div>
                    <p>ID: {cardData.set.id}</p>
                    <p>Name: {cardData.set.name}</p>
                    <p>Series: {cardData.set.series}</p>
                    <p>Total Printed: {cardData.set.printedTotal}</p>
                    <p>Total: {cardData.set.total}</p>
                    <p>
                      Legalities: Unlimited -{" "}
                      {cardData.set.legalities.unlimited}
                    </p>
                    <p>PTCGO Code: {cardData.set.ptcgoCode}</p>
                    <p>Release Date: {cardData.set.releaseDate}</p>
                  </div>
                </Collapse>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

CardDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CardDetails;
