import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Menu,
  MenuItem,
  Fade,
} from '@mui/material';

const NavBar = ({ searchValue }) => {
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [cateogriesList, setCategoriesList] = useState([]);

  const [showLocalRecipeWarning, setShowLocalRecipeWarning] = useState(false);
  const handleCloseWarningMsg = () => {
    setShowLocalRecipeWarning(false);
  };

  useEffect(() => {
    ReqCategories();
    if (searchValue) {
      setValue(searchValue);
    }
  }, [searchValue]);

  const ReqCategories = async () => {
    try {
      const res = await axios.get('/api/recipes/categories');
      setCategoriesList(res.data);
    } catch (error) {
      // dispatch error
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const categoryHandleButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const categoryHandleClose = () => {
    setAnchorEl(null);
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
        <Button
          id='fade-button'
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={categoryHandleButton}
          style={{ color: '#6C5D53' }}>
          Category
          <i className='fa-solid fa-caret-down'></i>
        </Button>
        <Menu
          id='fade-menu'
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={categoryHandleClose}
          TransitionComponent={Fade}>
          {cateogriesList.map((item, index) => {
            if (index === cateogriesList.length - 1) {
              return null;
            }
            return (
              <MenuItem
                key={index}
                onClick={() => {
                  navigate(`/search?category=${item.categoriesName}`, {
                    state: { type: 'category', value: item.categoriesName },
                  });
                  categoryHandleClose()
                }
                  
                  
                }
                style={{ color: '#6C5D53' }}>
                {item.categoriesName.toUpperCase()}
              </MenuItem>
            );
          })}
        </Menu>
        <form className='NavBar-searchBar' onSubmit={onFormSubmit}>
          <input
            type='text'
            placeholder='Search bar'
            value={value}
            className='NavBar-bar'
            onChange={(e) => setValue(e.target.value)}
          />
          <div className='NavBar-imageWrapper'>
            <button
              type='submit'
              className='NavBar-button'
              onClick={() => {
                navigate(`/search?name=${value}`, {
                  state: { type: 'name', value: value },
                });
              }}>
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
