import React from 'react';
import Ingredient from './Ingredient';
import '../pages/CreateRecipePage.css';

const IngredientContent = (props) => {
  const {
    ingredients,
    handleIngredientChange,
    removeIngredient,
    addIngredient,
  } = props;
  return (
    <div className='CreateRecipe-blockContainer'>
      <div className='CreateRecipe-ingredientInnerContainer'>
        <label className='CreateRecipe-title CreateRecipe-ingredientTitle'>
          <strong>Ingredients</strong>
        </label>
        <p className='CreateRecipe-ingredientTips'>
          <i className='fa-solid fa-circle-info'></i> Write down accurate
          measurement information so that there is no leftover or shortage of
          ingredients.
        </p>
        <label className='CreateRecipe-title CreateRecipe-ingredientName'>
          Name of Ingredient
        </label>
        <label className='CreateRecipe-title CreateRecipe-ingredientMeasure'>
          Number of items and Measurement
        </label>
        <Ingredient
          ingredients={ingredients}
          handleIngredientChange={handleIngredientChange}
          removeIngredient={removeIngredient}
        />
      </div>
      <div className='CreateRecipe-addIngredientBtnContainer'>
        <div className='CreateRecipe-addIngredientBtnContainer-inner'>
          <button
            className='CreateRecipe-addIngredientBtn'
            onClick={addIngredient}>
            <i className='fa-solid fa-circle-plus fa-2x'></i>
          </button>
        </div>
        <label className='CreateRecipe-emptyBox'></label>
      </div>
    </div>
  );
};

export default IngredientContent;
