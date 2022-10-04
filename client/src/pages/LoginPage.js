import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import AuthButton from '../components/AuthButton';
import AuthInputs from '../components/AuthInputs';
import styles from './Auth.module.css';
import logo from '../images/logo.png';
import { Alert } from '@mui/material';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send the username and password to the server
    const user = { email, password };
    axios.post('http://{ourURL}/api/login', user).then(
      (res) => {
        setUser(res.data);
        // store the user in localStorage if checkbox is ticked
        if (isRemember) localStorage.setItem('user', res.data);
        else sessionStorage.setItem('user', res.data);

        navigate('/');
      },
      (err) => {
        console.log('error! => ', err);
        setError('Incorrect Email or Password.');
      }
    );
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

  //if user is already logged in , redirect to the main page
  if (user) {
    <Navigate replace to='/' />;
  }

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        {error ? showAlert : ''}
        <form className={styles.authForm} onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
};

export default LoginPage;
