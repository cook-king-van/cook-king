import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthButton from '../components/AuthButton';
import AuthInputs from '../components/AuthInputs';
import Spinner from '../components/Spinner';
import styles from './Auth.module.css';
import logo from '../images/logo.png';
import { Alert } from '@mui/material';
import { loginUser } from '../features/users/userSlice';

import { validateEmail, validatePassword } from '../lib/authValidationUtils';

const LoginPage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.users.loading);
  const currentError = useSelector((state) => state.users.error);
  const currentUser = useSelector((state) => state.users.user);
  const currentUserInfo = useSelector((state) => state.userInfo);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    const loggedInUserRemember = localStorage.getItem('user');
    const loggedInUser = sessionStorage.getItem('user');
    if (loggedInUserRemember) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const validationHandler = (key, value) => {
    switch (key) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(email, value);
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailMsg = validationHandler('email', email);
    setError(emailMsg);
    if (emailMsg !== '') {
      return;
    }
    const pwdMsg = validationHandler('password', password);
    setError(pwdMsg);
    if (pwdMsg !== '') {
      return;
    }
    dispatch(loginUser(email, password, isRemember));
    if (currentUserInfo) {
      setUser(currentUser);
    }
    setError(currentError);
  };

  const showAlert = (
    <Alert
      //uncomment if you don't want icon in your alert
      // icon={false}
      variant='outlined'
      severity='error'
      className={styles.authErrMsg}
      onClose={() => {
        setError('');
      }}>
      {error}
    </Alert>
  );

  const loginScreen = (
    <form className={styles.authForm} onSubmit={handleSubmit} noValidate={true}>
      <img src={logo} alt='Logo' className={styles.logo} />
      <AuthInputs
        title='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInputs
        title='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles.staySignIn}>
        <label className={styles.checkboxLabel}>
          <input
            type='checkbox'
            className={styles.checkbox}
            checked={isRemember}
            onChange={() => setIsRemember(!isRemember)}
          />
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
    </form>
  );

  //if user is already logged in , redirect to the main page
  if (user) {
    <Navigate replace to='/' />;
  }

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        {error && showAlert}
        {loading ? <Spinner /> : loginScreen}
      </div>
    </div>
  );
};

export default LoginPage;
