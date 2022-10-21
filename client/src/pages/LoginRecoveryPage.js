import React from 'react';

import AuthInputs from '../components/AuthInputs';

import './Auth.css';

const LoginRecoveryPage = () => {
  return (
    <div className='Auth-screen'>
      <div className='Auth-container'>
        <div className='Auth-authForm'>
          <p className='Auth-authTitle'>ACCOUNT RECOVERY</p>
          <AuthInputs title='email' />
          <div className='Auth-recoveryBottom'>
            <a className='Auth-recoveryMsg Auth-accountMsg' href='/login'>
              Back to Sign In
            </a>
            <button type='submit' className='Auth-recoveryBtn'>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRecoveryPage;
