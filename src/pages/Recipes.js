import PropTypes from 'prop-types';

import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes({ location: { pathname } }) {
  return (
    <div className="bg-zinc-100">
      {
        pathname.includes('meals')
          ? <Meals />
          : <Drinks />
      }
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
