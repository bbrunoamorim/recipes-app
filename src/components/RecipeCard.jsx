import PropTypes from 'prop-types';

export default function RecipeCard({ recipe }) {
  return (
    <div
      className="rounded-b-xl pb-2 my-2 mx-auto border-2 border-orange-300
      text-center bg-orange-100"
    >
      <img
        src={ recipe.image }
        alt={ recipe.name }
        className="shadow-xl w-44 object-cover mx-auto mb-2"
      />
      <span
        className="ml-2 text-gray-600 p-1 text-sm"
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
};
