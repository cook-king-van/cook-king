import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import './SearchPage.css';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import detectTime from '../lib/detectTime';
import { current } from '@reduxjs/toolkit';

export const SearchPage = () => {
  // const pageSize = 7;
  const { state } = useLocation();
  // const [currentPage, setCurrentPage] = useState(pageSize);
  const [currentView, setCurrentView] = useState([]);
  const [hasMode, setHasMode] = useState(true);
  const [type, setType] = useState('');
  const [Loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState([false, false, false]);
  const [pageNumber, setPageNumber] = useState(1);
  const [backupView, setBackupView] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
    setCurrentView([]);
    ReqDataWithToken(state);
  }, [state]);

  useEffect(() => {}, [Loading]);

  const ReqDataWithToken = async (req) => {
    // setCurrentView([])
    setLoading(true);
    let res = null;
    if (req.value === 'todayBest') {
      res = await axios.get(`/api/recipes/search?best&page${1}`);
      setType('best');
    } else {
      res = await axios.get(
        `/api/recipes/search?${req.type}=${req.value}&page=${1}`
      );
      setType(req.type);
    }
    // console.log('res', res);
    try {
      //checking the result vlues is existing in the database. if Not, just continue.
      if (res.data === 'There is no searching result') {
        setCurrentView([]);
      } else if (req.type === 'option') {
        console.log('option', res.data.recipes);
        setCurrentView(res.data.recipes);
      } else if (res.data !== 'name') {
        setCurrentView(res.data.recipes);
      } else if (req.type === 'category') {
        setCurrentView(res.data.recipes);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setBackupView(res.data.recipes);
  };

  //function for bring the next data from the reuslt
  const fetchMoreData = async () => {
    console.log('fetch', type, state.value, pageNumber + 1);
    const nextPage = await axios.get(
      `/api/recipes/search?${type}=${state.value}&page=${pageNumber + 1}`
    );
    try {
      console.log('next', nextPage, pageNumber);

      if (nextPage.data === 'There is no searching result') {
        setHasMode(false);
        return;
      }

      setTimeout(() => {
        setCurrentView(currentView.concat(nextPage.data.recipes));
        setPageNumber((prev) => prev + 1);
        setBackupView(currentView.concat(nextPage.data.recipes));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortEvent = (list, type) => {
    const temp = [...list];
    // console.log(temp[0].updatedAt)
    setCurrentView(temp.sort((a, b) => b[type] - a[type]));
  };

  const handleCookingEvent = (list, type) => {
    const temp = [...list];
    setCurrentView(temp.sort((a, b) => a[type] - b[type]));
  };

  const Card = (item) => {
    let eachItem = item.item;
    return (
      <div className='search-title'>
        <h4 className='search-recipeName'>{eachItem.recipeName}</h4>
        <div className='search-infoBox'>
          <p className='search-userText'>
            <i className='fa-solid fa-heart search-heartIcon'></i>
            {eachItem.likeCount}
          </p>
          <p className='search-userText'>
            <i className='fa-regular fa-clock search-timeIcon'></i>
            {detectTime(eachItem.time)}
          </p>
        </div>
        <div className='search-userInfoBox'>
          <p className='search-userText'>
            {eachItem?.userId && eachItem?.userId?.name}
          </p>
          <p className='search-userText'>
            {eachItem?.updatedAt?.split('T')[0] || eachItem?.createdAt}
          </p>
        </div>
      </div>
    );
  };

  const ItemRender = ({ filteredList }) => {
    if (filteredList.length === 0) {
      return;
    }
    return (
      <InfiniteScroll
        className='Search-contentContainer'
        dataLength={currentView.length}
        next={fetchMoreData}
        hasMore={hasMode}
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {currentView.map((e, index) => (
          <ImageListItem
            key={index}
            className='search-card'
            onClick={() => {
              navigate(`/recipe/${e._id}`);
            }}
          >
            <img
              src={e.recipeImage}
              className='Search-cardImage'
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
      <NavBar searchItem={state} searchValue={state.value} />
      <div className='searchPage-container'>
        <div className='button-container'>
          <button
            className={`searchPage-button
              ${isClicked[0] && 'searchPage-button-clicked'}`}
            onClick={() => {
              setCurrentView(backupView);
              setIsClicked(
                isClicked.map((data, i) => (i === 0 ? true : false))
              );
            }}
          >
            Latest
          </button>
          <button
            className={`searchPage-button
            ${isClicked[1] && 'searchPage-button-clicked'}`}
            onClick={() => {
              handleSortEvent(currentView, 'likeCount');
              setIsClicked(
                isClicked.map((data, i) => (i === 1 ? true : false))
              );
            }}
          >
            Most Liked
          </button>
          <button
            className={`searchPage-button
            ${isClicked[2] && 'searchPage-button-clicked'}`}
            onClick={() => {
              handleCookingEvent(currentView, 'time');
              setIsClicked(
                isClicked.map((data, i) => (i === 2 ? true : false))
              );
            }}
          >
            Cooking Time
          </button>
        </div>
        {Loading === true ? (
          <div className='search-loading'>
            <Spinner />
          </div>
        ) : (
          <div className='search-container'>
            <ImageList sx={{ width: '100%' }} cols={3} rowHeight={250}>
              <ItemRender filteredList={currentView} />
            </ImageList>
            {console.log('current', currentView)}
            {currentView.length === 0 && (
              <h3 className='search-tag'>There are No result!</h3>
            )}
            {hasMode === false ? (
              <h3 className='search-tag'>No more results!</h3>
            ) : (
              <h3 className='search-tag'>Loading more results!</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
