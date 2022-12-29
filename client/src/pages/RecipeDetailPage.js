import React, { useEffect, useState } from 'react';
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
import RecipeDetailHeader from '../components/RecipeDetailHeader';
import RecipeDetailIngredients from '../components/RecipeDetail/RecipeDetailIngredients';
import RecipeDetailSteps from '../components/RecipeDetailSteps';
import RecipeDetailAuthor from '../components/RecipeDetailAuthor';
import RecipeDetailTags from '../components/RecipeDetailTags';
import refineRecipeName from '../lib/refineRecipeName';

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

  useEffect(() => {
    dispatch(getRecipe(id));
    const liked = recipeLiked?.find((recipe) => recipe?._id === _id);
    if (liked) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }

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
        tags={tags}
        option={option}
        categoriesId={categoriesId}
      />
      <RecipeDetailIngredients
        ingredient={ingredient}
        refineRecipeName={refineRecipeName}
      />
      <RecipeDetailSteps
        tabView1OnClick={tabView1OnClick}
        isTabView1On={isTabView1On}
        tabView1On={tabView1On}
        tabView1={tabView1}
        tabView2OnClick={tabView2OnClick}
        isTabView2On={isTabView2On}
        tabView2On={tabView2On}
        tabView2={tabView2}
        tabView3OnClick={tabView3OnClick}
        isTabView3On={isTabView3On}
        tabView3On={tabView3On}
        tabView3={tabView3}
        steps={steps}
      />
      <RecipeDetailTags tags={tags} />
      <RecipeDetailAuthor
        userId={userId}
        recipes={recipes}
        recipeOnClick={recipeOnClick}
      />
    </>
  );
};

export default RecipeDetailPage;
