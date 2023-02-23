import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import doneIcon from '../images/done.png';
import drinkIcon from '../images/drink.svg';
import likedIcon from '../images/liked.svg';
import mealIcon from '../images/mainMeal.png';
import profileIcon from '../images/profile.svg';
import searchIcon from '../images/search.svg';
import userIcon from '../images/user.svg';
import SearchBar from './SearchBar';

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
    case 'Done Recipes':
      return doneIcon;
    default:
      return null;
    }
  };

  return (
    <section>
      <div className="flex justify-between px-2 py-3 bg-orange-400 items-center">
        <a
          href="/meals"
          className="ml-3 text-white no-underline text-3xl font-dancing font-semibold"
        >
          Do It Yourself
        </a>
        <div>
          { !notSearchIcon && (
            <button
              type="button"
              onClick={ handleVisivelInput }
            >
              <img
                src={ searchIcon }
                alt="search-btn"
                className="w-6"
              />
            </button>
          ) }
          <button
            type="button"
            onClick={ profileRoute }
            className="ml-8 mr-4"
          >
            <img
              src={ userIcon }
              alt="Icon Profile"
              className="w-6"
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
          className="text-center mb-4 font-semibold text-3xl font-outfit text-orange-400"
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
