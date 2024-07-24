import React, { useState, useEffect } from 'react';
import '../styles/ExamItem.css';

const ExamItem = ({ exam }) => {
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const examDate = new Date(exam.exam_date);
      const timeLeft = examDate - now;

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [exam.exam_date]);

  const getStatus = () => {
    const now = new Date();
    const applicationStart = new Date(exam.application_start_date);
    const applicationEnd = new Date(exam.application_end_date);

    if (now > applicationEnd) return 'Application Closed';
    if (now >= applicationStart) return 'Application Started';
    return 'Notification Out';
  };

  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="exam-item">
      <h3>{exam.name}</h3>
      <p><strong>Exam Date:</strong> {new Date(exam.exam_date).toLocaleDateString()}</p>
      <p className="remaining-time"><strong>Exam in :</strong> {remainingTime}</p>
      <p><strong>Notification Date:</strong> {new Date(exam.notification_date).toLocaleDateString()}</p>
      <p><strong>Application Period:</strong> {new Date(exam.application_start_date).toLocaleDateString()} - {new Date(exam.application_end_date).toLocaleDateString()}</p>
      <p className={`status ${getStatus().toLowerCase().replace(' ', '-')}`}>{getStatus()}</p>
      <div className="exam-buttons">
        <a href={exam.notification_link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Notification Link</a>
        <button className="btn btn-secondary" onClick={() => setShowSummary(true)}>Read Details</button>
      </div>
      {showSummary && (
        <div className="summary-popup">
          <div className="summary-content">
            <button className="close-button" onClick={() => setShowSummary(false)}>×</button>
            <p>{exam.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamItem;
