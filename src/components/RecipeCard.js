import PropTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="max-w-sm bg-white border border-gray-200 rounded-lg
      my-1 mx-1 shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe.image }
        alt={ recipe.name }
        className="rounded-t-lg"
      />
      <span
        data-testid={ `${index}-card-name` }
        className="mb-3 font-normal text-gray-700 dark:text-gray-400 p-1 truncate text-xs"
      >
        { recipe.name }
      </span>
    </div>
  );
}
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
