import PropTypes from 'prop-types';

import Drinks from '../components/Drinks';
import Meals from '../components/Meals';

export default function Recipes({ location: { pathname } }) {
  return (
    <div className="min-h-screen font-outfit">
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
