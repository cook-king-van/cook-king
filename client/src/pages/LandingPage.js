import React, { useEffect } from 'react';
import NavBar from '../components/navbar/NavBar';
import MainList from '../components/slideshow/MainList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipies } from '../features/recipes/recipeSlice';

const LandingPage = () => {
  const dispatch = useDispatch();
  const { best, snack, dinner, brunch } = useSelector(
    (state) => state.recipes.recipes
  );

  useEffect(() => {
    ReqDataWithToken();
  }, []);

  const ReqDataWithToken = async () => {
    dispatch(getAllRecipies());
  };

  return (
    <section>
      <NavBar />

      <div>
        <MainList title="today's Best" DataType={best} />
        <MainList title='brunch' DataType={brunch} />
        <MainList title='snack' DataType={snack} />
        <MainList title='dinner' DataType={dinner} />
      </div>
    </section>
  );
};

export default LandingPage;
