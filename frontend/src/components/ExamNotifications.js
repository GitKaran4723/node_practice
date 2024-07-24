import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExamItem from './ExamItem';
import '../styles/ExamNotifications.css';

const ExamNotifications = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/exams`)
      .then(response => {
        console.log(response.data)
        setExams(response.data)
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="exam-notifications">
      <h2>Exam Notifications</h2>
      <div className="exam-notifications-grid">
        {exams.map((exam, index) => (
          <ExamItem key={index} exam={exam} />
        ))}
      </div>
    </div>
  );
};

export default ExamNotifications;
