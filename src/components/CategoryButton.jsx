import PropTypes from 'prop-types';

function CategoryButton({ name, onClick }) {
  return (
    <button
      data-testid={ `${name}-category-filter` }
      type="button"
      onClick={ onClick }
      className="mr-2 outline outline-1 p-1 rounded-lg text-xs
      outline-emerald-400 w-20 h-10 hover:bg-orange-400 hover:text-white
      hover:font-medium hover:outline-2 transition-all duration-150"
    >
      { name }
    </button>
  );
}

CategoryButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryButton;
