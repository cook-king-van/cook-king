import React from 'react';

import '../pages/Auth.css';

const AuthButton = (props) => {
  const { title, onClick } = props;
  return (
    <>
      <button type='submit' className='Auth-authButton' onClick={onClick}>
        {title}
      </button>
    </>
  );
};

export default AuthButton;
