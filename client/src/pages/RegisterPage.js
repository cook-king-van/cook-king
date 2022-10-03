import React from 'react';

import styles from './Auth.module.css';
import logo from '../images/logo.png';
import AuthButton from '../components/AuthButton';
import AuthInputs from '../components/AuthInputs';

const RegisterPage = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.authForm}>
          <img src={logo} alt='Logo' className={styles.logo} />
          <AuthInputs title='email' />
          <AuthInputs title='password' />
          <AuthInputs title='confirm password' type='password' />
          <AuthButton title='REGISTER' />
          <a className={styles.accountMsg} href='/login'>
            Already have an account ? <u>Sign In</u>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
