import { useState, useEffect } from 'react';
import pokemon from 'pokemontcgsdk';

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
					<h1 className='card-name'>{card.name}</h1>
					<img src={card.images.small} alt={card.name} className='card-image'/>
				</div>
			))}
		</div>
	);
};

export default CardData;
