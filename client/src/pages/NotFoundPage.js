import React from 'react';
import './NotFoundPage.css';
import notFound from '../images/error404.png';

const NotFoundPage = () => {
  return (
    <div className='NotFoundPage-container'>
      <img src={notFound} alt='404' />
      Page Not Found
    </div>
  );
};

export default NotFoundPage;
