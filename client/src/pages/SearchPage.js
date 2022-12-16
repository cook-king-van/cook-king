import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import './SearchPage.css';
import heart from '../images/Heart.png';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import res from '../utils/mockData';
import tempFood from '../images/tempFood.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useSelector } from 'react-redux';
import api from '../utils/api';

export const SearchPage = (props) => {
  const pageSize = 7;
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(pageSize);
  const [currentView, setCurrentView] = useState([]);
  const [hasMode, setHasMode] = useState(true);
  const [reqData, setReqData] = useState([]);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    ReqDataWithToken()
    // console.log(currentUser.token)
  }, [state]);



  const ReqDataWithToken = async () => {
    await api.get('/api/recipes/search?name=', {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    try {
      // console.log("res",res);
      setReqData(res);
      setCurrentView(res.slice(0, pageSize));
    } catch (error) {
      console.log('Error code ' + error);
    }
  };

  //function for bring the next data from the reuslt
  const fetchMoreData = () => {
    if (currentView.length >= reqData.length) {
      setHasMode(false);
      return;
    }
    //this two function have to be inside of a callback function, so will proejct to render at once.
    setTimeout(() => {
      setCurrentView(
        currentView.concat(reqData.slice(currentPage, currentPage + pageSize))
      );
      setCurrentPage((prev) => prev + 7);
    }, 1000);
  };

  const handleLatestButton = (list) => {
    const temp = [...list];
    setCurrentView(temp.sort((a, b) => b.heart - a.heart));
  };

  const Card = (item) => {
    let eachItem = item.item;
    return (
      <>
        <h5>{eachItem.recipeName}</h5>
        <div className='search-title'>
          <p style={{ alignItems: 'center', display: 'flex' }}>
            <img src={heart} alt=''></img>
            {eachItem.likeCount}
          </p>
          {eachItem.userId ? <p>{eachItem.userId.name}</p> : <p>null</p>}
        </div>
      </>
    );
  };

  const ItemRender = ({filteredList}) => {
    if (filteredList.length === 0) {
      return;
    }
    return (
      <InfiniteScroll
        dataLength={currentView.length}
        next={fetchMoreData}
        hasMore={hasMode}
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {currentView.map((e, index) => (
          <ImageListItem key={index} className='search-card'>
            <img
              src={tempFood}
              // src={`${e.url}?w=164&h=164&fit=crop&auto=format`}
              // srcSet={`${e.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={index}
              loading='lazy'
            />
            <ImageListItemBar position='below' title={<Card item={e} />} />
          </ImageListItem>
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <div>
      <NavBar searchItem={state} />
      <div className='searchPage-container'>
        <div className='button-container'>
          <button
            className='searchPage-button'
            onClick={() =>
              setCurrentView([...reqData.slice(0, currentPage + pageSize)])
            }
          >
            Latest
          </button>
          <button
            className='searchPage-button'
            onClick={() => handleLatestButton(reqData)}
          >
            Most View
          </button>
        </div>
        <div className='search-container'>
          <ImageList sx={{ width: '100%' }} cols={3} rowHeight={250}>
            <ItemRender filteredList={reqData} />
          </ImageList>
          {currentView.length === reqData.length ? (
            <h3 style={{ margin: '10px 120px' }}>Nothing More </h3>
          ) : (
            <h3 className='search-tag'>Loading More...</h3>
          )}
        </div>
      </div>
    </div>
  );
};
