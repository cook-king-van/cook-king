import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import './SearchPage.css';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

export const SearchPage = () => {
  const pageSize = 7;
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(pageSize);
  const [currentView, setCurrentView] = useState([]);
  const [hasMode, setHasMode] = useState(true);
  const [reqData, setReqData] = useState([]);
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    ReqDataWithToken(state);
  }, [state]);

  useEffect(() => {}, [Loading]);

  const ReqDataWithToken = async (req) => {
    setLoading(true);
    const res = await axios.get(`/api/recipes/search?${req.type}=${req.value}`);

    try {
      //checking the result vlues is existing in the database. if Not, just continue.
      if (res.data !== 'There is no searching result') {
        setReqData(res.data.recipes);
        setCurrentView(res.data.recipes.slice(0, pageSize));
      }
    } catch (error) {}
    setLoading(false);
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

  const handleButtonEvent = (list, type) => {
    const temp = [...list];
    setCurrentView(temp.sort((a, b) => b[type] - a[type]));
  };

  const Card = (item) => {
    let eachItem = item.item;
    return (
      <>
        <h4>{eachItem.recipeName}</h4>
        <div className='search-title'>
          <p
            style={{ alignItems: 'center', display: 'flex' }}
            className='Search-userText'>
            <i className='fa-solid fa-heart Search-heartIcon'></i>
            {eachItem.likeCount}
          </p>
          <p>
            <i
              className='fa-regular fa-clock MainList-timeIcon'
              style={{ margin: '0 5px' }}></i>{' '}
            {eachItem.time}
          </p>
          {eachItem.userId ? <p>{eachItem.userId.name}</p> : null}
        </div>
      </>
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
        style={{ display: 'flex', flexWrap: 'wrap' }}>
        {currentView.map((e, index) => (
          <ImageListItem
            key={index}
            className='search-card'
            onClick={() => {
              navigate(`/recipe/${e._id}`);
            }}>
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
            className='searchPage-button'
            onClick={() =>
              //have to fix the button
              setCurrentView([...reqData.slice(0, currentPage + pageSize)])
            }>
            Latest
          </button>
          <button
            className='searchPage-button'
            onClick={() => handleButtonEvent(reqData, 'likeCount')}>
            Most View
          </button>
          <button
            className='searchPage-button'
            onClick={() => handleButtonEvent(reqData, 'CookingTime')}>
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
              <ItemRender filteredList={reqData} />
            </ImageList>
            {currentView.length !== reqData.length ?? (
              <h3 className='search-tag'>Loading More...</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
