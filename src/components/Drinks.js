import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';
import CategoryButton from './CategoryButton';
import Loading from './Loading';

function Drinks() {
  const {
    fetchedItems,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
    fetching,
  } = useContext(MyContext);

  useEffect(() => {
    firstLoadFetch('Drinks');
    loadCategories('Drinks');
  }, [firstLoadFetch, loadCategories]);

  return (
    <div>
      <Header title="Drinks" />

      {
        fetching
          ? <Loading />
          : (
            <>
              <div className="flex justify-center p-1 my-2">
                <button
                  type="button"
                  data-testid="All-category-filter"
                  onClick={ () => filterRecipesByCategory('Drinks', 'All') }
                  className="mr-2 outline outline-1 p-1 rounded-lg text-xs
          outline-violet-600 w-14 h-10 hover:bg-violet-600 hover:text-white"
                >
                  All
                </button>
                {
                  categories.map(({ strCategory }) => (
                    <CategoryButton
                      key={ strCategory }
                      name={ strCategory }
                      onClick={ () => filterRecipesByCategory('Drinks', strCategory) }
                    />
                  ))
                }
              </div>
              <div className="grid grid-cols-2 mb-12">
                {
                  fetchedItems.map((drink, index) => (
                    <Link
                      key={ drink.idDrink }
                      to={ `/drinks/${drink.idDrink}` }
                      className="no-underline text-black"
                    >
                      <RecipeCard
                        key={ drink.idDrink }
                        recipe={ {
                          name: drink.strDrink,
                          image: drink.strDrinkThumb,
                        } }
                        index={ index }
                      />
                    </Link>
                  ))
                }
              </div>
            </>
          )
      }

      <Footer />
    </div>
  );
}

export default Drinks;
