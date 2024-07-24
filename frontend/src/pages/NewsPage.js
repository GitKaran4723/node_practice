import React, { useState, useCallback } from 'react';
import Navbar from '../components/NavBar';
import Calendar from '../components/Calendar';
import NewsFeed from '../components/NewsFeed';
import '../styles/global.css';

const NewsPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = useCallback((date) => {

    setSelectedDate(date); // Always set the new date
  }, []);

  return (
    <>
      <Navbar />
      <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      <div className="home-page">
        <NewsFeed selectedDate={selectedDate} />
      </div>
    </>
  );
};

export default NewsPage;
