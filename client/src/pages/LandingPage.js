import React, { useEffect } from 'react';
import NavBar from '../components/navbar/NavBar';
import MainList from '../components/slideshow/MainList';
import { useSelector } from 'react-redux';
import axios from 'axios';

const LandingPage = () => {
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    console.log(currentUser.token);
    getReq();
  }, []);

  const getReq = async () => {
    await axios.get('/api/recipes', {
      headers: {
        Authorization: `Acess: ${currentUser.token}`,
      },
    })
    .then((res) => {
      console.log("res",res.data)
    })
  }

  return (
    <section>
      <NavBar />

      <div>
        <MainList title="Today's Best" />
      </div>
    </section>
  );
};

export default LandingPage;
