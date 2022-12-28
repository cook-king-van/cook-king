import React from 'react';

const RecipeDetailTags = ({ tags }) => {
  return (
    <div className='RecipeDetail-ingredientContainer'>
      <label className='RecipeDetail-tagTitle'>Tags</label>
      <div className='RecipeDetail-tagsContainer'>
        {tags?.map((tag) => (
          <div key={tag._id} className='RecipeDetail-tag'>
            #{tag?.tagName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetailTags;
