import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipe } from '../features/recipes/recipeSlice';

const RecipeDetailPage = () => {
  let { id } = useParams();
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
  } = recipe;

  useEffect(() => {
    dispatch(getRecipe(id));
  }, []);

  if (error) {
    navigate('/*');
  }

  return (
    <div>
      RecipeDetailPage
      <div>recipe name: {recipeName}</div>
      <div>size: {size}</div>
      <div>time: {time}</div>
      <div>likes: {likeCount}</div>
    </div>
  );
};

export default RecipeDetailPage;
