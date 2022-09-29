import React from 'react';

import styles from './Auth.module.css';
import logo from '../images/logo.png';

const LoginPage = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.authForm}>
          <img src={logo} alt='Logo' className={styles.logo} />
          <p className={styles.authTitle}>LOGIN</p>
          <form>
            <label className={styles.email} htmlFor='email'>
              EMAIL
            </label>
            <input type='email' name='email' className={styles.authInputs} />
            <label className={styles.password} htmlFor='password'>
              PASSWORD
            </label>
            <input
              type='password'
              name='passwordcheck'
              className={styles.authInputs}
            />
            <button type='submit' className={styles.authButton}>
              LOGIN
            </button>
          </form>
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
