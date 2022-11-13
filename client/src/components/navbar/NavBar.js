import React, { useState } from 'react';
import logo from '../../images/logo.png';
import './NavBar.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const submition = (e) => {
    e.preventDefault();
  };
  return (
    <section className='NavBar-headerContainer'>
      <img src={logo} alt='logo' draggable='false' className='NavBar-logo' onClick={() => navigate('/')} />

      <div className='NavBar-navMid'>
        <Button variant='text' style={{ color: '#6C5D53' }}>
          Category
        </Button>
        <form className='NavBar-searchBar' onSubmit={submition}>
          <input
            type='text'
            placeholder='Search bar'
            className='NavBar-bar'
            onChange={(e) => setValue(e.target.value)}
          />
          <div className='NavBar-imageWrapper'>
            <button
              type='button'
              className='NavBar-button'
              onClick={() => {
                // console.log(value)
                navigate('/search', { state: value });
              }}
            >
              <i className='fa-solid NavBar-fa-white fa-magnifying-glass fa-2xl'></i>
            </button>
          </div>
        </form>
      </div>

      <div className='NabVar-interface'>
        <button
          className='NavBar-buttonIcon'
          onClick={() => {
            alert('creating');
          }}
        >
          {
            <i className='fa-sharp fa-solid NavBar-fa-white fa-pencil fa-2xl'></i>
          }
        </button>
        <button
          className='NavBar-buttonIcon'
          onClick={() => {
            navigate('/profile')
          }}
        >
          <i className='fa-solid NavBar-fa-white fa-user fa-2xl'></i>
        </button>
      </div>
    </section>
  );
};

export default NavBar;
