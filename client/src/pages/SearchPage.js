import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import './SearchPage.css';
import heart from '../images/Heart.png';
import tempFood from '../images/tempFood.png';
import tempFood2 from '../images/TempFood2.png';
import tempFood3 from '../images/TempFood3.png';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const SearchPage = (props) => {
  const { state } = useLocation();
  let [filteredList, setFilteredList] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setFilteredList(res.filter((e) => e.caption.includes(state)));
    setKeyword(res.filter((e) => e.caption.includes(state)));
  }, [state]);

  //mock data
  let res = [
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
      heart: 238,
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
      heart: 137,
      user: 'Hoon',
    },
  ];
  
  const handleSortButton = (list) => {
    let temp = [...list];
    setFilteredList(temp.sort((a, b) => a.heart - b.heart));
  };

  let Card = (item) => {
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


  const itemRender = (filteredList) => {
    if (filteredList.length === 0) {
      return <p>Nothing</p>;
    }
    return filteredList.map((e, index) => (
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
    ));
  };

  return (
    <div>
      <NavBar />
      <div className='searchPage-container'>
        <button
          className='searchPage-button'
          onClick={() => setFilteredList(keyword)}
        >
          Latest
        </button>
        <button
          className='searchPage-button'
          onClick={() => handleSortButton(keyword)}
        >
          Most View
        </button>
        <div className='search-container'>
          <ImageList sx={{ width: '100%' }} cols={3} rowHeight={250}>
            {itemRender(filteredList)}
          </ImageList>
        </div>
      </div>
    </div>
  );
};
