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
  const currentError = useSelector((state) => state.user.error);
  const currentUserInfo = useSelector((state) => state.user.userInfo);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, passwordCheck, error } = formFields;

  useEffect(() => {
    const loggedInUserRemember = localStorage.getItem('token');
    const loggedInUser = sessionStorage.getItem('token');
    if (loggedInUserRemember || loggedInUser) {
      navigate('/');
    }

    setFormFields({ ...formFields, error: currentError });
    // eslint-disable-next-line
  }, [navigate, currentUserInfo, currentError]);

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
    dispatch(registerUser(email, password, passwordCheck));
    setFormFields({ ...formFields, error: currentError });
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

  const registerScreen = (
    <form className='Auth-authForm' onSubmit={handleSubmit} noValidate={true}>
      <img src={logo} alt='Logo' className='Auth-logo' />
      <AuthInputs
        title='email'
        value={email}
        onChange={handleChange}
        condition={validateEmail(email)}
      />
      <AuthInputs
        title='password'
        value={password}
        onChange={handleChange}
        condition={validatePassword(email, password)}
      />
      <AuthInputs
        title='confirm password'
        type='password'
        name='passwordCheck'
        value={passwordCheck}
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
        {loading ? <Spinner /> : registerScreen}
      </div>
    </div>
  );
};

export default RegisterPage;
