import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getRecipe,
  likeRecipe,
  unlikeRecipe,
} from '../features/recipes/recipeSlice';
import './RecipeDetailPage.css';
import tabView1 from '../images/tab_view1.png';
import tabView1On from '../images/tab_view1_on.png';
import tabView2 from '../images/tab_view2.png';
import tabView2On from '../images/tab_view2_on.png';
import tabView3 from '../images/tab_view3.png';
import tabView3On from '../images/tab_view3_on.png';
import { Avatar } from '@mui/material';
import MyCookingCard from '../components/MyCookingCard';
import Carousel from 'react-multi-carousel';
import { responsive } from '../utils/carousel';
import RecipeDetailHeader from '../components/RecipeDetailHeader';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.currentRecipe);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const authorRecipes = useSelector((state) => state.recipes.authorRecipes);
  const recipeLiked = useSelector((state) => state.user.userInfo.likes);
  const currentUserId = useSelector((state) => state.user.userInfo._id);
  const error = useSelector((state) => state.recipes.error);
  const {
    recipeName,
    recipeImage,
    option,
    size,
    time,
    steps,
    tags,
    likeCount,
    ingredient,
    categoriesId,
    userId,
    _id,
  } = recipe;
  const { recipes } = authorRecipes;

  const [isTabView1On, setIsTabView1On] = useState(true);
  const [isTabView2On, setIsTabView2On] = useState(false);
  const [isTabView3On, setIsTabView3On] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isLoginMessage, setIsLoginMessage] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const CustomRightArrow = ({ onClick }) => {
    return (
      <i
        className='RecipeDetail-carouselRightArrow'
        onClick={() => onClick()}></i>
    );
  };

  const CustomLeftArrow = ({ onClick }) => (
    <i className='RecipeDetail-carouselLeftArrow' onClick={() => onClick()} />
  );

  const refineRecipeName = (recipeName) => {
    const splitName = recipeName?.split(' ');
    for (let i = 0; i < splitName?.length; i++) {
      splitName[i] = splitName[i][0]?.toUpperCase() + splitName[i].slice(1);
    }
    return splitName?.join(' ');
  };

  useEffect(() => {
    dispatch(getRecipe(id));
    const liked = recipeLiked?.find((recipe) => recipe?._id === _id);
    if (liked) setIsLike(true);
    else setIsLike(false);
    if (userId?._id === currentUserId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    // eslint-disable-next-line
  }, [id, recipeLiked, _id]);

  const tabView1OnClick = () => {
    setIsTabView1On(true);
    setIsTabView2On(false);
    setIsTabView3On(false);
  };
  const tabView2OnClick = () => {
    setIsTabView2On(true);
    setIsTabView1On(false);
    setIsTabView3On(false);
  };
  const tabView3OnClick = () => {
    setIsTabView3On(true);
    setIsTabView1On(false);
    setIsTabView2On(false);
  };

  const recipeOnClick = (e, recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const editRecipe = (id) => {
    navigate(`/recipe/edit/${id}`);
  };

  const addLike = () => {
    dispatch(likeRecipe(_id));
    if (!error) setIsLike(true);
  };

  const removeLike = () => {
    dispatch(unlikeRecipe(_id));
    if (!error) setIsLike(false);
  };

  const loginAlert = () => {
    setIsLoginMessage(true);
    setTimeout(() => {
      setIsLoginMessage(false);
    }, 3000);
  };

  const showLoginMessage = (
    <span className='RecipeDetail-popUpText'>
      Please log in to like/unlike recipe!
    </span>
  );

  return (
    <>
      <NavBar />
      <RecipeDetailHeader
        isOwner={isOwner}
        editRecipe={editRecipe}
        _id={_id}
        recipeImage={recipeImage}
        recipeName={recipeName}
        isLoginMessage={isLoginMessage}
        showLoginMessage={showLoginMessage}
        likeCount={likeCount}
        isLike={isLike}
        isAuthenticated={isAuthenticated}
        refineRecipeName={refineRecipeName}
        removeLike={removeLike}
        addLike={addLike}
        loginAlert={loginAlert}
        size={size}
        time={time}
      />
      <div className='RecipeDetail-ingredientContainer'>
        <label className='RecipeDetail-ingredientTitle'>Ingredients</label>
        {ingredient?.length > 1 ? (
          ingredient?.map((ing, i) => (
            <Fragment key={ing._id}>
              <div className='RecipeDetail-ingredientContent'>
                <span className='RecipeDetail-ingredients'>
                  {refineRecipeName(ing.name)}
                </span>
                <span className='RecipeDetail-ingredients'>{ing.measure}</span>
              </div>
              <p
                className={
                  i !== ingredient?.length - 1
                    ? `RecipeDetail-ingredientBorder`
                    : ''
                }></p>
            </Fragment>
          ))
        ) : (
          <div>No Ingredients Found</div>
        )}
      </div>
      <div className='RecipeDetail-stepContainer'>
        <div className='RecipeDetail-stepTitleContainer'>
          <label className='RecipeDetail-stepTitle'>Steps</label>
          <div>
            <button className='RecipeDetail-stepBtnBox'>
              <img
                src={isTabView1On ? tabView1On : tabView1}
                alt='imgTextView'
                className='RecipeDetail-imageTextIcon'
                onClick={tabView1OnClick}
              />
            </button>
            <button
              className='RecipeDetail-stepBtnBox'
              onClick={tabView2OnClick}>
              <img
                src={isTabView2On ? tabView2On : tabView2}
                alt='imgTextView'
                className='RecipeDetail-imageTextIcon'
              />
            </button>
            <button
              className='RecipeDetail-stepBtnBox'
              onClick={tabView3OnClick}>
              <img
                src={isTabView3On ? tabView3On : tabView3}
                alt='imgTextView'
                className='RecipeDetail-imageTextIcon'
              />
            </button>
          </div>
        </div>
        <div
          className={
            isTabView1On
              ? 'RecipeDetail-tabView1'
              : isTabView2On
              ? 'RecipeDetail-tabView2'
              : 'RecipeDetail-tabView3'
          }>
          {steps?.length > 1 ? (
            steps?.map((step, i) => (
              <div key={step._id} className='RecipeDetail-stepBox'>
                {isTabView1On || isTabView2On ? (
                  <>
                    <div className='RecipeDetail-stepTextBox'>
                      <div className='RecipeDetail-stepNumber'>{i + 1}</div>
                      <p className='RecipeDetail-stepText'>
                        {step.description}
                      </p>
                    </div>
                    {isTabView1On && (
                      <img
                        src={step.stepImage}
                        alt='no img available'
                        className='RecipeDetail-stepPhoto'
                      />
                    )}
                  </>
                ) : (
                  <div className='RecipeDetail-tabView3Box'>
                    <div className='RecipeDetail-tabView3TextBox'>
                      <div className='RecipeDetail-stepNumber'>{i + 1}</div>
                      <p className='RecipeDetail-stepText'>
                        {step.description}
                      </p>
                    </div>
                    <img
                      src={step.stepImage}
                      alt='no img available'
                      className='RecipeDetail-tabView3stepPhoto'
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No Steps Found</div>
          )}
        </div>
      </div>
      <div className='RecipeDetail-authorContainer'>
        <label className='RecipeDetail-authorTitle'>
          About the author . . .
        </label>
        <div className='RecipeDetail-authorProfileHolder'>
          <Avatar
            alt={userId?.name}
            src={userId?.profileImage}
            sx={{ width: 140, height: 140 }}
            className='RecipeDetail-authorProfilePhoto'
          />
          <div className='RecipeDetail-authorName'>{userId?.name}</div>
        </div>
        <Carousel
          itemClass='MainList-image_item'
          responsive={responsive}
          infinite={true}
          arrows={true}
          className='MainList-reactMultiCarouselList'
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          draggable={true}>
          {recipes
            ? recipes?.map((recipe) => {
                return (
                  <MyCookingCard
                    key={recipe._id}
                    recipe={recipe}
                    onClick={(e) => recipeOnClick(e, recipe._id)}
                    className='RecipeDetail-authorRecipesCard'
                  />
                );
              })
            : []}
        </Carousel>
      </div>
    </>
  );
};

export default RecipeDetailPage;
