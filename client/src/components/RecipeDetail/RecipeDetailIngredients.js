import React, { Fragment } from 'react';

const RecipeDetailIngredients = (props) => {
  const { ingredient, refineRecipeName } = props;
  return (
    <div className='RecipeDetail-ingredientContainer'>
      <label className='RecipeDetail-ingredientTitle'>Ingredients</label>
      {ingredient?.length > 1 ? (
        ingredient?.map((ing, i) => (
          <Fragment key={ing._id}>
            <div className='RecipeDetail-ingredientContent'>
              <span className='RecipeDetail-ingredients'>
                {refineRecipeName(ing.name)}
              </span>
              <span className='RecipeDetail-ingredients'>{ing.measure}</span>
            </div>
            <p
              className={
                i !== ingredient?.length - 1
                  ? `RecipeDetail-ingredientBorder`
                  : ''
              }></p>
          </Fragment>
        ))
      ) : (
        <div>No Ingredients Found</div>
      )}
    </div>
  );
};

export default RecipeDetailIngredients;
