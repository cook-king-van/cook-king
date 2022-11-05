import React, { useState, useRef, Fragment } from 'react';
import Navbar from '../pages/NavBar';
import './CreateRecipePage.css';
import TagsInput from '../components/TagsInput';
import RecipeMainPhoto from '../components/RecipeMainPhoto';
import MainPhotoHolder from '../components/MainPhotoHolder';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  const placeHolder = [
    'remove the fat from the beef and cut it into proper sizes.',
    'marinate the meat first with the prepared seasoning.',
    'in the meantime, slice onions, mushrooms, and green onions.',
  ];

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

  const handleInstructionPhoto = (e, index, step) => {
    const updatedPhoto = steps.map((step, i) => {
      if (index === i) {
        return { ...step, imageUrl: URL.createObjectURL(e.target.files[0]) };
      } else {
        return step;
      }
    });
    const updatedStatus = isStepsPhotoAdded.map((stats, ind) => {
      if (index === ind) {
        return true;
      } else {
        return stats;
      }
    });
    setSteps(updatedPhoto);
    setStepsPhotoAdded(updatedStatus);
  };

  const handleEditInstructionMsg = (e, index) => {
    const updatedInstructions = steps.map((step, i) => {
      if (index === i) {
        return { ...step, description: e.target.value };
      } else {
        return step;
      }
    });
    setSteps(updatedInstructions);
  };

  const removePhoto = () => {
    setMainPhoto(null);
    setIsMainPhotoAdded(false);
  };

  const removeStepsPhoto = (e, index) => {
    const updatedSteps = steps.map((step, i) => {
      if (index === i) {
        return { ...step, imageUrl: '' };
      } else {
        return step;
      }
    });
    const updatedStatus = isStepsPhotoAdded.map((stats, ind) => {
      if (index === ind) {
        return false;
      } else {
        return stats;
      }
    });
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
    const updatedIngredients = ingredients.map((ingredient, i) => {
      if (index === i) {
        return { ...ingredient, [name]: value };
      } else {
        return ingredient;
      }
    });
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
      <Navbar />
      <div className='CreateRecipe-container'>
        <div className='CreateRecipe-contentContainer'>
          <div className='CreateRecipe-foodTitleContainer'>
            <label className='CreateRecipe-title'>Recipe Title </label>
            <input
              type='text'
              className='CreateRecipe-foodTitleInput'
              placeholder='ex) beef poutine'
            />
          </div>
          <div className='CreateRecipe-tagContainer'>
            <label className='CreateRecipe-title'>Tag</label>
            <TagsInput />
          </div>
          <div className='CreateRecipe-TimeServingInfo'>
            <label className='CreateRecipe-title'>Servings</label>
            <select
              id='framework'
              className='CreateRecipe-servingInput'
              onChange={onServingChange}
              value={servings}>
              <option>Servings</option>
              <option value='5'>1</option>
              <option value='10'>2</option>
              <option value='15'>3</option>
              <option value='20'>4</option>
              <option value='30'>5</option>
              <option value='60'>6 &gt;</option>
            </select>
            <label className='CreateRecipe-title'>Time</label>
            <select
              id='framework'
              className='CreateRecipe-timeOptions'
              onChange={onTimeChange}
              value={time}>
              <option>Time</option>
              <option value='5'>within 5min</option>
              <option value='10'>within 10min</option>
              <option value='15'>within 15min</option>
              <option value='20'>within 20min</option>
              <option value='30'>within 30min</option>
              <option value='60'>within 60min</option>
              <option value='90'>within 90min</option>
              <option value='120'>within 2hrs</option>
              <option value='999'>over 2hrs</option>
            </select>
          </div>
        </div>
        {isMainPhotoAdded ? (
          <MainPhotoHolder src={mainPhoto} onClick={removePhoto} />
        ) : (
          <RecipeMainPhoto
            ref={hiddenFileInput}
            onChange={handleMainPhoto}
            onClick={handleEditMainBtn}
          />
        )}
      </div>
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
          {ingredients.map((ingredient, index) => (
            <Fragment key={index}>
              <input
                type='text'
                className='CreateRecipe-ingredientNameInput'
                name='name'
                placeholder='ex) ground beef'
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(e, index)}
              />
              <input
                type='text'
                className='CreateRecipe-ingredientMeasureInput'
                name='measure'
                placeholder='300g'
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
      <div className='CreateRecipe-blockContainer'>
        <div className='CreateRecipe-instructionContainer'>
          <label className='CreateRecipe-title CreateRecipe-instructionTitle'>
            <strong>Instructions</strong>
          </label>
          <p className='CreateRecipe-instructionTips'>
            <i className='fa-solid fa-circle-info'></i> Write down every
            important part of the dish that can affect the taste.{' '}
          </p>
          <p className='CreateRecipe-instructionTips-padding'>
            ex) Cook for 10 minutes ▷ Cook on low heat for 10 minutes.{' '}
          </p>
          <p className='CreateRecipe-instructionTips-padding'>
            Cook the garlic side ▷ You have to cook the garlic side enough to
            make the spicy taste disappear.
          </p>
          <p className='CreateRecipe-instructionTips-padding CreateRecipe-instructionTips-padding-bottom'>
            Add some honey ▷ If you don't have honey, you can replace it with a
            spoonful of sugar.
          </p>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className='CreateRecipe-stepsListContainer'>
              <Droppable droppableId='create'>
                {(provided) => (
                  <div>
                    <ul
                      className='CreateRecipe-stepsList'
                      {...provided.droppableProps}
                      ref={provided.innerRef}>
                      {steps.map((step, index) => {
                        return (
                          <Draggable
                            key={step.id}
                            draggableId={step.id}
                            index={index}>
                            {(provided) => (
                              <>
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}>
                                  <label className='CreateRecipe-stepTitle'>
                                    Step {index + 1}
                                  </label>
                                  <div className='CreateRecipe-stepContainer'>
                                    <textarea
                                      className='CreateRecipe-instructionInput'
                                      placeholder={`ex) ${
                                        placeHolder[index % 3]
                                      }`}
                                      value={step.description}
                                      onChange={(e) =>
                                        handleEditInstructionMsg(e, index)
                                      }
                                    />
                                    {isStepsPhotoAdded[index] ? (
                                      <div className='CreateRecipe-instructionPhotoHolder'>
                                        <img
                                          src={steps[index].imageUrl}
                                          alt=''
                                          className='CreateRecipe-instructionPhotoImg'
                                        />
                                        <button
                                          className='CreateRecipe-removeInstructionPhotoBtn'
                                          onClick={(e) =>
                                            removeStepsPhoto(e, index)
                                          }>
                                          <i className='fa-solid fa-xmark'></i>
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        className='CreateRecipe-instructionPhoto'
                                        onClick={(e) =>
                                          handleEditInstructionBtn(e, index)
                                        }>
                                        <input
                                          accept='image/*'
                                          type='file'
                                          ref={(el) =>
                                            (instructionFileInput.current[
                                              index
                                            ] = el)
                                          }
                                          onChange={(e) =>
                                            handleInstructionPhoto(
                                              e,
                                              index,
                                              step
                                            )
                                          }
                                          className='CreateRecipe-uploadInstructionBtn'
                                        />
                                        <i className='fa-sharp fa-solid fa-plus fa-3x CreateRecipe-instructionAddIncon'></i>
                                      </button>
                                    )}
                                    <button
                                      className='CreateRecipe-deleteInstructionPhotoBtn'
                                      onClick={() => {
                                        removeInstruction(index);
                                      }}>
                                      <i className='fa-regular fa-circle-xmark fa-2x'></i>
                                    </button>
                                  </div>
                                </li>
                              </>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                    <div className='CreateRecipe-addInstructionBtnContainer'>
                      <div className='CreateRecipe-addInstructionBtnContainer-inner'>
                        <button
                          className='CreateRecipe-addInstructionBtn'
                          onClick={addInstruction}>
                          <i className='fa-solid fa-circle-plus fa-2x'></i>
                        </button>
                      </div>
                      <label className='CreateRecipe-emptyBox'></label>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
      <div className='CreateRecipe-submitBtnContainer'>
        <button className='CreateRecipe-saveBtn'>Save</button>
        <button className='CreateRecipe-postBtn'>Post</button>
      </div>
    </>
  );
};

export default CreateRecipePage;
