import React from 'react';
import NavBar from '../components/navbar/NavBar';
import DetailBox from '../components/RecipeDetail/DetailBox';
import UserRecommend from '../components/RecipeDetail/UserRecommend';
const RecipeDetailPage = () => {
  return (
    <>
      <NavBar />
      <DetailBox />
      <UserRecommend />
    </>
  );
};

export default RecipeDetailPage;
