import React from 'react';
import './MainList.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from "semantic-ui-react";

const MainList = () => {
  
  //mock data
  const slideImages = [
    {
      url: 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      caption: 'Slide 1',
      heart: 135,
      user: 'Jay',
    },
    {
      url: 'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      caption: 'Slide 2',
      heart: 12,
      user: 'Yun',
    },
    {
      url: 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      caption: 'Slide 3',
      heart: 138,
      user: 'Hoon',
    },
    {
      url: 'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      caption: 'Slide 4',
      heart: 138,
      user: 'Hoon',
    },
    {
      url: 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
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

  //entire slideContainer
  const SlideCreator = (props) => {
    
    //each of the slide card
    const SlideCard = (props) => {
      return (
        <div className="image_item">
         <Image
            draggable={false}
            style={{ width: "100%", height: "80%" }}
            src={props.image.url}
            key={props.image.caption}
          />
          <h3 className="h3">{props.description}</h3>
          <div className="cardInfo">
            <p>{props.heart}</p>
            <p>{props.user}</p>
          </div>
        </div>

      )
    }


    return (
   <Carousel
      ssr
      partialVisbile
      itemClass="image-item"
      responsive={responsive}
      arrows={true}
      infinite
      className="reactMultiCarouselList"
    >
      {slideImages.slice(0, slideImages.length).map(image => {
        return (
         <SlideCard
         image={image}
         description={image.caption}
         heart={image.heart}
         user={image.user}
         />
        );
      })}
    </Carousel>
    );
  };



  return (
    <>
      <div>
        <h1 className="h1">Today's Best</h1>
      </div>

      <div className="slideShow">
        <div className="slideContainer">
          <SlideCreator />
        </div>
      </div>
    </>
  );
};

export default MainList;
