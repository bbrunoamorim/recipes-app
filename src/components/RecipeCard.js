import PropTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="w-1/2 mb-4 min-w-fit px-3 py-2
      shadow-xl mr-3 rounded-lg text-center bg-yellow-300"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe.image }
        alt={ recipe.name }
        className="w-32"
      />
      <span
        data-testid={ `${index}-card-name` }
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
