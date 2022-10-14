import React from 'react';
import styles from '../pages/UserProfile.module.css';

const EditPencilButton = (props) => {
  const { onClick, styleName } = props;
  return (
    <>
      <button className={styleName} onClick={onClick}>
        <i
          className={`fa-sharp fa-solid fa-pencil fa-lg ${styles.editIcon}`}></i>
      </button>
    </>
  );
};

export default EditPencilButton;
