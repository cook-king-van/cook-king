import React from 'react';

import styles from '../pages/Auth.module.css';

const AuthButton = (props) => {
  const { title, onClick } = props;
  return (
    <>
      <button type='submit' className={styles.authButton} onClick={onClick}>
        {title}
      </button>
    </>
  );
};

export default AuthButton;
