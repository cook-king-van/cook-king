import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeDetailTags = ({ tags }) => {
  const navigate = useNavigate();

  const handleTagSearch = (tagName) => {
    navigate(`/search?name=${tagName}`, {
      state: { type: 'name', value: tagName },
    });
  };

  return (
    <div className='RecipeDetail-ingredientContainer'>
      <label className='RecipeDetail-tagTitle'>Tags</label>
      <div className='RecipeDetail-tagsContainer'>
        {tags ? (
          tags?.map((tag) => (
            <div
              key={tag._id}
              className='RecipeDetail-tag'
              onClick={() => handleTagSearch(tag?.tagName)}>
              #{tag?.tagName}
            </div>
          ))
        ) : (
          <div className='RecipeDetail-noTagText'>No Tags Found</div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailTags;
