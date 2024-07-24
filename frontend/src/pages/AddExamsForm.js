import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ExamsForm.css'; // Ensure you have some CSS for responsiveness

const ExamForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    exam_date: '',
    notification_date: '',
    application_start_date: '',
    application_end_date: '',
    notification_link: '',
    tag: '',
    summary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/exams`, formData);
      console.log('Success:', response.data);
      // Clear the form or handle the response as needed
      setFormData({
        name: '',
        exam_date: '',
        notification_date: '',
        application_start_date: '',
        application_end_date: '',
        notification_link: '',
        tag: '',
        summary: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Exam Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Exam Date:
          <input
            type="date"
            name="exam_date"
            value={formData.exam_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Notification Date:
          <input
            type="date"
            name="notification_date"
            value={formData.notification_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Application Start Date:
          <input
            type="date"
            name="application_start_date"
            value={formData.application_start_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Application End Date:
          <input
            type="date"
            name="application_end_date"
            value={formData.application_end_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Notification Link:
          <input
            type="url"
            name="notification_link"
            value={formData.notification_link}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tag:
          <select
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
          >
            <option value="">Select Tag</option>
            <option value="defense">Defense</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>
        </label>
        <label>
          Summary:
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className='submit-exam-button'>Add Exam</button>
      </form>
    </div>
  );
};

export default ExamForm;
