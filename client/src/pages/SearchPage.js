import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import './SearchPage.css';
import heart from '../images/Heart.png';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import tempFood from '../images/tempFood.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import gif from "../images/pusheen-eating-icegif.gif"
import { useNavigate } from 'react-router-dom';

export const SearchPage = (props) => {
  const pageSize = 7;
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(pageSize);
  const [currentView, setCurrentView] = useState([]);
  const [hasMode, setHasMode] = useState(true);
  const [reqData, setReqData] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (String(currentUser.token) === "null") {
      navigate('/login');
    }
    ReqDataWithToken(state);
  }, [state]);

  useEffect(() => {
    console.log(Loading);
  }, [Loading]);

  const ReqDataWithToken = async (req) => {
    setLoading(true);
    const res = await api.get(`/api/recipes/search?name=${req}`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    try {
      console.log('res', res.data);

      //checking the result vlues is existing in the database. if Not, just continue.
      if (res.data !== 'There is no searching result') {
        setReqData(res.data.recipes);
        setCurrentView(res.data.recipes.slice(0, pageSize));
      }
    } catch (error) {
      console.log('Error code ' + error);
    }
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
    console.log(temp)
    setCurrentView(temp.sort((a, b) => b[type] - a[type]));
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

  const ItemRender = ({ filteredList }) => {
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
              //have to fix the button
              setCurrentView([...reqData.slice(0, currentPage + pageSize)])
            }
          >
            Latest
          </button>
          <button
            className='searchPage-button'
            onClick={() => handleButtonEvent(reqData, "likeCount")}
          >
            Most View
          </button>
          <button
            className='searchPage-button'
            onClick={() => handleButtonEvent(reqData, "CookingTime")}
          >
            Cooking Time
          </button>
        </div>
        {Loading === true ? <img src={gif} /> : <div className='search-container'>
          <ImageList sx={{ width: '100%' }} cols={3} rowHeight={250}>
            <ItemRender filteredList={reqData} />
          </ImageList>
          {currentView.length === reqData.length ? (
            <h3 style={{ margin: '10px 120px' }}>
              Nothing More! or No result!
            </h3>
          ) : (
            <h3 className='search-tag'>Loading More...</h3>
          )}
        </div>}
      </div>
    </div>
  );
};
