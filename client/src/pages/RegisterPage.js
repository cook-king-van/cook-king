import React from 'react';

import styles from './Auth.module.css';
import logo from '../images/logo.png';

const RegisterPage = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.authForm}>
          <img src={logo} alt='Logo' className={styles.logo} />
          <p className={styles.authTitle}>REGISTER</p>
          <label className={styles.email} htmlFor='email'>
            EMAIL
          </label>
          <input type='email' name='email' className={styles.authInputs} />
          <label className={styles.password} htmlFor='password'>
            PASSWORD
          </label>
          <input
            type='password'
            name='password'
            className={styles.authInputs}
          />
          <label className={styles.password} htmlFor='password'>
            CONFIRM PASSWORD
          </label>
          <input
            type='password'
            name='passwordcheck'
            className={styles.authInputs}
          />
          <button type='submit' className={styles.authButton}>
            REGISTER
          </button>
          <a className={styles.accountMsg} href='/login'>
            Already have an account ? <u>Sign In</u>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
