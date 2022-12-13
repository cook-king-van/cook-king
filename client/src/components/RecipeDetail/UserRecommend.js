import React, { forwardRef, useState, useEffect } from 'react';
import heart from '../../images/Heart.png';
import tempFood from '../../images/tempFood.png';
import tempFood2 from '../../images/TempFood2.png';
import tempFood3 from '../../images/TempFood3.png';
import '../../pages/SearchPage.css';
import '../../pages/UserProfilePage.css';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Avatar,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
const UserRecommend = () => {
  const { state } = useLocation();
  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    setFilteredList(item);
  }, [state]);
  //mock data
  const item = [
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
  ];

  //   let item = res.filter((card) => card.caption.includes(state));

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
      <Avatar
        alt={'Cookking'}
        sx={{ width: 140, height: 140 }}
        className='UserProfile-userIcon'
      />
      <div className='search-container'>
        <ImageList sx={{ width: '100%' }} cols={3} rowHeight={250}>
          {itemRender(filteredList)}
        </ImageList>
      </div>
    </div>
  );
};
export default UserRecommend;
