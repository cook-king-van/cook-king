import React, { useState } from 'react';
import  NavBar  from '../components/navbar/NavBar';
import './SearchPage.css';
import heart from '../images/Heart.png';
import tempFood from '../images/tempFood.png';
import tempFood2 from '../images/TempFood2.png';
import tempFood3 from '../images/TempFood3.png';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const SearchPage = (props) => {
  const { state } = useLocation();
  const filteredList = [];

  //mock data
  const res = [
    {
      url: tempFood,
      caption: 'Slide 1',
      heart: 135,
      user: 'Jay',
    },
    {
      url: tempFood2,
      caption: 'Slide 2',
      heart: 12,
      user: 'Yun',
    },
    {
      url: tempFood3,
      caption: 'Slide 3',
      heart: 138,
      user: 'Hoon',
    },
    {
      url: tempFood,
      caption: 'Slide 4',
      heart: 138,
      user: 'Hoon',
    },
    {
      url: tempFood2,
      caption: 'Slide 5',
      heart: 138,
      user: 'Hoon',
    },
    {
      url: tempFood2,
      caption: 'Slide 5',
      heart: 138,
      user: 'Hoon',
    },
    {
      url: tempFood2,
      caption: 'Slide 5',
      heart: 138,
      user: 'Hoon',
    },
  ];

  const Card = (item) => {
    let eachItem = item.item;
    return (
      <>
        <h5>{eachItem.caption}</h5>
        <div className='search-title'>
          <p style={{ alignItems: 'center', display: 'flex' }}>
            <img src={heart} alt=''></img>
            {eachItem.heart}
          </p>
          <p>{eachItem.user}</p>
        </div>
      </>
    );
  };

  let filter = (value) => {
    let filtered = res.filter((e) => e.caption.includes(value));
    filteredList = filtered;
  };
  filter(state);
  return (
    <div>
      <NavBar />
      <button>Sort</button>
      <button>Most View</button>
      <div className='search-container'>
        <ImageList sx={{ width: '100%' }} cols={3} rowHeight={250}>
          {filteredList.map((e, index) => (
            <ImageListItem key={index} className='search-card'>
              <img
                // style={{ width: "250px", height: "255px" }}
                src={`${e.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${e.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={e.caption}
                loading='lazy'
              />
              <ImageListItemBar position='below' title={<Card item={e} />} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};
