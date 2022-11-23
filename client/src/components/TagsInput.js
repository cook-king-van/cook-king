import React, { useState } from 'react';
import '../pages/CreateRecipePage.css';

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [addBorder, setAddBorder] = useState(false);
  const [sameValueIndex, setSameValueIndex] = useState('');

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    if (tags.indexOf(value) !== -1) {
      const index = tags.indexOf(value);
      setTimeout(() => {
        setSameValueIndex('');
      }, 300);
      setSameValueIndex(index);
      return;
    }
    setTags([...tags, value]);
    e.target.value = '';
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  const focusBorder = () => {
    setAddBorder(true);
  };

  const unFocusBorder = () => {
    setAddBorder(false);
  };

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
