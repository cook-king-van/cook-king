import React from 'react';
import './MainList.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from 'semantic-ui-react';
import tempFood from '../../images/tempFood.png';
import { useNavigate } from 'react-router-dom';
import detectTime from '../../lib/detectTime';

const MainList = ({ title, DataType }) => {
  const navigate = useNavigate();
  //mock data
  const slideData = DataType.map((item) => {
    return {
      caption: item.recipeName,
      heart: item.likeCount,
      user: item.userId,
      url: item.recipeImage ?? tempFood,
      id: item._id,
      cookingTime: item.time,
      updatedAt: item.updatedAt,
    };
  });

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
  const SlideCreator = () => {
    //each of the slide card
    const SlideCard = ({ image, description }) => {
      return (
        <div
          className='MainList-item'
          onClick={() => {
            navigate(`/recipe/${image.id}`);
          }}>
          <Image
            draggable={false}
            className='MainList-cardImage'
            src={image.url}
            key={image.caption}
          />
          <h3 className='MainList-h3'>{description}</h3>
          <div className='MainList-cardInfo'>
            <div className='MainList-cardInfoBox'>
              <p className='MainList-userText'>
                <i className='fa-solid fa-heart MainList-heartIcon'></i>
                {image.heart}
              </p>
              <p className='MainList-userText'>
                <i
                  className='fa-regular fa-clock MainList-timeIcon'
                  style={{ margin: '0 5px' }}></i>
                {detectTime(image.cookingTime)}
              </p>
            </div>
            <div className='MainList-cardBox'>
              <p className='MainList-userText'>
                {image.user.name ?? 'No name'}
              </p>
              <p className='MainList-userText'>
                {image.updatedAt.split('T')[0] || image.createdAt}
              </p>
            </div>
          </div>
        </div>
      );
    };

    return (
      <Carousel
        ssr
        partialVisible
        // infinite
        itemClass='MainList-image_item'
        responsive={responsive}
        arrows={true}
        className='MainList-reactMultiCarouselList'
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        draggable={false}>
        {slideData.map((image) => {
          return (
            <SlideCard
              image={image}
              description={image.caption}
              heart={image.heart}
              user={image.user}
              key={image.caption}
            />
            // <MyCookingCard
            //   id={image.id}
            //   recipe={{
            //     recipeName: image.caption,
            //     likeCount: image.heart,
            //     recipeImage: image.url,
            //     userId: image.user,
            //   }}
            // />
          );
        })}
        {slideData.length === 0 ? (
          <div className='MainList-seeMorePlusSign'>
            <i
              className='fa-solid fa-circle-plus fa-3x MainList-plusSign'
              onClick={() => {
                navigate(`/search?option=${title}`, {
                  state: { type: 'option', value: title },
                });
              }}></i>
          </div>
        ) : (
          <div className='MainList-seeMorePlusSign'>
            <i
              className='fa-solid fa-circle-plus fa-3x MainList-plusSign'
              onClick={() => {
                const value = title === "today's Best" ? 'todayBest' : title;
                navigate(`/search?option=${value}`, {
                  state: { type: 'option', value },
                });
              }}></i>
          </div>
        )}
      </Carousel>
    );
  };

  return (
    <>
      <div>
        <h1 className='MainList-h1'>
          {title[0].toUpperCase() + title.slice(1)}
        </h1>
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
