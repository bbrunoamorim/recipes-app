import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import liked from '../images/liked.svg';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const [recipeStorage, setRecipeStorage] = useState(['All']);

  const getRecipeStorage = (type) => {
    const getFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));

    switch (type) {
    case 'All':
      setRecipeStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
      break;
    case 'Food':
      setRecipeStorage(getFavoriteRecipe.filter((comida) => comida.type === 'meal'));
      break;
    case 'Drinks':
      setRecipeStorage(getFavoriteRecipe.filter((bebida) => bebida.type === 'drink'));
      break;
    default:
      setRecipeStorage(recipeStorage);
    }
  };

  useEffect(() => {
    setRecipeStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  return (
    <section className="bg-zinc-100">
      <Header title="Favorite Recipes" notSearchIcon />
      <div>
        <div className="flex justify-center p-1 my-2">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => getRecipeStorage('All') }
            className="mr-2 outline outline-1 p-1 rounded-lg text-xs
            outline-violet-600 w-14 h-6 hover:bg-violet-600 hover:text-white"
          >
            All
          </button>

          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => getRecipeStorage('Food') }
            className="mr-2 outline outline-1 p-1 rounded-lg text-xs
            outline-violet-600 w-14 h-6 hover:bg-violet-600 hover:text-white"
          >
            Food
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => getRecipeStorage('Drinks') }
            className="mr-2 outline outline-1 p-1 rounded-lg text-xs
            outline-violet-600 w-14 h-6 hover:bg-violet-600 hover:text-white"
          >
            Drinks
          </button>
        </div>
        { recipeStorage !== null && recipeStorage.map((recipe, index) => (
          <div
            key={ index }
            className="flex outline outline-1 outline-offset-1
             p-1 mx-4 my-4 rounded-lg bg-violet-50"
          >
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  className="w-52 rounded-lg shadow-lg"
                />
              </Link>
            </div>
            <div className="text-center">
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
                className="no-underline text-black"
              >
                <h5
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </h5>
              </Link>
              <p
                className="ml-4 mt-2 mb-5 text-sm text-gray-500"
              >
                { recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.category}  - ${recipe.alcoholicOrNot}` }
              </p>
              <button
                type="button"
                data-testid="share-btn"
              >
                <img
                  src={ shareIcon }
                  alt="share icon"
                  className="w-8"
                />
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
              >
                <img
                  src={ liked }
                  alt="black Heart icon"
                  className="w-8 ml-4"
                />
              </button>
            </div>
          </div>
        )) }
      </div>
      <Footer />
    </section>
  );
}

export default FavoriteRecipes;
