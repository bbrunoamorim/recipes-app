import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import liked from '../images/liked.svg';
import Footer from '../components/Footer';

export default function FavoriteRecipes() {
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
    <section className="font-outfit">
      <Header title="Favorite Recipes" notSearchIcon />
      <div className="flex justify-center p-1 my-2">
        <button
          type="button"
          onClick={ () => getRecipeStorage('All') }
          className="mr-2 outline outline-1 p-1 rounded-lg text-xs
            outline-emerald-400 w-16 h-8 hover:bg-orange-400 hover:text-white
            hover:font-medium hover:outline-2 transition-all duration-150"
        >
          All
        </button>

        <button
          type="button"
          onClick={ () => getRecipeStorage('Food') }
          className="mr-2 outline outline-1 p-1 rounded-lg text-xs
            outline-emerald-400 w-16 h-8 hover:bg-orange-400 hover:text-white
            hover:font-medium hover:outline-2 transition-all duration-150"
        >
          Food
        </button>

        <button
          type="button"
          onClick={ () => getRecipeStorage('Drinks') }
          className="mr-2 outline outline-1 p-1 rounded-lg text-xs
            outline-emerald-400 w-16 h-8 hover:bg-orange-400 hover:text-white
            hover:font-medium hover:outline-2 transition-all duration-150"
        >
          Drinks
        </button>
      </div>
      <div className="w-5/6 flex-col mx-auto mb-16">
        { recipeStorage !== null && recipeStorage.map((recipe, index) => (
          <div
            key={ index }
            className="flex outline outline-1 mx-auto my-4
            rounded-r-xl max-w-2xl shadow-xl"
          >
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  className="w-52"
                />
              </Link>
            </div>
            <div className="w-full">
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
                className="no-underline text-black"
              >
                <h5 className="text-center">
                  { recipe.name }
                </h5>
              </Link>
              <p
                className="ml-4 mt-2 mb-5 text-sm text-gray-500 text-center"
              >
                { recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.category}  - ${recipe.alcoholicOrNot}` }
              </p>
              <div className="flex justify-end w-full">
                <button
                  type="button"
                >
                  <img
                    src={ shareIcon }
                    alt="share icon"
                    className="w-6"
                  />
                </button>
                <button
                  type="button"
                >
                  <img
                    src={ liked }
                    alt="black Heart icon"
                    className="w-6 ml-4"
                  />
                </button>
              </div>
            </div>
          </div>
        )) }
      </div>
      <Footer />
    </section>
  );
}
