import React from 'react';
import ExamNotifications from '../components/ExamNotifications';
import Navbar from '../components/NavBar';
import '../styles/global.css';

const HomePage = () => {
  return (
    <>
      <Navbar/>
      <div className="home-page">
      <ExamNotifications />
    </div>
    </>
    
  );
};

export default HomePage;
