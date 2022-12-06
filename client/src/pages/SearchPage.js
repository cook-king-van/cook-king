import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import './SearchPage.css';
import heart from '../images/Heart.png';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import res from '../utils/mockData';
import InfiniteScroll from 'react-infinite-scroll-component';

export const SearchPage = (props) => {
  const pageSize = 7;
  const { state } = useLocation();
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageSize);
  const [currentView, setCurrentView] = useState([]);
  const [hasMode, setHasMode] = useState(true);


  useEffect(() => {
    setFilteredList(item)
    setCurrentView(item.slice(0, pageSize));
  }, [state]);
  
  
  //filter the keywords
  let item = res.filter((card) => card.caption.includes(state));

  //function for bring the next data from the reuslt
  const fetchMoreData = () => {
    if (currentView.length >= filteredList.length) {
      setHasMode(false);
      return;
    }
    //this two function have to be inside of a callback function, so will proejct to render at once.
    setTimeout(() => {
      setCurrentView(
        currentView.concat(filteredList.slice(currentPage, currentPage + pageSize))
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
      return
    }
    return (
      <InfiniteScroll
        dataLength={currentView.length}
        next={fetchMoreData}
        hasMore={hasMode}
        style={{display:'flex', flexWrap: 'wrap'}}
      >
        {currentView.map((e, index) => (
          <ImageListItem key={index} className='search-card'>
            <img
              src={`${e.url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${e.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={e.caption}
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
            onClick={() => setCurrentView([...filteredList])}
          >
            Latest
          </button>
          <button
            className='searchPage-button'
            onClick={() => handleLatestButton(item)}
          >
            Most View
          </button>
        </div>
        <div className='search-container'>
          <ImageList sx={{ width: '100%' }} cols={3} rowHeight={250}>
            {itemRender(filteredList)}
          </ImageList>
          {currentView.length === filteredList.length ? (
            <h3 style={{margin: "10px 120px"}}>Nothing More </h3> 
          ) : <h3 className='search-tag'>Loading More...</h3>}
        </div>
      </div>
    </div>
  );
};
