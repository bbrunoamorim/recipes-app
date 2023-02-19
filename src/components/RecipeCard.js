import PropTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="max-w-sm bg-white border border-gray-200 rounded-lg
      my-2 mx-1 shadow dark:bg-gray-800 dark:border-gray-700 pb-3"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe.image }
        alt={ recipe.name }
        className="rounded-t-lg shadow"
      />
      <span
        data-testid={ `${index}-card-name` }
        className="ml-1 font-normal text-gray-700 dark:text-gray-400 p-1 truncate text-sm"
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
