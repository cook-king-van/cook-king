import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthButton from '../components/AuthButton';
import AuthInputs from '../components/AuthInputs';
import Spinner from '../components/Spinner';
import './Auth.css';
import logo from '../images/logo.png';
import { Alert } from '@mui/material';
import { loginUser } from '../features/users/userSlice';

import { validateEmail, validatePassword } from '../lib/authValidationUtils';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user.loading);
  const currentError = useSelector((state) => state.user.error);
  const currentUser = useSelector((state) => state.user.userInfo);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    const loggedInUserRemember = localStorage.getItem('token');
    const loggedInUser = sessionStorage.getItem('token');
    if (loggedInUserRemember || loggedInUser) {
      navigate('/');
    }
    setError(currentError);
  }, [navigate, currentError, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailMsg = validateEmail(email);
    setError(emailMsg);
    if (emailMsg !== '') {
      return;
    }
    const pwdMsg = validatePassword(email, password);
    setError(pwdMsg);
    if (pwdMsg !== '') {
      return;
    }
    dispatch(loginUser(email, password, isRemember));
    setError(currentError);
  };

  const showAlert = (
    <Alert
      //uncomment if you don't want icon in your alert
      // icon={false}
      variant='outlined'
      severity='error'
      className='Auth-authErrMsg'
      onClose={() => {
        setError('');
      }}>
      {error}
    </Alert>
  );

  const loginScreen = (
    <form className='Auth-authForm' onSubmit={handleSubmit} noValidate={true}>
      <img src={logo} alt='Logo' className='Auth-logo' />
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
      <div className='Auth-staySignIn'>
        <label className='Auth-checkboxLabel'>
          <input
            type='checkbox'
            className='Auth-checkbox'
            checked={isRemember}
            onChange={() => setIsRemember(!isRemember)}
          />
          <span className='Auth-checkmark'></span>
          <p>Remember me</p>
        </label>
        <a className='Auth-pwdForgotMsg Auth-accountMsg' href='/login-recovery'>
          Forgot password ?
        </a>
      </div>
      <AuthButton title='LOGIN' />
      <a className='Auth-accountMsg' href='/register'>
        Don't have an account ? <u>Sign Up</u>
      </a>
    </form>
  );

  return (
    <div className='Auth-screen'>
      <div className='Auth-container'>
        {error && showAlert}
        {loading ? <Spinner /> : loginScreen}
      </div>
    </div>
  );
};

export default LoginPage;
