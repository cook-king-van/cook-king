import React from 'react';
import '../pages/CreateRecipePage.css';

const MainPhotoHolder = (props) => {
  const { src, onClick } = props;
  return (
    <div className='CreateRecipe-MainPhotoHolder'>
      <img src={src} alt='' className='CreateRecipe-mainPhotoImg' />
      <button className='CreateRecipe-removeMainPhotoBtn' onClick={onClick}>
        <i className='fa-solid fa-xmark'></i>
      </button>
    </div>
  );
};

export default MainPhotoHolder;
