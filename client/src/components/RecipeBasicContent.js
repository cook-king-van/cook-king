import React, { forwardRef } from 'react';
import MainPhotoHolder from './MainPhotoHolder';
import RecipeMainPhoto from './RecipeMainPhoto';
import TagsInput from './TagsInput';
import '../pages/CreateRecipePage.css';

const RecipeBasicContent = forwardRef((props, ref) => {
  const {
    onServingChange,
    servings,
    onTimeChange,
    time,
    isMainPhotoAdded,
    mainPhoto,
    removePhoto,
    handleMainPhoto,
    handleEditMainBtn,
  } = props;
  return (
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
          ref={ref}
          onChange={handleMainPhoto}
          onClick={handleEditMainBtn}
        />
      )}
    </div>
  );
});

export default RecipeBasicContent;
