import React, { createRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserProfilePage.css';
import EditPencilButton from '../components/EditPencilButton';
import MyCookingCard from '../components/MyCookingCard';
import Navbar from '../components/navbar/NavBar';

import { Avatar, Alert } from '@mui/material';
import { Loader } from 'semantic-ui-react';

import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const botUser = 'a user';
  const userImage = currentUser?.userInfo?.userImageUrl;

  const [userName, setUserName] = useState('');
  const [intro, setIntro] = useState('');
  const [nameFieldWidth, setNameFieldWidth] = useState(0);
  const [isEditProfileName, setEditProfileName] = useState('disabled');
  const [isEditIntro, setEditIntro] = useState('disabled');
  const [cookingList, setCookingList] = useState([]);
  const [likes, setLikes] = useState([]);

  const editProfileNameRef = createRef();
  const editIntroRef = createRef();

  const [selectedFile, setSelectedFile] = useState('');
  const [profileUpdateMsg, setProfileUpdateMsg] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (currentUser?.userInfo?.name) {
      setUserName(currentUser?.userInfo?.name);
      setNameFieldWidth(currentUser?.userInfo?.name?.length + 1);
      setIntro(
        currentUser?.userInfo?.description === ''
          ? `Hello! I am ${currentUser?.userInfo?.name || botUser}`
          : currentUser.userInfo.description
      );
      setCookingList(currentUser?.userInfo?.recipes);
      setLikes(currentUser?.userInfo?.likes);
    }
  }, [currentUser.userInfo, dispatch]);

  useEffect(() => {
    if (isEditProfileName === '') {
      editProfileNameRef.current.focus();
    }
    if (isEditIntro === '') {
      editIntroRef.current.focus();
    }
  }, [
    editProfileNameRef,
    isEditProfileName,
    editIntroRef,
    isEditIntro,
    showUpdate,
  ]);

  const hiddenFileInput = React.useRef(null);

  const handleEditPicBtn = (e) => {
    hiddenFileInput.current.click();
  };

  const editProfilePicHandler = async (e) => {
    const file = e.target?.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile(reader.result);
    };
  };

  const editProfileNameHandler = () => {
    setEditProfileName('');
  };

  const editIntroHandler = () => {
    editIntroRef.current.selectionStart = editIntroRef.current.value.length;
    editIntroRef.current.selectionEnd = editIntroRef.current.value.length;
    editIntroRef.current.focus();
    setEditIntro('');
  };

  const nameChangeHandler = (e) => {
    setNameFieldWidth(e.target.value.length + 1);
    setUserName(e.target.value);
  };

  const introChangeHandler = (e) => {
    setIntro(e.target.value);
  };

  const showEditBtns = () => {
    setShowUpdate(true);
  };

  const handleUpdateProfile = () => {
    setProfileUpdateMsg(true);
    setTimeout(() => {
      setProfileUpdateMsg(false);
    }, 3000);
    setShowUpdate(false);
    // send updates to the server
  };

  const recipeOnClick = (e, recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const updateProfileMsg = (
    <Alert
      severity='success'
      color='info'
      className='UserProfile-profileUpdateMsg'>
      Profile updated successfully!
    </Alert>
  );

  const noRecipeMsg = (
    <p className='UserProfile-noRecipeMsg'>There's no recipe to display</p>
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
              styleName={`UserProfile-editBtn ${
                !showUpdate && 'UserProfile-disableEditBtns'
              }`}
              onClick={handleEditPicBtn}
            />

            <input
              type='text'
              disabled={isEditProfileName}
              ref={editProfileNameRef}
              onBlur={() => setEditProfileName('disabled')}
              className='UserProfile-userName'
              style={{ width: nameFieldWidth + 'ch' }}
              value={userName}
              onChange={nameChangeHandler}
            />
            <EditPencilButton
              styleName={`UserProfile-nameEditBtn ${
                !showUpdate && 'UserProfile-disableEditBtns'
              }`}
              onClick={editProfileNameHandler}
            />

            <div className='UserProfileEditSaveBtnContainer'>
              <button
                className='UserProfile-editProfileBtn'
                onClick={showEditBtns}>
                Edit
              </button>
              <button
                className='UserProfile-saveProfileBtn'
                disabled={!showUpdate}
                onClick={handleUpdateProfile}>
                Save
              </button>
            </div>
          </div>
          <div className='UserProfile-middleContainer'>
            <label className='UserProfile-introTitle'>About Me...</label>
            <EditPencilButton
              styleName={`UserProfile-introEditButton ${
                !showUpdate && 'UserProfile-disableEditBtns'
              }`}
              onClick={editIntroHandler}
            />
            <textarea
              className='UserProfile-introTextArea'
              ref={editIntroRef}
              disabled={isEditIntro}
              onBlur={() => setEditIntro('disabled')}
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
              {cookingList.length > 0
                ? cookingList.map((recipe, i) => (
                    <MyCookingCard
                      key={recipe._id}
                      recipe={recipe}
                      onClick={(e) => recipeOnClick(e, recipe._id)}
                    />
                  ))
                : noRecipeMsg}
            </div>
          </div>
          <div className='UserProfile-bottomContainer'>
            <label className='UserProfile-cookingListTitle'>
              My Likes
              <i className='fa-solid fa-heart UserProfile-heartIcon'></i>
            </label>
            <div className='UserProfile-myItemsContainer'>
              {likes.length > 0
                ? likes.map((like, i) => (
                    <MyCookingCard
                      key={like._id}
                      recipe={like}
                      onClick={(e) => recipeOnClick(e, like._id)}
                    />
                  ))
                : noRecipeMsg}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
