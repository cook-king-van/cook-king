import React from 'react';
import '../pages/UserProfilePage.css';
import cheesecake from '../images/chocoholic_cheesecake.jpeg';

const MyCookingCard = ({ recipe }) => {
  const { recipeName, likeCount, userId } = recipe;
  return (
    <div className='UserProfile-cardContainer'>
      <img src={cheesecake} alt='cheese cake' className='UserProfile-food' />
      <div className='UserProfile-cardTextContainer'>
        <p className='UserProfile-foodTitle'>{recipeName}</p>
        <p> </p>
      </div>
      <div className='UserProfile-cardTextContainer'>
        <div className='UserProfile-likesText'>
          <i className='fa-solid fa-heart UserProfile-heartIcon'></i>
          <p className='UserProfile-likes'>{likeCount}</p>
        </div>
        <p className='UserProfile-likesDate'>{userId?.name ?? '2022.06.23'}</p>
      </div>
    </div>
  );
};

export default MyCookingCard;
