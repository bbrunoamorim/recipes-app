import PropTypes from 'prop-types';

function CategoryButton({ name, onClick }) {
  return (
    <button
      data-testid={ `${name}-category-filter` }
      type="button"
      onClick={ onClick }
      className="mr-2 outline outline-1 p-1 rounded-lg
       outline-violet-600 text-sm w-20 hover:bg-violet-600 hover:text-white"
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
