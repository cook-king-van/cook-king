import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import './SearchPage.css';
import heart from '../images/Heart.png';
import tempFood from '../images/tempFood.png';
import tempFood2 from '../images/TempFood2.png';
import tempFood3 from '../images/TempFood3.png';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import res from "../utils/mockData";
import InfiniteScroll, {infiniteScroll} from "react-infinite-scroll-component";

export const SearchPage = (props) => {
  const { state } = useLocation();
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentView, setCurrentView] = useState(res.slice(currentPage, currentPage + 7))

  useEffect(() => {
    setFilteredList(item);
  }, [state]);

  // useEffect(() => {
  //   setCurrentView(res.slice(currentPage, currentPage + 7))
  //   setCurrentPage((prev) => prev + currentPage);
  // },[])

  //mock data
  const fetchMoreData = () => {
    setTimeout(() => {
      setCurrentView(
        currentView.concat(res.slice(currentPage + 7, currentPage + 14))
        // (prev) => [...prev, res.slice(currentPage, currentPage+ 7)]
      );
      setCurrentPage((prev) => prev + 7);
    }, 1500);
  }
  



  //filter the keywords
  let item = res.filter((card) => card.caption.includes(state));
  
  const handleSortButton = (list) => {
    let temp = [...list];
    setFilteredList(temp.sort((a, b) => a.heart - b.heart));
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
      return <p>Nothing</p>;
    }
    const body = filteredList.map((e, index) => (
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
      console.log("page",currentPage)
      console.log("view",currentView)
    return (
      <InfiniteScroll dataLength={currentView.length} next={fetchMoreData} hasMore={true} loader={<h4>Loading...</h4>}>
      {currentView.map((i, index) => (
            <div style={{border: "1px solid black", width:'100px', height:"100px"}} key={index}>
              {i.caption} - #{index}
            </div>
          ))}
      </InfiniteScroll>
    )
  };

  return (
    <div>
      <NavBar />
      <div className='searchPage-container'>
        <button
          className='searchPage-button'
          onClick={() => setFilteredList(item)}
        >
          Latest
        </button>
        <button
          className='searchPage-button'
          onClick={() => handleSortButton(item)}
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
