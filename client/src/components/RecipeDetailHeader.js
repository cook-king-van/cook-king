import React from 'react';

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
  } = props;

  const detectTime = (time) => {
    switch (time) {
      case time === 120:
        return '< 2 hrs';
      case time === 999:
        return '2 hrs >';
      default:
        return `< ${time} min`;
    }
  };
  return (
    <div className='RecipeDetail-container'>
      <div className='RecipeDetail-photoContainer'>
        {isOwner && (
          <button
            className='RecipeDetail-editBtn'
            onClick={() => editRecipe(_id)}>
            edit
          </button>
        )}
        {recipeImage ? (
          <>
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
          </>
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
          <div>
            <i className='fa-solid fa-user-group fa-2x RecipeDetail-servingIcon'></i>
            <p className='RecipeDetail-serving'>
              {size > 1 ? `${size} servings` : `${size} serving`}
            </p>
          </div>
          <div>
            <i className='fa-regular fa-clock fa-2x RecipeDetail-timeIcon'></i>
            <p className='RecipeDetail-time'>{detectTime(time)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailHeader;
