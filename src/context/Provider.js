import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchApi from '../services/fetchApi';
import fetchCategories from '../services/fetchCategories';
import fetchRecipesByCategory from '../services/fetchRecipesByCategory';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchBarParameter, setSearchBarParameter] = useState('ingrediente');
  const [fetchedItems, setFetchedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inputVisivel, setInputVisivel] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [detailedRecipe, setDetailedRecipe] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [donesRecipes, setDonesRecipes] = useState([]);
  const [filteredDonesRecipes, setFilteredDonesRecipes] = useState([]);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [hiddenStartBtn, setHiddenStartBtn] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [fetching, setFetching] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleValidate = () => {
      const regex = /\S+@\S+\.\S+/;
      const passLength = 7;
      const verifyEmail = email && regex.test(email);
      const verifyPassword = password.length >= passLength;
      setSubmitDisable(!(verifyEmail && verifyPassword));
    };
    handleValidate();
  }, [email, password]);

  const firstLoadRecipesDone = useCallback(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDonesRecipes(doneRecipes);
    setFilteredDonesRecipes(doneRecipes);
  }, []);

  const filterRecipesDone = useCallback((event) => {
    const filterName = event.target.innerHTML;

    const doneRecipesFiltered = donesRecipes.filter((doneRecipe) => {
      if (filterName === 'Meals') {
        return doneRecipe.type === 'meal';
      }

      if (filterName === 'Drinks') {
        return doneRecipe.type === 'drink';
      }

      return donesRecipes;
    });

    setFilteredDonesRecipes(doneRecipesFiltered);
  }, [donesRecipes]);

  const handleChangeEmail = useCallback(({ target }) => {
    const { value } = target;
    setEmail(value);
  }, []);

  const handleChangePassword = useCallback(({ target }) => {
    const { value } = target;
    setPassword(value);
  }, []);

  const firstLoadFetch = useCallback(async (title) => {
    setFetching(true);
    const data = await fetchApi('nome', '', title);
    const numberOfRecipes = 12;
    setFetchedItems(data.slice(0, numberOfRecipes));
    setFetching(false);
  }, []);

  const loadCategories = useCallback(async (recipesType) => {
    setFetching(true);

    const fetchedCategories = await fetchCategories(recipesType);

    setCategories(fetchedCategories);

    setFetching(false);
  }, []);

  const filterRecipesByCategory = useCallback(async (recipesType, category) => {
    setFetching(true);
    if (selectedCategory === category || category === 'All') {
      await firstLoadFetch(recipesType);

      setSelectedCategory('All');

      return;
    }

    const filteredRecipesByCategory = await fetchRecipesByCategory(recipesType, category);

    setFetchedItems(filteredRecipesByCategory);
    setSelectedCategory(category);
    setFetching(false);
  }, [firstLoadFetch, selectedCategory]);

  const handleSubmit = useCallback(() => {
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/meals');
  }, [email, history]);

  const handleVisivelInput = useCallback(() => {
    setInputVisivel(!inputVisivel);
  }, [inputVisivel]);

  const getRecipeIngredients = useCallback(() => {
    const ingredients = Object.entries(detailedRecipe[0]).filter(
      ([key, value]) => (key.includes('strIngredient') || key.includes('strMeasure'))
        && value !== '' && value,
    );

    const ingredientName = ingredients.reduce((acc, [key, value]) => {
      if (key.includes('strIngredient')) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const ingredientsQuantity = ingredients.reduce((acc, [key, value]) => {
      if (key.includes('strMeasure')) {
        acc[key] = value;
      }
      return acc;
    }, {});

    return Object.values(ingredientName)
      .map((ingredient, i) => `${ingredient} ${Object.values(ingredientsQuantity)[i]}`);
  }, [detailedRecipe]);

  const context = useMemo(() => ({
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    setSearchBarValue,
    searchBarValue,
    setSearchBarParameter,
    searchBarParameter,
    setFetchedItems,
    handleSubmit,
    history,
    fetchedItems,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
    handleVisivelInput,
    setInputVisivel,
    inputVisivel,
    redirect,
    setRedirect,
    detailedRecipe,
    setDetailedRecipe,
    recomendations,
    setRecomendations,
    filterRecipesDone,
    filteredDonesRecipes,
    firstLoadRecipesDone,
    inProgressRecipe,
    setInProgressRecipe,
    copiedLink,
    setCopiedLink,
    favoriteRecipe,
    setFavoriteRecipe,
    hiddenStartBtn,
    setHiddenStartBtn,
    getRecipeIngredients,
    isAlertVisible,
    setIsAlertVisible,
    fetching,
  }), [
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    searchBarValue,
    searchBarParameter,
    fetchedItems,
    handleSubmit,
    history,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
    handleVisivelInput,
    inputVisivel,
    setInputVisivel,
    redirect,
    detailedRecipe,
    setDetailedRecipe,
    recomendations,
    filterRecipesDone,
    filteredDonesRecipes,
    firstLoadRecipesDone,
    inProgressRecipe,
    copiedLink,
    favoriteRecipe,
    hiddenStartBtn,
    getRecipeIngredients,
    isAlertVisible,
    fetching,
  ]);

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>

  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
