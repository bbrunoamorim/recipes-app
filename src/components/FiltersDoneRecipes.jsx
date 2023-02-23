import { useContext } from 'react';

import MyContext from '../context/MyContext';

export default function FiltersDoneRecipes() {
  const { filterRecipesDone } = useContext(MyContext);

  return (
    <nav className="flex items-center justify-center">
      <button
        type="button"
        onClick={ filterRecipesDone }
        className="mr-2 outline outline-1 p-1 rounded-lg text-xs
        outline-emerald-400 w-20 h-8 hover:bg-orange-400 hover:text-white
        hover:font-medium hover:outline-2 transition-all duration-150"
      >
        All
      </button>

      <button
        type="button"
        onClick={ filterRecipesDone }
        className="mr-2 outline outline-1 p-1 rounded-lg text-xs
        outline-emerald-400 w-20 h-8 hover:bg-orange-400 hover:text-white
        hover:font-medium hover:outline-2 transition-all duration-150"
      >
        Meals
      </button>

      <button
        type="button"
        onClick={ filterRecipesDone }
        className="mr-2 outline outline-1 p-1 rounded-lg text-xs
        outline-emerald-400 w-20 h-8 hover:bg-orange-400 hover:text-white
        hover:font-medium hover:outline-2 transition-all duration-150"
      >
        Drinks
      </button>
    </nav>
  );
}
