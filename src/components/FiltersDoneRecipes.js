import { useContext } from 'react';

import MyContext from '../context/MyContext';

function FiltersDoneRecipes() {
  const { filterRecipesDone } = useContext(MyContext);

  return (
    <nav className="flex items-center justify-center">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterRecipesDone }
        className="mr-2 outline outline-1 p-1 rounded-lg text-xs
        outline-violet-600 w-14 h-6 hover:bg-violet-600 hover:text-white"
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterRecipesDone }
        className="mr-2 outline outline-1 p-1 rounded-lg text-xs
        outline-violet-600 w-14 h-6 hover:bg-violet-600 hover:text-white"
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterRecipesDone }
        className="mr-2 outline outline-1 p-1 rounded-lg text-xs
        outline-violet-600 w-14 h-6 hover:bg-violet-600 hover:text-white"
      >
        Drinks
      </button>
    </nav>
  );
}

export default FiltersDoneRecipes;
