import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyContext from '../context/MyContext';
import CategoryButton from './CategoryButton';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import RecipeCard from './RecipeCard';

export default function Drinks() {
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
              <div className="flex flex-wrap justify-center items-center p-1 my-2 gap-2">
                <button
                  type="button"
                  onClick={ () => filterRecipesByCategory('Drinks', 'All') }
                  className="mr-2 outline outline-1 p-1 rounded-lg text-xs
                  outline-emerald-400 w-20 h-10 hover:bg-orange-400 hover:text-white
                  hover:font-medium hover:outline-2 transition-all duration-150"
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
              <div className="flex flex-wrap items-center justify-evenly px-5 py-1">
                {
                  fetchedItems.map((drink, index) => (
                    <Link
                      key={ drink.idDrink }
                      to={ `/drinks/${drink.idDrink}` }
                      className="no-underline text-black mx-auto mt-3 mb-14 truncate w-44"
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
