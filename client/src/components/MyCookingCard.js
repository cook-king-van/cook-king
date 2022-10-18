import React from 'react';
import '../pages/UserProfile.css';
import cheesecake from '../images/chocoholic_cheesecake.jpeg';

const MyCookingCard = () => {
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
