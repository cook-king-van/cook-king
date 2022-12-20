import React, { forwardRef, Fragment } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../pages/CreateRecipePage.css';
import { Tooltip } from '@mui/material';

const RecipeStep = forwardRef((props, ref) => {
  const instructionPlaceHolder = [
    'remove the fat from the beef and cut it into proper sizes.',
    'marinate the meat first with the prepared seasoning.',
    'in the meantime, slice onions, mushrooms, and green onions.',
  ];
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
    <Fragment>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className='CreateRecipe-stepsListContainer'>
          <Droppable droppableId='create'>
            {({ droppableProps, innerRef, placeholder }) => (
              <div>
                <ul
                  className='CreateRecipe-stepsList'
                  {...droppableProps}
                  ref={innerRef}>
                  {steps.map(({ id, description }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {({ innerRef, draggableProps, dragHandleProps }) => (
                          <>
                            <Tooltip
                              title='Drag to change the order'
                              placement='top-start'
                              arrow>
                              <li
                                ref={innerRef}
                                {...draggableProps}
                                {...dragHandleProps}>
                                <label className='CreateRecipe-stepTitle'>
                                  Step {index + 1}
                                </label>
                                <div className='CreateRecipe-stepContainer'>
                                  <textarea
                                    className='CreateRecipe-instructionInput'
                                    placeholder={`ex) ${
                                      instructionPlaceHolder[index % 3]
                                    }`}
                                    value={description}
                                    onChange={(e) =>
                                      handleEditInstructionMsg(e, index)
                                    }
                                  />
                                  {isStepsPhotoAdded[index] ? (
                                    <div className='CreateRecipe-instructionPhotoHolder'>
                                      <img
                                        src={steps[index].stepImage}
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
                                        ref={(el) => (ref.current[index] = el)}
                                        onChange={(e) =>
                                          handleInstructionPhoto(e, index)
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
                            </Tooltip>
                          </>
                        )}
                      </Draggable>
                    );
                  })}
                  {placeholder}
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
    </Fragment>
  );
});

export default RecipeStep;
