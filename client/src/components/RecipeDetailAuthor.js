import React from 'react';
import { Avatar } from '@mui/material';
import { responsive } from '../utils/carousel';
import Carousel from 'react-multi-carousel';
import MyCookingCard from '../components/MyCookingCard';

const RecipeDetailAuthor = (props) => {
  const { userId, recipes, recipeOnClick } = props;

  const CustomRightArrow = ({ onClick }) => {
    return (
      <i
        className='RecipeDetail-carouselRightArrow'
        onClick={() => onClick()}></i>
    );
  };

  const CustomLeftArrow = ({ onClick }) => (
    <i className='RecipeDetail-carouselLeftArrow' onClick={() => onClick()} />
  );

  return (
    <div className='RecipeDetail-authorContainer'>
      <label className='RecipeDetail-authorTitle'>About the author . . .</label>
      <div className='RecipeDetail-authorProfileHolder'>
        <Avatar
          alt={userId?.name}
          src={userId?.profileImage}
          sx={{ width: 140, height: 140 }}
          className='RecipeDetail-authorProfilePhoto'
        />
        <div className='RecipeDetail-authorName'>{userId?.name}</div>
      </div>
      <Carousel
        itemClass='MainList-image_item'
        responsive={responsive}
        infinite={true}
        arrows={true}
        className='MainList-reactMultiCarouselList'
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        draggable={true}>
        {recipes
          ? recipes?.map((recipe) => {
              return (
                <MyCookingCard
                  key={recipe._id}
                  recipe={recipe}
                  onClick={(e) => recipeOnClick(e, recipe._id)}
                  className='RecipeDetail-authorRecipesCard'
                />
              );
            })
          : []}
      </Carousel>
    </div>
  );
};

export default RecipeDetailAuthor;
