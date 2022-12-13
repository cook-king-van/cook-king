import React, { useEffect } from 'react';
import NavBar from '../components/navbar/NavBar';
import DetailBox from '../components/RecipeDetail/DetailBox';
import UserRecommend from '../components/RecipeDetail/UserRecommend';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipe } from '../features/recipes/recipeSlice';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.currentRecipe);
  const error = useSelector((state) => state.recipes.error);
  const {
    recipeName,
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

  useEffect(() => {
    dispatch(getRecipe(id));
  }, []);

  if (error) {
    navigate('/*');
  }

  const editRecipe = (id) => {
    navigate(`/recipe/edit/${id}`);
  };

  return (
    <>
      <NavBar />
      <DetailBox />
      <UserRecommend />
      <div>recipe name: {recipeName}</div>
      <div>size: {size}</div>
      <div>time: {time}</div>
      <div>likes: {likeCount}</div>
      <button onClick={() => editRecipe(_id)}>edit</button>
    </div>
    </>
  );
};

export default RecipeDetailPage;
