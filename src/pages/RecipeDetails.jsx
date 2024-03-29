import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import fetchDetailsApi from '../services/fetchDetailsApi';
import DetailedRecipeCard from '../components/DetailedRecipeCard';
import fetchRecomendations from '../services/fetchRecomendations';
import Recomendations from '../components/Recomendations';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/liked.svg';

export default function RecipeDetails({
  history: { location: { pathname } },
  match: { params: { id } },
}) {
  const {
    setDetailedRecipe,
    setRecomendations,
    inProgressRecipe,
    setInProgressRecipe,
    copiedLink,
    setCopiedLink,
    detailedRecipe,
    favoriteRecipe,
    setFavoriteRecipe,
    hiddenStartBtn,
    setHiddenStartBtn,
    isAlertVisible,
    setIsAlertVisible } = useContext(MyContext);

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

  const getRecomendations = useCallback(async () => {
    const data = await fetchRecomendations(pathname);
    setRecomendations(data);
  }, [setRecomendations, pathname]);

  const hideStartBtn = useCallback(() => {
    const recipes = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes'))
      : [{}];
    const result = recipes.some((recipe) => recipe.id === id);
    setHiddenStartBtn(result);
  }, [id, setHiddenStartBtn]);

  const inProgressCheck = useCallback(() => {
    let type;

    if (pathname.includes('meals')) {
      type = 'meals';
    }

    if (pathname.includes('drinks')) {
      type = 'drinks';
    }

    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes'))
      : { drinks: {}, meals: {} };

    const check = (
      Object.keys(inProgressRecipes[type]).some((recipeId) => recipeId === id));

    if (check === true) setInProgressRecipe(true);
  }, [id, pathname, setInProgressRecipe]);

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

  const favoriteCheck = useCallback(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes'))
      : [{ id: '' }];

    const check = favoriteRecipes.some((recipe) => recipe.id === id);
    setFavoriteRecipe(check);
  }, [id, setFavoriteRecipe]);

  useEffect(() => {
    getItem();
    getRecomendations();
    inProgressCheck();
    favoriteCheck();
    hideStartBtn();
  }, [getItem, getRecomendations, inProgressCheck, favoriteCheck, hideStartBtn]);

  return (
    <div className="font-outfit">
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
      <DetailedRecipeCard />
      <Recomendations />
      {
        hiddenStartBtn
          ? null
          : (
            <Link
              to={ `${pathname}/in-progress` }
              className="no-underline text-white fixed bottom-0 mb-1 w-full"
            >
              <button
                type="button"
                className=" bg-orange-400/90 p-2 w-5/6 rounded-lg mx-auto block
                hover:bg-orange-500/90 hover:font-medium transition-all duration-150
                max-w-lg"
              >
                { inProgressRecipe ? 'FINISH RECIPE' : 'START RECIPE' }
              </button>
            </Link>
          )
      }

    </div>
  );
}

RecipeDetails.propTypes = {
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
