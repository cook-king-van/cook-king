import React from 'react';
import './MainList.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from 'semantic-ui-react';
import heart from '../../images/Heart.png';
import tempFood from '../../images/tempFood.png';
import tempFood2 from '../../images/TempFood2.png';
import tempFood3 from '../../images/TempFood3.png';

const MainList = ({ title }) => {
  //mock data
  const slideImages = [
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
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
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
  const SlideCreator = ({heart, user}) => {
    //each of the slide card
    const SlideCard = (props) => {
      return (
        <div className='MainList-item'>
          <Image
            draggable={false}
            style={{ width: '350px', height: '235px' }}
            src={props.image.url}
            key={props.image.caption}
          />
          <h3 className='MainList-h3'>{props.description}</h3>
          <div className='MainList-cardInfo'>
            <p style={{ alignItems: 'center', display: 'flex' }}>
              <img src={heart} alt=''></img>
              {heart}
            </p>
            <p>{user}</p>
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
        {slideImages.slice(0, slideImages.length).map((image) => {
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
