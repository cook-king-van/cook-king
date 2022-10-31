import React, { createRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './UserProfile.css';
import logo from '../images/logo.png';
import search from '../images/Google Web Search (darker).png';
import pencil from '../images/pencil.png';
import maleUser from '../images/Male User.png';
import EditPencilButton from '../components/EditPencilButton';
import MyCookingCard from '../components/MyCookingCard';
import Navbar from '../pages/NavBar';

import { Avatar, Alert } from '@mui/material';
import { Loader } from 'semantic-ui-react';

const UserProfile = () => {
  const currentUser = useSelector((state) => state.user);
  const botUser = 'a user';
  const userImage = currentUser?.userInfo?.userImageUrl;

  const [userName, setUserName] = useState('');
  const [intro, setIntro] = useState('');
  const [nameFieldWidth, setNameFieldWidth] = useState(0);
  const [isEditProfileName, setEditProfileName] = useState('disabled');
  const [isEditIntro, setEditIntro] = useState('disabled');
  const editProfileNameRef = createRef();
  const editIntroRef = createRef();

  const [selectedFile, setSelectedFile] = useState('');

  const [profileUpdateMsg, setProfileUpdateMsg] = useState('');

  useEffect(() => {
    if (currentUser.userInfo.name) {
      setUserName(currentUser?.userInfo?.name);
      setNameFieldWidth(currentUser?.userInfo?.name?.length);
      setIntro(
        currentUser?.userInfo?.description === ''
          ? `Hello! I am ${currentUser?.userInfo?.name || botUser}`
          : currentUser.userInfo.description
      );
    }
  }, [currentUser.userInfo]);

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
    updateUserProfile('Profile photo');
    setTimeout(() => {
      updateUserProfile('');
    }, 3000);
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

  const updateUserProfile = (type) => {
    setProfileUpdateMsg(type);
    setTimeout(() => {
      setProfileUpdateMsg('');
    }, 3000);
  };

  const updateProfileMsg = (
    <Alert
      severity='success'
      color='info'
      className='UserProfile-profileUpdateMsg'>
      {profileUpdateMsg} updated successfully!
    </Alert>
  );

  return currentUser.loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      {profileUpdateMsg ? updateProfileMsg : ''}
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
                updateUserProfile('Username');
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
                updateUserProfile('Introduction');
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
