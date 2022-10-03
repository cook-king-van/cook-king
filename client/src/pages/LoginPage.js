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
          <AuthButton title='LOGIN' />
          <a className={styles.accountMsg} href='/register'>
            Don't have an account ? <u>Sign Up</u>
          </a>
          <a
            className={`${styles.pwdForgotMsg} ${styles.accountMsg}`}
            href='/login-recovery'>
            <u>Forgot Your Password ?</u>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
