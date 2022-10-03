import React from 'react';

import styles from '../pages/Auth.module.css';

const AuthInputs = (props) => {
  const { title, type } = props;
  return (
    <>
      <label className={styles.email} htmlFor={title}>
        {title.toUpperCase()}
      </label>
      <input
        type={type ? type : title}
        name={title}
        className={styles.authInputs}
      />
    </>
  );
};

export default AuthInputs;
