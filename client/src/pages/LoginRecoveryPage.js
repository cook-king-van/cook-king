import React from 'react';

import AuthInputs from '../components/AuthInputs';

import styles from './Auth.module.css';

const LoginRecoveryPage = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.authForm}>
          <p className={styles.authTitle}>ACCOUNT RECOVERY</p>
          <AuthInputs title='email' />
          <div className={styles.recoveryBottom}>
            <a
              className={`${styles.recoveryMsg} ${styles.accountMsg}`}
              href='/login'>
              Back to Sign In
            </a>
            <button type='submit' className={styles.recoveryBtn}>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRecoveryPage;
