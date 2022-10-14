import React from 'react';
import styles from '../pages/UserProfile.module.css';
import cheesecake from '../images/chocoholic_cheesecake.jpeg';

const MyCookingCard = () => {
  return (
    <div className={styles.cardContainer}>
      <img src={cheesecake} alt='cheese cake' className={styles.food} />
      <div className={styles.cardTextContainer}>
        <p className={styles.foodTitle}>Chocolate Cheesecake</p>
        <p> </p>
      </div>
      <div className={styles.cardTextContainer}>
        <div className={styles.likesText}>
          <i className={`fa-solid fa-heart ${styles.heartIcon}`}></i>
          <p className={styles.likes}>13,250</p>
        </div>
        <p className={styles.likesDate}>2022.06.23</p>
      </div>
    </div>
  );
};

export default MyCookingCard;
