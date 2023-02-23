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
              src={ e.strMealThumb || e.strDrinkThumb }
              alt={ e.idDrink || e.idMeal }
              className="rounded-full w-2/5 h-w-2/5 mx-auto my-4
              max-w-sm shadow-2xl object-cover"
            />
            <h2
              className="bg-orange-400/95 text-white p-2 w-5/6
              shadow my-4 rounded-full mx-auto max-w-lg"
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
              text-white rounded-lg bg-orange-400 max-w-lg mx-auto"
            >
              {
                getRecipeIngredients().map((value, i) => (
                  <li
                    key={ i }
                  >
                    { value }
                  </li>))
              }
            </ul>
            <h4 className="my-4">Instructions</h4>
            <p
              className="text-justify mb-4 p-3 bg-orange-400
              rounded-lg text-white  max-w-lg mx-auto"
            >
              { e.strInstructions }
            </p>
            {
              detailedRecipe[0].idMeal ? <iframe
                title="Embedded youtube"
                src={ e.strYoutube.replace('watch?v=', 'embed/') }
                className="mx-auto w-96 h-56"
              /> : null
            }
          </div>
        ))
      }
    </div>
  );
}
