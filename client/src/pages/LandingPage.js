import React from 'react';
import NavBar from '../components/navbar/NavBar';
import MainList from '../components/slideshow/MainList';

const LandingPage = () => {
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
