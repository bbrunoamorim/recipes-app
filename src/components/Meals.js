import { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';
import CategoryButton from './CategoryButton';

function Meals() {
  const {
    fetchedItems,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
  } = useContext(MyContext);

  useEffect(() => {
    firstLoadFetch('Meals');
    loadCategories('Meals');
  }, [firstLoadFetch, loadCategories]);

  return (
    <div>
      <Header title="Meals" />

      <div className="flex flex-wrap justify-center p-1 my-2">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => filterRecipesByCategory('Meals', 'All') }
          className="mr-2 outline outline-1 p-1 rounded-lg text-xs
          outline-violet-600 w-14 h-6 hover:bg-violet-600 hover:text-white"
        >
          All
        </button>
        {
          categories.map(({ strCategory }) => (
            <CategoryButton
              key={ strCategory }
              name={ strCategory }
              onClick={ () => filterRecipesByCategory('Meals', strCategory) }
            />
          ))
        }
      </div>
      <div className="grid grid-cols-2">
        {
          fetchedItems.map((meal, index) => (
            <Link
              key={ meal.idMeal }
              to={ `/meals/${meal.idMeal}` }
              className="no-underline text-black"
            >
              <RecipeCard
                recipe={ {
                  name: meal.strMeal,
                  image: meal.strMealThumb,
                } }
                index={ index }
              />
            </Link>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
