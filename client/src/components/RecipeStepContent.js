import React, { forwardRef } from 'react';
import RecipeStep from './RecipeStep';

const RecipeStepContent = forwardRef((props, ref) => {
  const {
    handleOnDragEnd,
    steps,
    handleEditInstructionMsg,
    isStepsPhotoAdded,
    removeStepsPhoto,
    handleEditInstructionBtn,
    handleInstructionPhoto,
    removeInstruction,
    addInstruction,
  } = props;
  return (
    <div className='CreateRecipe-blockContainer'>
      <div className='CreateRecipe-instructionContainer'>
        <label className='CreateRecipe-title CreateRecipe-instructionTitle'>
          <strong>Instructions</strong>
        </label>
        <p className='CreateRecipe-instructionTips'>
          <i className='fa-solid fa-circle-info'></i> Write down every important
          part of the dish that can affect the taste.{' '}
        </p>
        <p className='CreateRecipe-instructionTips-padding'>
          ex) Cook for 10 minutes ▷ Cook on low heat for 10 minutes.{' '}
        </p>
        <p className='CreateRecipe-instructionTips-padding'>
          Cook the garlic side ▷ You have to cook the garlic side enough to make
          the spicy taste disappear.
        </p>
        <p className='CreateRecipe-instructionTips-padding CreateRecipe-instructionTips-padding-bottom'>
          Add some honey ▷ If you don't have honey, you can replace it with a
          spoonful of sugar.
        </p>
        <RecipeStep
          handleOnDragEnd={handleOnDragEnd}
          steps={steps}
          handleEditInstructionMsg={handleEditInstructionMsg}
          isStepsPhotoAdded={isStepsPhotoAdded}
          ref={ref}
          removeStepsPhoto={removeStepsPhoto}
          handleEditInstructionBtn={handleEditInstructionBtn}
          handleInstructionPhoto={handleInstructionPhoto}
          removeInstruction={removeInstruction}
          addInstruction={addInstruction}
        />
      </div>
    </div>
  );
});

export default RecipeStepContent;
