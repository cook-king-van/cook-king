import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthButton from '../components/AuthButton';
import AuthInputs from '../components/AuthInputs';
import Spinner from '../components/Spinner';
import './Auth.css';
import logo from '../images/logo.png';
import { Alert } from '@mui/material';
import { loginUser } from '../features/users/userSlice';

import { validateEmail, validatePassword } from '../lib/authValidationUtils';

const defaultFormFields = {
  email: '',
  password: '',
  error: '',
  isRemember: false,
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user.loading);
  const currentError = useSelector((state) => state.user.error);
  const currentUser = useSelector((state) => state.user.userInfo);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, error, isRemember } = formFields;

  useEffect(() => {
    const loggedInUserRemember = localStorage.getItem('token');
    const loggedInUser = sessionStorage.getItem('token');
    if (loggedInUserRemember || loggedInUser) {
      navigate('/');
    }
    setFormFields({ ...formFields, error: currentError });
    // eslint-disable-next-line
  }, [navigate, currentError, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailMsg = validateEmail(email);
    setFormFields({ ...formFields, error: emailMsg });
    if (emailMsg !== '') {
      return;
    }
    const pwdMsg = validatePassword(email, password);
    setFormFields({ ...formFields, error: pwdMsg });
    if (pwdMsg !== '') {
      return;
    }
    dispatch(loginUser(email, password, isRemember));
    setFormFields({ ...formFields, error: currentError });
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
      onClose={() => {
        setFormFields({ ...formFields, error: '' });
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
        condition={validateEmail(email)}
      />
      <AuthInputs
        title='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        condition={validatePassword(email, password)}
      />
      <div className='Auth-staySignIn'>
        <label className='Auth-checkboxLabel'>
          <input
            type='checkbox'
            name='isRemember'
            className='Auth-checkbox'
            checked={isRemember}
            onChange={(e) => {
              setFormFields({ ...formFields, isRemember: !isRemember });
            }}
          />
          <span className='Auth-checkmark'></span>
          <p>Remember me</p>
        </label>
        <a className='Auth-pwdForgotMsg Auth-accountMsg' href='/login-recovery'>
          Forgot password ?
        </a>
      </div>
      <AuthButton
        title='LOGIN'
        valid={validateEmail(email) || validatePassword(email, password)}
      />
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
