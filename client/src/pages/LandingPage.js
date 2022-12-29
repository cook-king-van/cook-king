import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import MainList from '../components/slideshow/MainList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipies } from '../features/recipes/recipeSlice';

const LandingPage = () => {
  const dispatch = useDispatch();
  const {best, snack, dinner, brunch} = useSelector(state => state.recipes.recipes);
  const [Best, setBest] = useState([]);
  const [Brunch, setBrunch] = useState([]);
  const [Snack, setSnack] = useState([]);
  const [Dinner, setDinner] = useState([]);

  useEffect(() => {
    ReqDataWithToken();
  }, []);

  const ReqDataWithToken = async () => {
    dispatch(getAllRecipies())
    setBest(best)
    setBrunch(brunch)
    setSnack(snack)
    setDinner(dinner)
  };

  return (
    <section>
      <NavBar />

      <div>
        <MainList title="today's Best" DataType={Best} />
        <MainList title='brunch' DataType={Brunch} />
        <MainList title='snack' DataType={Snack} />
        <MainList title='dinner' DataType={Dinner} />
      </div>
    </section>
  );
};

export default LandingPage;
