import React from 'react';

import '../pages/Auth.css';

const AuthButton = (props) => {
  const { title, onClick, valid } = props;
  return (
    <>
      <button type='submit' className='Auth-authButton' onClick={onClick} disabled={valid}>
        {title}
      </button>
    </>
  );
};

export default AuthButton;
