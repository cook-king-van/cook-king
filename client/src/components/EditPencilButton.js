import React from 'react';
import '../pages/UserProfilePage.css';

const EditPencilButton = (props) => {
  const { onClick, styleName } = props;
  return (
    <>
      <button className={styleName} onClick={onClick}>
        <i className='fa-sharp fa-solid fa-pencil fa-lg UserProfile-editIcon'></i>
      </button>
    </>
  );
};

export default EditPencilButton;
