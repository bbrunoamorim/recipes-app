import { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function DetailedRecipeCard() {
  const { detailedRecipe, getRecipeIngredients } = useContext(MyContext);

  return (
    <div>
      {
        detailedRecipe.map((e, index) => (
          <div key={ index } className="flex-col text-center">
            <img
              data-testid="recipe-photo"
              src={ e.strMealThumb || e.strDrinkThumb }
              alt={ e.idDrink || e.idMeal }
              className="w-full rounded-t-lg shadow"
            />
            <h2
              className="bg-yellow-500 text-white p-3 w-full shadow mb-4"
            >
              { e.strMeal || e.strDrink }
            </h2>
            <p className="mb-4">
              {
                detailedRecipe[0].idMeal
                  ? `Category: ${e.strCategory}`
                  : `Category: ${e.strCategory}`
              }
            </p>
            <h4 className="mb-4">Ingredients</h4>
            <ul
              className="list-disc list-inside text-justify mb-4 py-3
              outline outline-1 outline-offset-1 mx-3 rounded-lg"
            >
              {
                getRecipeIngredients().map((value, i) => (
                  <li
                    key={ i }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    { value }
                  </li>))
              }
            </ul>
            <h4 className="my-4">Instructions</h4>
            <p
              data-testid="instructions"
              className="text-justify mb-4 p-3 outline outline-1
               outline-offset-1 mx-3 rounded-lg"
            >
              { e.strInstructions }
            </p>
            {
              detailedRecipe[0].idMeal ? <iframe
                data-testid="video"
                title="Embedded youtube"
                src={ e.strYoutube.replace('watch?v=', 'embed/') }
                className="w-full h-60 rounded-lg px-2 shadow mb-4"
              /> : null
            }
          </div>
        ))
      }
    </div>
  );
}
