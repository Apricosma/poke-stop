import PropTypes from 'prop-types';

const Header = ({ title, color, navigation }) => {
	return (
		<header className='app-header' style={{ backgroundColor: color }}>
			<div className='container header-content' style={{display: 'flex'}}>
				<h3>{title}</h3>
				<nav>
					<ul style={{ listStyleType: 'none', display: 'flex', gap: '10px' }}>
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
