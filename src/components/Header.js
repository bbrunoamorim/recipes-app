import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import SearchBar from './SearchBar';
import MyContext from '../context/MyContext';

function Header({ title, notSearchIcon }) {
  const { handleVisivelInput, inputVisivel } = useContext(MyContext);

  const history = useHistory();

  const profileRoute = () => (
    history.push('/profile')
  );

  return (
    <section>
      <div className="flex justify-between p-2 bg-violet-600 mb-3 items-center">
        <img src="recipe.png" alt="logo" width="40px" className="ml-4" />
        <h4 className="mt-2 text-white">Tchuplim Receitas</h4>
        <div>
          { !notSearchIcon && (
            <button
              type="button"
              data-testid="search-btn"
              onClick={ handleVisivelInput }
            >
              <img
                data-testid="search-top-btn"
                src="search.png"
                alt="search-btn"
              />
            </button>
          ) }
          <button
            type="button"
            data-testid="profile-btn"
            onClick={ profileRoute }
            className="ml-8 mr-4"
          >
            <img
              data-testid="profile-top-btn"
              src="user.png"
              alt="Icon Profile"
            />
          </button>
        </div>
      </div>
      <div>
        { inputVisivel && (
          <SearchBar title={ title } />
        ) }
      </div>
      <div className="flex items-center justify-center">
        <img
          src={ title === 'Meals' ? 'meal.svg' : 'drink.svg' }
          alt="meal-icon"
          width="50px"
          className="mr-5"
        />
        <h1 data-testid="page-title" className="text-center mt-3">{ title }</h1>
      </div>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.any,
}.isRequired;

export default Header;
