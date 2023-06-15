import { useState, useEffect } from 'react';
import pokemon from 'pokemontcgsdk';
import { useParams, useNavigate } from 'react-router-dom';

pokemon.configure({ apiKey: import.meta.env.VITE_POKEMON_API_KEY });

const CardDetails = () => {
	const { id } = useParams();
	const [cardData, setCardData] = useState(null);
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	useEffect(() => {
		pokemon.card.find(id)
			.then(card => {
				setCardData(card);
				console.log(card);
			}).catch(err => {
				setError(err);
				console.log(err);
			})
	}, [id]);

	if (error) {
		navigate('/404');
		return null;
	}

	if (!cardData) {
		return <div>Loading...</div>;
	}

	return (
		<div >
			<div className='card-details'>
				<img src={cardData.images.small} alt={cardData.name} className='card-image-details' />
				<div className='container'>
					<h3 className='card-name-details'>{cardData.name}</h3>
					<p>${cardData.cardmarket.prices.averageSellPrice}</p>
				</div>
			</div>
		</div>
	);
};

export default CardDetails;
