import React, { useState } from 'react';
import logo from '../../images/logo.png';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const NavBar = (props) => {
  const { searchItem } = props;
  const [value, setValue] = useState('');
  const navigate = useNavigate();


  const [showLocalRecipeWarning, setShowLocalRecipeWarning] = useState(false);
  const handleCloseWarningMsg = () => {
    setShowLocalRecipeWarning(false);
  };

  return (
    <section className='NavBar-headerContainer'>
      {showLocalRecipeWarning && (
        <>
          <Dialog
            open={showLocalRecipeWarning}
            onClose={handleCloseWarningMsg}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>
              {'You have one recipe saved.'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Would you like to continue working on it? otherwise it will be
                deleted.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleCloseWarningMsg();
                  localStorage.removeItem('recipe');
                }}
                autoFocus>
                Delete my saved recipe
              </Button>
              <Button
                onClick={() => {
                  handleCloseWarningMsg();
                  const localRecipe = localStorage.getItem('recipe');
                  navigate('/create-recipe', {
                    state: localRecipe,
                  });
                }}>
                Yes, Continue!
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <img
        src={logo}
        alt='logo'
        draggable='false'
        className='NavBar-logo'
        onClick={() => navigate('/')}
      />

      <div className='NavBar-navMid'>
        <Button variant='text' style={{ color: '#6C5D53' }}>
          Category
        </Button>
        <form className='NavBar-searchBar'>
          <input
            type='text'
            placeholder='Search bar'
            className='NavBar-bar'
            // value={searchItem}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className='NavBar-imageWrapper'>
            <button
              type='button'
              className='NavBar-button'
              onClick={() => {
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
            const localRecipe = localStorage.getItem('recipe');
            if (localRecipe) {
              setShowLocalRecipeWarning(true);
            } else {
              navigate('/create-recipe');
            }
          }}>
          {
            <i className='fa-sharp fa-solid NavBar-fa-white fa-pencil fa-2xl'></i>
          }
        </button>
        <button
          className='NavBar-buttonIcon'
          onClick={() => {
            navigate('/profile');
          }}>
          <i className='fa-solid NavBar-fa-white fa-user fa-2xl'></i>
        </button>
      </div>
    </section>
  );
};

export default NavBar;
