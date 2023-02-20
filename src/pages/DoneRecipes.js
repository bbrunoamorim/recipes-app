import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import FiltersDoneRecipes from '../components/FiltersDoneRecipes';
import MyContext from '../context/MyContext';

function DoneRecipes() {
  const { filteredDonesRecipes, firstLoadRecipesDone } = useContext(MyContext);

  useEffect(() => {
    firstLoadRecipesDone();
  }, [firstLoadRecipesDone]);

  return (
    <div className="bg-zinc-50 min-h-screen flex-col items-center justify-center">
      <Header title="Done Recipes" notSearchIcon />

      <FiltersDoneRecipes />

      {
        filteredDonesRecipes.map((doneRecipe, index) => (
          <DoneRecipeCard
            key={ doneRecipe.id }
            doneRecipe={ doneRecipe }
            index={ index }
          />
        ))
      }
    </div>
  );
}

export default DoneRecipes;
