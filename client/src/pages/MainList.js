import React from 'react';
import styles from "./MainList.modeule.css";
import tempFood from "../images/tempFood.png";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MainList = () => {
  
  const slideImages = [
    {
      url: tempFood,
      caption: 'Slide 1',
      heart: 135,
      user: "Jay"
    },
    {
      url: tempFood,
      caption: 'Slide 2',
      heart: 12,
      user: "Yun"
    },
    {
      url: tempFood,
      caption: 'Slide 3',
      heart: 138,
      user: "Hoon"
    }
  ];

  const SlideCreator = (props) => {
    
    return (
      <div className='slide'>
      <div>
        <img src={tempFood} alt='' style={{width: "100%"}} />
      </div>
      <section className='slideDescription'>
        <p>{props.title}</p>
        <div className='slideRating' style={{display: "flex", justifyContent: "space-between"}} id="12">
          <p>❤{props.heart}</p>
          <p>{props.user}</p>  
        </div>
      </section>
    </div>
    )
  }


  return (
    <>
      <div>
        <h1 className={styles.h1}>Today's Best</h1>
      </div>

    <div className='slideShow'>
      <div className="slideContainer">
        {slideImages.map((image, index) => {
          return(
            <SlideCreator title={image.caption} heart={image.heart} user={image.user} id={index} />
          )
        })}
      </div>
      <div id="Arrows" onClick={() => console.log("clicked")}>          
        <ChevronLeftIcon />
        <ChevronRightIcon />
      </div>
    </div>
    </>
  )
}

export default MainList;