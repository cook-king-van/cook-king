import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import MainList from '../components/slideshow/MainList';
import { useSelector } from 'react-redux';
import axios from 'axios';

const LandingPage = () => {
  const currentUser = useSelector((state) => state.user);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    console.log(currentUser.token);
    getReq();
    // eachData();
  }, []);

  const getReq = async () => {
    await axios.get('/api/recipes', {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
    .then((res) => {
      setAllData(res.data)
    })
  }

  // let eachData = () => {
  //   allData.map((item, index) => {
  //     return console.log(item, index)
  // })}

  return (
    <section>
      <NavBar />

      <div>
        <MainList title="Today's Best" allData = {allData} />
      </div>
    </section>
  );
};

export default LandingPage;
