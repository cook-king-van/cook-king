import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Auth.css';
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
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const currentError = useSelector((state) => state.user.error);
  const currentUserInfo = useSelector((state) => state.user.userInfo);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedInUserRemember = localStorage.getItem('token');
    const loggedInUser = sessionStorage.getItem('token');
    if (loggedInUserRemember || loggedInUser) {
      navigate('/');
    }
  }, [navigate, currentUserInfo, currentError, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailMsg = validateEmail(email);
    if (emailMsg !== '') {
      setError(emailMsg);
      return;
    }

    const pwdMsg = validatePassword(email, password);
    if (pwdMsg !== '') {
      setError(pwdMsg);
      return;
    }

    const pwdCheckMsg = validatePasswordCheck(password, passwordCheck);
    if (pwdCheckMsg !== '') {
      setError(pwdCheckMsg);
      return;
    }
    await dispatch(registerUser(email, password, passwordCheck));
    if (!loading && currentUserInfo) {
      setError('');
      return;
    }
  };

  const showAlert = (
    <Alert
      //uncomment if you don't want icon in your alert
      // icon={false}
      variant='outlined'
      severity='error'
      className='Auth-authErrMsg'
      onClose={() => setError('')}>
      {error ? error : currentError}
    </Alert>
  );

  const registerScreen = (
    <form className='Auth-authForm' onSubmit={handleSubmit} noValidate={true}>
      <img src={logo} alt='Logo' className='Auth-logo' />
      <AuthInputs
        title='email'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <AuthInputs
        title='password'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <AuthInputs
        title='confirm password'
        type='password'
        value={passwordCheck}
        onChange={(e) => {
          setPasswordCheck(e.target.value);
        }}
      />
      <AuthButton title='REGISTER' />
      <a className='Auth-accountMsg' href='/login'>
        Already have an account ? <u>Sign In</u>
      </a>
    </form>
  );

  return (
    <div className='Auth-screen'>
      <div className='Auth-container'>
        {error && showAlert}
        {currentError && showAlert}
        {loading ? <Spinner /> : registerScreen}
      </div>
    </div>
  );
};

export default RegisterPage;
