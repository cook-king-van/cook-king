import React from 'react';
import './MainList.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from 'semantic-ui-react';
import heartImg from '../../images/Heart.png';
import tempFood from '../../images/tempFood.png';
import plus from '../../images/Plus.png';
import { useNavigate } from 'react-router-dom';

const MainList = ({ title, DataType }) => {
  const navigate = useNavigate();
  //mock data
  const slideData = DataType.map((item) => {
    return {
      caption: item.recipeName,
      heart: item.likeCount,
      user: item.userId,
      url: item.recipeImage ?? tempFood,
      id: item._id
    };
  });

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <i className='MainList-custom-right-arrow' onClick={() => onClick()}></i>
    );
  };

  const CustomLeftArrow = ({ onClick }) => (
    <i onClick={() => onClick()} className='MainList-custom-left-arrow' />
  );

  //entire slideContainer
  const SlideCreator = () => {
    //each of the slide card
    const SlideCard = ({ image, description }) => {
      console.log(image)
      return (
        <div className='MainList-item' onClick={() => {navigate(`/recipe/${image.id}`)}}>
          <Image
            draggable={false}
            style={{ width: '350px', height: '235px' }}
            src={image.url}
            key={image.caption}
          />
          <h3 className='MainList-h3'>{description}</h3>
          <div className='MainList-cardInfo'>
            <p style={{ alignItems: 'center', display: 'flex' }}>
              <img src={heartImg} alt=''></img>
              {image.heart}
            </p>
            <p>{image.user.name ?? 'No name'}</p>
          </div>
        </div>
      );
    };

    return (
      <Carousel
        ssr
        partialVisible
        itemClass='MainList-image_item'
        responsive={responsive}
        arrows={true}
        className='MainList-reactMultiCarouselList'
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        draggable={false}
      >
        {slideData.map((image) => {
          return (
            <SlideCard
              image={image}
              description={image.caption}
              heart={image.heart}
              user={image.user}
              key={image.caption}
            />
          );
        })}
        {slideData.length === 0 ? (
          <i
            className='fa-solid fa-circle-plus fa-2xl'
            id='zeroLength'
            onClick={() => {
              navigate(`/search?option=${title}`);
            }}
          ></i>
        ) : (
          <i
            className='fa-solid fa-circle-plus fa-2xl'
            onClick={() => {
              navigate(`/search?option=${title}`);
            }}
          ></i>
        )}
        {/* <i
          className='fa-solid fa-circle-plus fa-2xl'
          onClick={() => {
            navigate(`/search?option=${title}`);
          }}
        ></i> */}
      </Carousel>
    );
  };

  return (
    <>
      <div>
        <h1 className='MainList-h1'>{title}</h1>
      </div>

      <div className='MainList-slideShow'>
        <div className='MainList-slideContainer'>
          <SlideCreator />
        </div>
      </div>
    </>
  );
};

export default MainList;
