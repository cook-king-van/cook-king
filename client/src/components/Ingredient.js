import React, { Fragment } from 'react';
import '../pages/CreateRecipePage.css';

const Ingredient = (props) => {
  const ingredientPlaceHolder = [
    { name: 'pork', measure: '300g' },
    { name: 'cabbage', measure: '1/2' },
    { name: 'sesame oil', measure: '1T' },
    { name: 'salt', measure: 'a pinch' },
    { name: 'chili powder', measure: '1t' },
  ];
  const { ingredients, handleIngredientChange, removeIngredient } = props;
  return (
    <Fragment>
      {ingredients.map((ingredient, index) => (
        <Fragment key={index}>
          <input
            type='text'
            className='CreateRecipe-ingredientNameInput'
            name='name'
            placeholder={`ex) ${ingredientPlaceHolder[index % 5].name}`}
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(e, index)}
          />
          <input
            type='text'
            className='CreateRecipe-ingredientMeasureInput'
            name='measure'
            placeholder={ingredientPlaceHolder[index % 5].measure}
            value={ingredient.measure}
            onChange={(e) => handleIngredientChange(e, index)}
          />
          <button
            className='CreateRecipe-deleteIngredientBtn'
            onClick={() => {
              removeIngredient(index);
            }}>
            <i className='fa-regular fa-circle-xmark fa-2x'></i>
          </button>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Ingredient;
