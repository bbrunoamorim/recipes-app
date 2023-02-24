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
    <div className="font-outfit text-center px-4">
      {
        detailedRecipe.map((e, index) => (
          <div key={ index }>
            <div>
              <input
                type="image"
                onClick={ copy }
                src={ shareIcon }
                alt="shareicon"
                className="absolute top-5 right-5 w-7"
              />
              <input
                type="image"
                onClick={ handleSetFavorite }
                src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
                alt="favorite-icon"
                className="absolute top-5 left-5 w-7"
              />
              {
                copiedLink && isAlertVisible
                  ? (
                    <p
                      className="absolute right-4 top-16 font-semibold
                        text-sm animate-pulse text-orange-400"
                    >
                      Copied link!
                    </p>
                  )
                  : null
              }
            </div>
            <img
              src={ e.strMealThumb || e.strDrinkThumb }
              alt={ e.idDrink || e.idMeal }
              className="rounded-full w-2/5 h-w-2/5 mx-auto my-4
                max-w-sm shadow-2xl object-cover"
            />
            <h2
              className="bg-orange-400/95 text-white p-2 w-5/6
              shadow my-4 rounded-full mx-auto max-w-lg"
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
            <h4 className="mb-4">Ingredients</h4>
            <ul
              className="list-disc list-inside text-justify mb-4 py-3
              text-white rounded-lg bg-orange-400 max-w-lg mx-auto"
            >
              {
                getRecipeIngredients().map((value, i) => (
                  <li
                    key={ i }
                    id={ `${i}-ingredient-step` }
                  >
                    <label
                      htmlFor={ `${i}-ingredient-step` }
                      id={ `${i}-ingredient-step` }
                    >
                      <input
                        className="check-input mr-2 mb-3 accent-emerald-300"
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
              className="text-justify mb-4 p-3 bg-orange-400
              rounded-lg text-white  max-w-lg mx-auto"
            >
              { e.strInstructions }
            </p>
          </div>
        ))
      }
      <button
        type="button"
        className=" bg-orange-400 p-2 w-full rounded-lg mx-auto block text-white
        hover:bg-orange-500 hover:font-medium transition-all duration-150
        max-w-lg mb-3"
      >
        FINISH RECIPE
      </button>
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
