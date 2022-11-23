import React, { forwardRef } from 'react';
import '../pages/CreateRecipePage.css';

const RecipeMainPhoto = forwardRef((props, ref) => {
  const { onChange, onClick } = props;
  return (
    <>
      <button className='CreateRecipe-mainPhoto' onClick={onClick}>
        <input
          accept='image/*'
          type='file'
          ref={ref}
          onChange={onChange}
          className='CreateRecipe-uploadMainBtn'
        />
        <p className='CreateRecipe-mainPhotoTitle'>ADD YOUR MAIN PICTURE!</p>
        <i className='fa-solid fa-circle-plus fa-3x CreateRecipe-mainPhotoAddIcon'></i>
      </button>
    </>
  );
});

export default RecipeMainPhoto;
