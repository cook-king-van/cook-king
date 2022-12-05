import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const defaultFormFields = {
  email: '',
  password: '',
  passwordCheck: '',
  error: '',
};

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  let currentError = useSelector((state) => state.user.error);
  const currentUserInfo = useSelector((state) => state.user.userInfo);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, passwordCheck, error } = formFields;

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
      setFormFields({ ...formFields, error: emailMsg });
      return;
    }

    const pwdMsg = validatePassword(email, password);
    if (pwdMsg !== '') {
      setFormFields({ ...formFields, error: pwdMsg });
      return;
    }

    const pwdCheckMsg = validatePasswordCheck(password, passwordCheck);
    if (pwdCheckMsg !== '') {
      setFormFields({ ...formFields, error: pwdCheckMsg });
      return;
    }
    await dispatch(registerUser(email, password, passwordCheck));
    if (!loading && currentUserInfo) {
      setFormFields({ ...formFields, error: '' });
      return;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const showAlert = (
    <Alert
      //uncomment if you don't want icon in your alert
      // icon={false}
      variant='outlined'
      severity='error'
      className='Auth-authErrMsg'
      onClose={() => setFormFields({ ...formFields, error: '' })}>
      {error}
    </Alert>
  );

  const showErrorAlert = (
    <Alert
      //uncomment if you don't want icon in your alert
      // icon={false}
      variant='outlined'
      severity='error'
      className='Auth-authErrMsg'
      onClose={() => (currentError = null)}>
      {currentError}
    </Alert>
  );

  const registerScreen = (
    <form className='Auth-authForm' onSubmit={handleSubmit} noValidate={true}>
      <img src={logo} alt='Logo' className='Auth-logo' />
      <AuthInputs
        title='email'
        value={email}
        msg={error.email}
        onChange={handleChange}
        condition={validateEmail(email)}
      />
      <AuthInputs
        title='password'
        value={password}
        msg={error.password}
        onChange={handleChange}
        condition={validatePassword(email, password)}
      />
      <AuthInputs
        title='confirm password'
        type='password'
        name='passwordCheck'
        value={passwordCheck}
        msg={error.passwordCheck}
        onChange={handleChange}
        condition={validatePasswordCheck(password, passwordCheck)}
      />
      <AuthButton
        title='REGISTER'
        valid={
          validateEmail(email) ||
          validatePassword(email, password) ||
          validatePasswordCheck(password, passwordCheck)
        }
      />
      <a className='Auth-accountMsg' href='/login'>
        Already have an account ? <u>Sign In</u>
      </a>
    </form>
  );

  return (
    <div className='Auth-screen'>
      <div className='Auth-container'>
        {error && showAlert}
        {currentError && showErrorAlert}
        {loading ? <Spinner /> : registerScreen}
      </div>
    </div>
  );
};

export default RegisterPage;
