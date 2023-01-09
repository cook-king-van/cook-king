import React from 'react';
import detectTime from '../lib/detectTime';

const RecipeDetailHeader = (props) => {
  const {
    isOwner,
    editRecipe,
    _id,
    recipeImage,
    recipeName,
    isLoginMessage,
    showLoginMessage,
    likeCount,
    isLike,
    isAuthenticated,
    refineRecipeName,
    removeLike,
    addLike,
    loginAlert,
    size,
    time,
    option,
    categoriesId,
  } = props;

  return (
    <div className='RecipeDetail-container'>
      <div className='RecipeDetail-photoContainer'>
        {isOwner && (
          <button
            className='RecipeDetail-editBtn'
            onClick={() => editRecipe(_id)}>
            Edit
          </button>
        )}
        {recipeImage ? (
          <div className='RecipeDetail-likeContainer'>
            <img
              src={recipeImage}
              alt={recipeName}
              className='RecipeDetail-mainphotoImg'
            />
            {isLoginMessage && showLoginMessage}
            <span
              className={
                likeCount?.toString()?.length < 4
                  ? `RecipeDetail-shortLikeCount-${isLike}`
                  : `RecipeDetail-likeCount-${isLike}`
              }
              onClick={() => {
                if (isAuthenticated) {
                  if (isLike) {
                    removeLike();
                  } else {
                    addLike();
                  }
                } else {
                  loginAlert();
                }
              }}>
              <i className='fa-solid fa-heart RecipeDetail-heartIcon'></i>
              {likeCount?.toLocaleString()}
            </span>
          </div>
        ) : (
          <div className='RecipeDetail-noMainPhoto'>No Image Found</div>
        )}

        <div className='RecipeDetail-titleContainer'>
          <label className='RecipeDetail-title'>
            {refineRecipeName(recipeName)}
          </label>
        </div>
        <p className='RecipeDetail-border'></p>
        <div className='RecipeDetail-recipeInfoContainer'>
          <div className='RecipeDetail-recipeInfoItem'>
            <i className='fa-solid fa-utensils fa-2x RecipeDetail-utensilsIcon'></i>
            <p className='RecipeDetail-text'>
              {refineRecipeName(option?.sort)}
            </p>
          </div>

          <div className='RecipeDetail-recipeInfoItem'>
            <i className='fa-solid fa-globe fa-2x RecipeDetail-globeIcon'></i>
            <p className='RecipeDetail-text'>
              {refineRecipeName(categoriesId?.categoriesName)}
            </p>
          </div>
          <div className='RecipeDetail-recipeInfoItem'>
            <i className='fa-solid fa-user-group fa-2x RecipeDetail-servingIcon'></i>
            <p className='RecipeDetail-text'>
              {!size ? '' : size > 1 ? `${size} servings` : `${size} serving`}
            </p>
          </div>
          <div className='RecipeDetail-recipeInfoItem'>
            <i className='fa-regular fa-clock fa-2x RecipeDetail-timeIcon'></i>
            <p className='RecipeDetail-text'>{detectTime(time)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailHeader;
