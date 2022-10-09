import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Auth.module.css';
import logo from '../images/logo.png';
import AuthButton from '../components/AuthButton';
import AuthInputs from '../components/AuthInputs';
import Spinner from '../components/Spinner';
import { Alert } from '@mui/material';

import {
  validateEmail,
  validatePassword,
  validatePasswordCheck,
} from '../lib/authValidationUtils';
import { registerUser } from '../features/users/userSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const currentError = useSelector((state) => state.users.error);
  const currentUser = useSelector((state) => state.users.user);
  const currentUserInfo = useSelector((state) => state.userInfo);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [errorFromBack, setErrorFromBack] = useState('');
  const [user, setUser] = useState();

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
      case 'passwordcheck':
        return validatePasswordCheck(password, value);
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailMsg = validationHandler('email', email);
    const pwdMsg = validationHandler('password', password);
    const pwdCheckMsg = validationHandler('passwordcheck', passwordCheck);
    setErrorMsg({
      ...errorMsg,
      email: emailMsg,
      password: pwdMsg,
      passwordCheck: pwdCheckMsg,
    });
    if (emailMsg !== '' || pwdMsg !== '' || pwdCheckMsg !== '') {
      return;
    }
    dispatch(registerUser(email, password));
    if (currentUserInfo) {
      setUser(currentUser);
    }
    setErrorFromBack(currentError);
  };

  const showAlert = (type, msg) => (
    <Alert
      //uncomment if you don't want icon in your alert
      // icon={false}
      variant='outlined'
      severity='error'
      className={styles.authErrMsg}
      onClose={() => {
        type ? setErrorMsg({ ...errorMsg, [type]: '' }) : setErrorFromBack(msg);
      }}>
      {msg}
    </Alert>
  );

  const registerScreen = (
    <form className={styles.authForm} onSubmit={handleSubmit} noValidate={true}>
      <img src={logo} alt='Logo' className={styles.logo} />
      <AuthInputs
        title='email'
        value={email}
        msg={errorMsg.email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <AuthInputs
        title='password'
        value={password}
        msg={errorMsg.password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <AuthInputs
        title='confirm password'
        type='password'
        value={passwordCheck}
        msg={errorMsg.passwordCheck}
        onChange={(e) => {
          setPasswordCheck(e.target.value);
        }}
      />
      <AuthButton title='REGISTER' />
      <a className={styles.accountMsg} href='/login'>
        Already have an account ? <u>Sign In</u>
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
        {(errorMsg.email && showAlert('email', errorMsg.email)) ||
          (errorMsg.password && showAlert('password', errorMsg.password)) ||
          (errorMsg.passwordCheck &&
            showAlert('passwordCheck', errorMsg.passwordCheck)) ||
          ''}
        {errorFromBack ? showAlert(errorFromBack) : ''}
        {loading ? <Spinner /> : registerScreen}
      </div>
    </div>
  );
};

export default RegisterPage;
