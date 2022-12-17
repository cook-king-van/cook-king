
import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import MainList from '../components/slideshow/MainList';
import { useSelector } from 'react-redux';
import axios from 'axios';

const LandingPage = () => {
  const currentUser = useSelector((state) => state.user);
  const [Best, setBest] = useState([]);
  const [branch, setBranch] = useState([]);
  const [snack, setSnack] = useState([]);

  useEffect(() => {
    console.log(currentUser.token);
    ReqDataWithToken();
    // eachData();
  }, []);

  const ReqDataWithToken = async () => {
    await axios.get('/api/recipes/landing', {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
    .then((res) => {
      console.log(res.data)
      setBranch(res.data.brunch)
      setBest(res.data.best)
      setSnack(res.data.snack);
    })
  };

  // let eachData = () => {
  //   Best.map((item, index) => {
  //     return console.log(item, index)
  // })}

  return (
    <section>
      <NavBar />

      <div>
        <MainList title="Today's Best" DataType = {Best} />
        <MainList title="Branch" DataType = {branch} />
        <MainList title="Snack" DataType = {snack} />
      </div>
    </section>
  );
};

export default LandingPage;
