import React from 'react';
import '../pages/UserProfilePage.css';
import '../pages/RecipeDetailPage.css';
import cheesecake from '../images/chocoholic_cheesecake.jpeg';

const MyCookingCard = (props) => {
  const { recipe, onClick, className } = props;
  const { recipeName, likeCount, recipeImage, updatedAt, userId } = recipe;
  return (
    <div className={className || `UserProfile-cardContainer`} onClick={onClick}>
      <img
        src={recipeImage ?? cheesecake}
        alt='cheese cake'
        className='UserProfile-food'
      />
      <div className='UserProfile-cardTextContainer'>
        <p className='UserProfile-foodTitle'>{recipeName}</p>
        <p> </p>
      </div>
      <div className='UserProfile-cardTextContainer'>
        <div className='UserProfile-likesText'>
          <i className='fa-solid fa-heart UserProfile-heartIcon'></i>
          <p className='UserProfile-likes'>{likeCount}</p>
        </div>
        <p className='UserProfile-likesDate'>
          {updatedAt ? updatedAt?.split('T')[0] : userId?.name}
        </p>
      </div>
    </div>
  );
};

export default MyCookingCard;
