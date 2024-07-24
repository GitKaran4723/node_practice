import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import '../styles/NewsFeed.css';

const NewsFeed = ({ selectedDate }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openItemIndex, setOpenItemIndex] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!selectedDate) return;

      try {
        setLoading(true);
        // Format the date to YYYY-MM-DD in IST
        const formattedDate = new Date(selectedDate);
        formattedDate.setMinutes(formattedDate.getMinutes() - formattedDate.getTimezoneOffset()); // Convert to IST
        const formattedDateString = formattedDate.toISOString().split('T')[0];

        const url = `${process.env.REACT_APP_API_URL}/api/news/by-date?date=${formattedDateString}`;
        const response = await axios.get(url);
        console.log(response.data); 
        setNews(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedDate]);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-IN', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const handleItemClick = (index) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="news-feed">
      <h2>Daily News: {formattedDate}</h2>
      {news.length > 0 ? (
        news.map((newsItem, index) => (
          <NewsItem
            key={index}
            newsItem={newsItem}
            isOpen={openItemIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))
      ) : (
        <div>No news available for this date.</div>
      )}
    </div>
  );
};

export default NewsFeed;
