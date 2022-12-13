import React, { useState, useRef } from 'react';
import NavBar from '../components/navbar/NavBar';
import './CreateRecipePage.css';

import RecipeBasicContent from '../components/RecipeBasicContent';
import IngredientContent from '../components/IngredientContent';
import RecipeStepContent from '../components/RecipeStepContent';

const CreateRecipePage = () => {
  const [mainPhoto, setMainPhoto] = useState(null);
  const [isMainPhotoAdded, setIsMainPhotoAdded] = useState(false);
  const [time, setTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [ingredients, setIngredients] = useState([{ name: '', measure: '' }]);
  const [steps, setSteps] = useState([
    { id: Date.now().toString(), imageUrl: '', description: '' },
  ]);
  const [isStepsPhotoAdded, setStepsPhotoAdded] = useState([false]);

  const hiddenFileInput = useRef(null);
  const instructionFileInput = useRef([]);

  const handleEditMainBtn = (e) => {
    hiddenFileInput.current.click();
  };

  const handleMainPhoto = (e) => {
    setIsMainPhotoAdded(true);
    setMainPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleEditInstructionBtn = (e, index) => {
    instructionFileInput.current[index].click();
  };

  const handleInstructionPhoto = (e, index) => {
    const updatedPhoto = steps.map((step, i) =>
      index === i
        ? { ...step, imageUrl: URL.createObjectURL(e.target.files[0]) }
        : step
    );

    const updatedStatus = isStepsPhotoAdded.map((stats, i) =>
      index === i ? true : stats
    );

    setSteps(updatedPhoto);
    setStepsPhotoAdded(updatedStatus);
  };

  const handleEditInstructionMsg = (e, index) => {
    const updatedInstructions = steps.map((step, i) =>
      index === i ? { ...step, description: e.target.value } : step
    );
    setSteps(updatedInstructions);
  };

  const removePhoto = () => {
    setMainPhoto(null);
    setIsMainPhotoAdded(false);
  };

  const removeStepsPhoto = (e, index) => {
    const updatedSteps = steps.map((step, i) =>
      index === i ? { ...step, imageUrl: '' } : step
    );

    const updatedStatus = isStepsPhotoAdded.map((stats, i) =>
      index === i ? false : stats
    );
    setSteps(updatedSteps);
    setStepsPhotoAdded(updatedStatus);
  };

  const onTimeChange = (e) => {
    setTime(e.target.value);
  };

  const onServingChange = (e) => {
    setServings(e.target.value);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', measure: '' }]);
  };

  const addInstruction = () => {
    setSteps([
      ...steps,
      { id: Date.now().toString(), imageUrl: '', description: '' },
    ]);
    setStepsPhotoAdded([...isStepsPhotoAdded, false]);
  };

  const removeIngredient = (i) => {
    setIngredients((ingredients) =>
      ingredients.filter((ingredient, index) => index !== i)
    );
  };

  const removeInstruction = (i) => {
    setSteps((steps) => steps.filter((step, index) => index !== i));
    setStepsPhotoAdded((stats) => stats.filter((stat, ind) => ind !== i));
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const updatedIngredients = ingredients.map((ingredient, i) =>
      index === i ? { ...ingredient, [name]: value } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const stepsItems = Array.from(steps);
    const [reorderedItem] = stepsItems.splice(result.source.index, 1);
    stepsItems.splice(result.destination.index, 0, reorderedItem);
    setSteps(stepsItems);
    const photoStatus = Array.from(isStepsPhotoAdded);
    const [reorderedStatus] = photoStatus.splice(result.source.index, 1);
    photoStatus.splice(result.destination.index, 0, reorderedStatus);
    setStepsPhotoAdded(photoStatus);
  };

  return (
    <>
      <NavBar />
      <RecipeBasicContent
        ref={hiddenFileInput}
        onServingChange={onServingChange}
        servings={servings}
        onTimeChange={onTimeChange}
        time={time}
        isMainPhotoAdded={isMainPhotoAdded}
        mainPhoto={mainPhoto}
        removePhoto={removePhoto}
        handleMainPhoto={handleMainPhoto}
        handleEditMainBtn={handleEditMainBtn}
      />
      <IngredientContent
        ingredients={ingredients}
        handleIngredientChange={handleIngredientChange}
        removeIngredient={removeIngredient}
        addIngredient={addIngredient}
      />
      <RecipeStepContent
        handleOnDragEnd={handleOnDragEnd}
        steps={steps}
        handleEditInstructionMsg={handleEditInstructionMsg}
        isStepsPhotoAdded={isStepsPhotoAdded}
        ref={instructionFileInput}
        removeStepsPhoto={removeStepsPhoto}
        handleEditInstructionBtn={handleEditInstructionBtn}
        handleInstructionPhoto={handleInstructionPhoto}
        removeInstruction={removeInstruction}
        addInstruction={addInstruction}
      />
      <div className='CreateRecipe-submitBtnContainer'>
        <button className='CreateRecipe-saveBtn'>Save</button>
        <button className='CreateRecipe-postBtn'>Post</button>
      </div>
    </>
  );
};

export default CreateRecipePage;
