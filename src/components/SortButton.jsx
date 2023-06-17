import { useState } from 'react';
import PropTypes from 'prop-types';

const SortButton = ({ sortType, onSort, activeButton, setActiveButton }) => {
  const [isAscending, setIsAscending] = useState(true);

  const handleClick = () => {
    setIsAscending((prevIsAscending) => !prevIsAscending);
    setActiveButton(sortType);
    onSort(sortType, isAscending);
  };

  const buttonStyle = {
    color: activeButton === sortType ? 'var(--primary-color)' : 'white',
  };

  return (
    <button onClick={handleClick} style={buttonStyle} className='sort-button'>
      Sort by {sortType} ({isAscending ? 'Ascending' : 'Descending'})
    </button>
  );
};

SortButton.propTypes = {
  sortType: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  activeButton: PropTypes.string,
  setActiveButton: PropTypes.func.isRequired,
};

export default SortButton;
