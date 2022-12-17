import React, { useState } from 'react';
import FoodImage from '../../images/tempFood.png';
import RecipeDescription from './RecipeDescription';
import StepBox from './StepBox';
import './RecipeDetail.css';
const DetailBox = () => {
  const [Recipe, setRecipe] = useState();
  const [name, setName] = useState('');
  return (
    <div className='Detail-box'>
      <img src={FoodImage} width='80%' />
      <div className='Detail-RecipeName'>Delicious Cake</div>
      <StepBox />
    </div>
  );
};

export default DetailBox;
