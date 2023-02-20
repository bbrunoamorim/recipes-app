import '../styles/RecipeInProgress.css';
import PropTypes from 'prop-types';
import { useContext, useEffect, useCallback } from 'react';
import clipboardCopy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import fetchDetailsApi from '../services/fetchDetailsApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/liked.svg';

function RecipesInProgress({
  history: { location: { pathname } },
  match: { params: { id } },
}) {
  const {
    detailedRecipe,
    getRecipeIngredients,
    favoriteRecipe,
    setCopiedLink,
    copiedLink,
    setFavoriteRecipe,
    setDetailedRecipe,
    setIsAlertVisible,
    isAlertVisible } = useContext(MyContext);

  const getPath = useCallback(() => {
    if (pathname.includes('meals')) {
      return 'themealdb';
    }
    if (pathname.includes('drinks')) {
      return 'thecocktaildb';
    }
  }, [pathname]);

  const getItem = useCallback(async () => {
    const data = await fetchDetailsApi(getPath(), id);
    setDetailedRecipe(data);
  }, [id, setDetailedRecipe, getPath]);

  const copy = () => {
    const DELAY = 3000;
    setIsAlertVisible(true);

    clipboardCopy(window.location.href);
    setCopiedLink(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, DELAY);
  };

  const updateBtnCheck = (object, favoriteItem) => {
    if (object.some((item) => item.id === favoriteItem.id)) {
      const removeObj = object.filter((e) => e.id !== favoriteItem.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeObj));
      setFavoriteRecipe(false);
    }
  };

  const handleSetFavorite = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');

    if (pathname.includes('meals')) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = detailedRecipe[0];
      const favoriteMeal = {
        id: idMeal,
        type: 'meal',
        nationality: strArea || '',
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      if (!favoriteRecipes) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteMeal]));
        setFavoriteRecipe(true);
      } else {
        const parsedObj = JSON.parse(favoriteRecipes);
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...parsedObj, favoriteMeal]));
        setFavoriteRecipe(true);
        updateBtnCheck(parsedObj, favoriteMeal);
      }
    }

    if (pathname.includes('drinks')) {
      const { idDrink, strArea, strCategory,
        strAlcoholic, strDrink, strDrinkThumb } = detailedRecipe[0];
      const favoriteDrink = {
        id: idDrink,
        type: 'drink',
        nationality: strArea || '',
        category: strCategory || '',
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      if (!favoriteRecipes) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrink]));
        setFavoriteRecipe(true);
      } else {
        const parsedObj = JSON.parse(favoriteRecipes);
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...parsedObj, favoriteDrink]));
        setFavoriteRecipe(true);
        updateBtnCheck(parsedObj, favoriteDrink);
      }
    }
  };

  useEffect(() => {
    getItem();
  }, [getItem]);

  return (
    <div>
      <div className="flex-col text-center bg-zinc-50">
        {
          detailedRecipe.map((e, index) => (
            <div key={ index }>
              <div>
                <input
                  type="image"
                  data-testid="share-btn"
                  onClick={ copy }
                  src={ shareIcon }
                  alt="shareicon"
                  className="absolute top-5 right-5 w-10"
                />
                <input
                  type="image"
                  data-testid="favorite-btn"
                  onClick={ handleSetFavorite }
                  src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
                  alt="favorite-icon"
                  className="absolute top-5 left-5 w-10"
                />
                {
                  copiedLink && isAlertVisible
                    ? (
                      <p
                        className="absolute right-4 top-16 font-semibold
                text-xl animate-pulse text-sky-400"
                      >
                        Copied link!
                      </p>
                    )
                    : null
                }
              </div>
              <img
                data-testid="recipe-photo"
                src={ e.strMealThumb || e.strDrinkThumb }
                alt={ e.idDrink || e.idMeal }
                className="w-full rounded-t-lg shadow"
              />
              <h2
                className="bg-violet-500 text-white p-3 w-full shadow mb-4"
              >
                { e.strMeal || e.strDrink }
              </h2>
              <p className="mb-4">
                {
                  detailedRecipe[0].idMeal
                    ? `Category: ${e.strCategory}`
                    : `Category: ${e.strCategory}`
                }
              </p>
              <ul
                className="text-justify mb-4 py-3
              outline outline-1 outline-offset-1 mx-3 rounded-lg"
              >
                {
                  getRecipeIngredients().map((value, i) => (
                    <li
                      key={ i }
                      data-testid={ `${i}-ingredient-name-and-measure` }
                      id={ `${i}-ingredient-step` }
                    >
                      <label
                        className="check-label"
                        htmlFor={ `${i}-ingredient-step` }
                        id={ `${i}-ingredient-step` }
                        data-testid={ `${i}-ingredient-step` }
                      >
                        <input
                          className="check-input mr-2 mb-3 accent-violet-600"
                          type="checkbox"
                          name={ `${i}-ingredient-step` }
                          id={ `${i}-ingredient-step` }
                        />
                        { value }
                      </label>
                    </li>
                  ))
                }
              </ul>
              <p
                className="text-justify mb-4 p-3 outline
                outline-1 outline-offset-1 mx-3 rounded-lg"
              >
                { e.strInstructions }
              </p>
            </div>
          ))
        }
        <button
          type="button"
          className="bg-violet-500 p-3 w-full text-white mb-1"
        >
          FINISH RECIPE
        </button>
      </div>

    </div>
  );
}

RecipesInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipesInProgress;
