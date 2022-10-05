import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import styles from './Auth.module.css';
import logo from '../images/logo.png';
import AuthButton from '../components/AuthButton';
import AuthInputs from '../components/AuthInputs';
import { Alert } from '@mui/material';

import {
  validateEmail,
  validatePassword,
  validatePasswordCheck,
} from '../lib/authValidationUtils';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
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
    // send the username and password for a new user to the server
    const user = { email, password };
    const response = await axios.post('http://{ourURL}/api/login', user);

    setUser(response.data);
    sessionStorage.setItem('user', response.data);

    navigate('/');
  };

  const showAlert = (type, msg) => (
    <Alert
      //uncomment if you don't want icon in your alert
      // icon={false}
      variant='outlined'
      severity='error'
      className={styles.authErrMsg}
      onClose={() => {
        setErrorMsg({ ...errorMsg, [type]: '' });
      }}>
      {msg}
    </Alert>
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
        <form className={styles.authForm} onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
};

export default RegisterPage;
