import React, { createRef, useState, useEffect } from 'react';

import mainStyles from './LandingPage.module.css';
import styles from './UserProfile.module.css';
import logo from '../images/logo.png';
import search from '../images/Google Web Search (darker).png';
import pencil from '../images/pencil.png';
import maleUser from '../images/Male User.png';
import EditPencilButton from '../components/EditPencilButton';
import MyCookingCard from '../components/MyCookingCard';

import { Avatar } from '@mui/material';

const UserProfile = () => {
  const currentUser = {
    loading: false,
    userInfo: {
      username: 'Jayhan1109',
      email: 'jungho1109@gmail.com',
      userImageUrl: '',
      description:
        'Hi everyone :) I am Jay Han and I love going Mooyaho~~. I am a challenger in Leauge of Legends so If you need a carry, just let me know ;)',
      likeFood: {},
    },
    error: '',
    bio: {},
  };
  const userImage = currentUser?.userInfo?.userImageUrl;

  const [userName, setUserName] = useState(currentUser?.userInfo?.username);
  const [intro, setIntro] = useState(currentUser?.userInfo?.description);
  const [nameFieldWidth, setNameFieldWidth] = useState(userName.length);
  const [isEditProfileName, setEditProfileName] = useState('disabled');
  const [isEditIntro, setEditIntro] = useState('disabled');
  const editProfileNameRef = createRef();
  const editIntroRef = createRef();

  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    if (isEditProfileName === '') {
      editProfileNameRef.current.focus();
    }
    if (isEditIntro === '') {
      editIntroRef.current.selectionStart = editIntroRef.current.value.length;
      editIntroRef.current.selectionEnd = editIntroRef.current.value.length;
      editIntroRef.current.focus();
    }
  }, [editProfileNameRef, isEditProfileName, editIntroRef, isEditIntro]);

  const hiddenFileInput = React.useRef(null);

  const handleEditPicBtn = (e) => {
    hiddenFileInput.current.click();
  };

  const editProfilePicHandler = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile(reader.result);
    };
    console.log('url', url);

    setSelectedFile(e.target.files[0].toString());
  };

  const editProfileNameHandler = () => {
    setEditProfileName('');
  };

  const editIntroHandler = () => {
    setEditIntro('');
  };

  const nameChangeHandler = (e) => {
    setNameFieldWidth(e.target.value.length);
    setUserName(e.target.value);
  };

  const introChangeHandler = (e) => {
    setIntro(e.target.value);
  };

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
        <div className={styles.innerContainer}>
          <div className={styles.topContainer}>
            <Avatar
              alt={userName ? userName : 'Cookking'}
              src={selectedFile || userImage}
              sx={{ width: 140, height: 140 }}
              className={styles.userIcon}
            />
            <input
              accept='image/*'
              id='contained-button-file'
              type='file'
              ref={hiddenFileInput}
              onChange={editProfilePicHandler}
              className={styles.uploadBtn}
            />
            <EditPencilButton
              styleName={styles.editBtn}
              onClick={handleEditPicBtn}
            />
            <input
              type='text'
              disabled={isEditProfileName}
              ref={editProfileNameRef}
              onBlur={() => {
                setEditProfileName('disabled');
              }}
              className={styles.userName}
              style={{ width: nameFieldWidth + 'ch' }}
              value={userName}
              onChange={nameChangeHandler}
            />
            <EditPencilButton
              styleName={styles.nameEditBtn}
              onClick={editProfileNameHandler}
            />
          </div>
          <div className={styles.middleContainer}>
            <label className={styles.introTitle}>About Me...</label>
            <EditPencilButton
              styleName={styles.introEditButton}
              onClick={editIntroHandler}
            />
            <textarea
              className={styles.introTextArea}
              ref={editIntroRef}
              disabled={isEditIntro}
              onBlur={() => {
                setEditIntro('disabled');
              }}
              value={intro}
              rows={6}
              onChange={introChangeHandler}
            />
          </div>
          <div className={styles.bottomContainer}>
            <label className={styles.cookingListTitle}>My Cooking List</label>
            <div className={styles.myItemsContainer}>
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <label className={styles.cookingListTitle}>
              My Likes
              <i className={`fa-solid fa-heart ${styles.heartIcon}`}></i>
            </label>
            <div className={styles.myItemsContainer}>
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
