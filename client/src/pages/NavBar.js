import React from 'react';
import logo from '../images/logo.png';
import './NavBar.css';
import Button from '@mui/material/Button';

export const NavBar = () => {
  return (
    <section className="NavBar-headerContainer">
      <img src={logo} alt="logo" draggable="false" className="NavBar-logo" />

      <div className="NavBar-navMid">
        <Button variant="text" style={{ color: '#6C5D53' }}>
          Category
        </Button>

        <form action="submit" className="NavBar-searchBar">
          <input type="text" placeholder="Search bar" className="NavBar-bar" />
          <div className="NavBar-imageWrapper">
            <button
              type='button'
              className="NavBar-button"
              onClick={() => {
                alert('searching');
              }}
            >
              <i className="fa-solid NavBar-fa-white fa-magnifying-glass fa-2xl"></i>
            </button>
          </div>
        </form>
      </div>

      <div className="NabVar-interface">
        <button className="NavBar-buttonIcon" onClick={() => {
              alert('creating');
            }}>
          {<i className="fa-sharp fa-solid NavBar-fa-white fa-pencil fa-2xl"></i>}
        </button>
        <button className="NavBar-buttonIcon" onClick={() => {
              alert('profile');
            }}>
          <i className="fa-solid NavBar-fa-white fa-user fa-2xl"></i>
        </button>
      </div>
    </section>
  );
};
