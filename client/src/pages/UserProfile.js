import React, { createRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import mainStyles from './LandingPage.module.css';
import './UserProfile.css';
import logo from '../images/logo.png';
import search from '../images/Google Web Search (darker).png';
import pencil from '../images/pencil.png';
import maleUser from '../images/Male User.png';
import EditPencilButton from '../components/EditPencilButton';
import MyCookingCard from '../components/MyCookingCard';

import { Avatar } from '@mui/material';

const UserProfile = () => {
  const currentUser = useSelector((state) => state.user);
  const userImage = currentUser?.userInfo?.userImageUrl;

  const [userName, setUserName] = useState(
    currentUser?.userInfo?.userName || 'a user'
  );
  const [intro, setIntro] = useState(
    currentUser?.userInfo?.description || `Hello! I am ${userName}`
  );
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
  }, [
    editProfileNameRef,
    isEditProfileName,
    editIntroRef,
    isEditIntro,
    currentUser,
  ]);

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
      <section className='UserProfile-container'>
        <div className='UserProfile-innerContainer'>
          <div className='UserProfile-topContainer'>
            <Avatar
              alt={userName ? userName : 'Cookking'}
              src={selectedFile || userImage}
              sx={{ width: 140, height: 140 }}
              className='UserProfile-userIcon'
            />
            <input
              accept='image/*'
              id='contained-button-file'
              type='file'
              ref={hiddenFileInput}
              onChange={editProfilePicHandler}
              className='UserProfile-uploadBtn'
            />
            <EditPencilButton
              styleName='UserProfile-editBtn'
              onClick={handleEditPicBtn}
            />
            <input
              type='text'
              disabled={isEditProfileName}
              ref={editProfileNameRef}
              onBlur={() => {
                setEditProfileName('disabled');
              }}
              className='UserProfile-userName'
              style={{ width: nameFieldWidth + 'ch' }}
              value={userName}
              onChange={nameChangeHandler}
            />
            <EditPencilButton
              styleName='UserProfile-nameEditBtn'
              onClick={editProfileNameHandler}
            />
          </div>
          <div className='UserProfile-middleContainer'>
            <label className='UserProfile-introTitle'>About Me...</label>
            <EditPencilButton
              styleName='UserProfile-introEditButton'
              onClick={editIntroHandler}
            />
            <textarea
              className='UserProfile-introTextArea'
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
          <div className='UserProfile-bottomContainer'>
            <label className='UserProfile-cookingListTitle'>
              My Cooking List
            </label>
            <div className='UserProfile-myItemsContainer'>
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
              <MyCookingCard />
            </div>
          </div>
          <div className='UserProfile-bottomContainer'>
            <label className='UserProfile-cookingListTitle'>
              My Likes
              <i className='fa-solid fa-heart UserProfile-heartIcon'></i>
            </label>
            <div className='UserProfile-myItemsContainer'>
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
