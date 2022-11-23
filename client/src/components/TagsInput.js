import React from 'react';
import '../pages/CreateRecipePage.css';

const TagsInput = (props) => {
  const {
    addBorder,
    tags,
    sameValueIndex,
    handleKeyDown,
    removeTag,
    focusBorder,
    unFocusBorder,
  } = props;

  return (
    <div className='CreateRecipe-tagsInputOuterContainer'>
      <div
        className={`CreateRecipe-tags-input-container ${addBorder && 'focus'}`}>
        {tags.map((tag, index) => (
          <ul
            className={`CreateRecipe-tag-item ${
              sameValueIndex === index && 'CreateRecipe-same-tag-exist'
            }`}
            key={index}>
            <span className='CreateRecipe-text'>{tag}</span>
            <span
              className='CreateRecipe-close'
              onClick={() => removeTag(index)}>
              <i className='fa-solid fa-xmark fa-2xs'></i>
            </span>
          </ul>
        ))}
        <input
          onKeyDown={handleKeyDown}
          type='text'
          className='CreateRecipe-tags-input'
          onFocus={focusBorder}
          onBlur={unFocusBorder}
        />
      </div>
      <p className='CreateRecipe-example'>ex) pork, diet, babyfood, calcium</p>
    </div>
  );
};

export default TagsInput;
