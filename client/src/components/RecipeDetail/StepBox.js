import React from 'react';
import StepDetail from './StepDetail';
import './RecipeDetail.css'
import RecipeIcon from './RecipeIcon';
const StepBox = () => {
  return (
    <>
      <div className='Step-box'>
        <div className='Step-description'>Description</div>
        <RecipeIcon />
        <StepDetail />
        <StepDetail />
        <StepDetail />
      </div>
    </>
  );
};

export default StepBox;
