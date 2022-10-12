import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mainStyles from './LandingPage.module.css';
import styles from './UserProfile.module.css';
import logo from '../images/logo.png';
import search from '../images/Google Web Search (darker).png';
import pencil from '../images/pencil.png';
import maleUser from '../images/Male User.png';

import { Avatar } from '@mui/material';

const UserProfile = () => {
  const loading = useSelector((state) => state.users.loading);
  const currentError = useSelector((state) => state.users.error);
  const currentUser = useSelector((state) => state.userInfo);
  const userName = currentUser?.userInfo?.username;
  return (
    <>
      <header className={mainStyles.headerContainer}>
        <img
          src={logo}
          alt='logo'
          draggable='false'
          className={mainStyles.logo}
        />
        <button className={mainStyles.categoryButton}>Category</button>

        <form action='submit' className={mainStyles.searchBar}>
          <input type='text' placeholder='Search' className={mainStyles.bar} />
          <img src={search} className={mainStyles.searchBth} alt='search' />
        </form>

        <img src={pencil} className={mainStyles.interface} alt='pencil' />
        <img src={maleUser} className={mainStyles.interface} alt='maleUser' />
      </header>
      <section className={styles.container}>
        <Avatar
          alt={userName ? userName : 'Cookking'}
          src='/static/images/avatar/1.jpg'
        />
        <p>hi</p>
      </section>
    </>
  );
};

export default UserProfile;
