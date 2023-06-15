import { useState, useEffect } from 'react';
import pokemon from 'pokemontcgsdk';
import PropTypes from 'prop-types';

pokemon.configure({ apiKey: import.meta.env.VITE_POKEMON_API_KEY });

const CardData = ({ pageSize, page }) => {
	const [cardData, setCardData] = useState([]);

	useEffect(() => {
		pokemon.card.where({ pageSize, page })
			.then(result => {
				setCardData(result.data);
				console.log(result);
			})
	}, [pageSize, page]);

	if (!cardData) {
		return <div>Loading...</div>;
	}

	return (
		<div className='card-grid'>
			{cardData.map(card => (
				<div key={card.id} className='card'>
					<img src={card.images.small} alt={card.name} className='card-image' />
					<div className='card-container'>
						<h3 className='card-name'>{card.name}</h3>
						<p>${card.cardmarket.prices.averageSellPrice}</p>
					</div>
				</div>
			))}
		</div>
	);
};

CardData.propTypes = {
	pageSize: PropTypes.number,
	page: PropTypes.number,
}

export default CardData;
