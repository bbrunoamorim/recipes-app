import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import SearchBar from './SearchBar';
import MyContext from '../context/MyContext';
import mealIcon from '../images/meal.svg';
import drinkIcon from '../images/drink.svg';
import profileIcon from '../images/profile.svg';
import likedIcon from '../images/liked.svg';

function Header({ title, notSearchIcon }) {
  const { handleVisivelInput, inputVisivel } = useContext(MyContext);

  const history = useHistory();

  const profileRoute = () => (
    history.push('/profile')
  );

  const iconToDisplay = () => {
    switch (title) {
      case 'Meals':
        return mealIcon;
      case 'Drinks':
        return drinkIcon;
      case 'Profile':
        return profileIcon;
      case 'Favorite Recipes':
        return likedIcon;
      default:
        return null;
    }
  };

  return (
    <section>
      <div className="flex justify-between p-2 bg-violet-600 mb-3 items-center">
        <img src="recipe.png" alt="logo" width="40px" className="ml-4" />
        <a
          href="/meals"
          className="mt-2 text-white no-underline text-xl"
        >
          Tchuplim Receitas
        </a>
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
      <div className="flex-col items-center my-4">
        <img
          src={ iconToDisplay() }
          alt="icon"
          width="45px"
          className="mx-auto mb-3"
        />
        <h1
          data-testid="page-title"
          className="text-center mb-4 font-semibold text-3xl"
        >
          { title }
        </h1>
      </div>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.any,
}.isRequired;

export default Header;
