import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import '../styles/NewsFeed.css';
import { FaVolumeUp, FaStop } from 'react-icons/fa';

const NewsItem = ({ newsItem, isOpen, onClick }) => {
  const [showFullNews, setShowFullNews] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis] = useState(window.speechSynthesis);
  const contentRef = useRef(null);

  const handleToggleFullNews = () => {
    setShowFullNews(!showFullNews);
  };

  const handleReadLoud = () => {
    if (isReading) {
      // Stop reading
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Start reading
      const text = contentRef.current ? contentRef.current.textContent : '';
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onend = () => {
        setIsReading(false);
      };

      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };
  
  return (
    <div className="news-item">
      <div className="tags">
        {newsItem.subjects.map((subject, index) => (
          <div
            key={index}
            className={`tag tag-${subject.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {subject}
          </div>
        ))}
      </div>
      <div className="news-header" onClick={onClick}>
        <h3>{newsItem.title}</h3>
        <button className="toggle-button">{isOpen ? '▲' : '▼'}</button>
      </div>
      {isOpen && (
        <div className="news-content">
          <h3 className='summary'>Short Summary</h3>
          <ReactMarkdown>{newsItem.summary}</ReactMarkdown>
        
          {showFullNews ? (
            <>
            
              <div className='full-news-container'>
                <h3 className='fullNews'>Full News</h3>
                <button className="read-loud-button" onClick={handleReadLoud}>
                  {isReading ? <FaStop /> : <FaVolumeUp />}
                </button>
              </div>
              <div ref={contentRef} className="content-text">
                <ReactMarkdown>
                  {newsItem.content}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <button className="read-more-button" onClick={handleToggleFullNews}>Read Full News</button>
          )}
        </div>
      )}
    </div>
  );
};

NewsItem.propTypes = {
  newsItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NewsItem;
