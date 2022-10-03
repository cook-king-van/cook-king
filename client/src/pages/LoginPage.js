import React from 'react';

import AuthButton from '../components/AuthButton';
import AuthInputs from '../components/AuthInputs';

import styles from './Auth.module.css';
import logo from '../images/logo.png';

const LoginPage = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.authForm}>
          <img src={logo} alt='Logo' className={styles.logo} />
          <AuthInputs title='email' />
          <AuthInputs title='password' />
          <div className={styles.staySignIn}>
            <label className={styles.checkboxLabel}>
              <input type='checkbox' className={styles.checkbox} />
              <span className={styles.checkmark}></span>
              <p>Remember me</p>
            </label>
            <a
              className={`${styles.pwdForgotMsg} ${styles.accountMsg}`}
              href='/login-recovery'>
              Forgot password ?
            </a>
          </div>
          <AuthButton title='LOGIN' />
          <a className={styles.accountMsg} href='/register'>
            Don't have an account ? <u>Sign Up</u>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
