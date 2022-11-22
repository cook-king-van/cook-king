import React from 'react';
import '../pages/UserProfilePage.css';
import cheesecake from '../images/chocoholic_cheesecake.jpeg';
import { getUserRecipes } from '../features/users/userSlice';

const MyCookingCard = ({ recipe }) => {
  const currentRecipe = getUserRecipes(recipe);
  console.log('current recipe', currentRecipe);

  return (
    <div className='UserProfile-cardContainer'>
      <img src={cheesecake} alt='cheese cake' className='UserProfile-food' />
      <div className='UserProfile-cardTextContainer'>
        <p className='UserProfile-foodTitle'>Chocolate Cheesecake</p>
        <p> </p>
      </div>
      <div className='UserProfile-cardTextContainer'>
        <div className='UserProfile-likesText'>
          <i className='fa-solid fa-heart UserProfile-heartIcon'></i>
          <p className='UserProfile-likes'>13,250</p>
        </div>
        <p className='UserProfile-likesDate'>2022.06.23</p>
      </div>
    </div>
  );
};

export default MyCookingCard;
