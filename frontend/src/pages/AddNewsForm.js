import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddNewsForm.css';

const subjectsList = [
  'Current Events',
  'History',
  'Geography',
  'Polity',
  'Economics',
  'Environment',
  'Science',
  'Comprehension',
  'Interpersonal',
  'Reasoning',
  'Decision Making',
  'Mental Ability',
  'Numeracy',
  'Data Interpretation',
  'Culture',
  'Governance',
  'Constitution',
  'Justice',
  'International Relations',
  'Technology',
  'Development',
  'Security',
  'Disaster Management',
  'Ethics',
  'Integrity',
  'Aptitude',
  'Sociology'
]; 

const AddNewsForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date_update: '',

    subjects: [],
    author: '',
    summary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'subjects') {
      const options = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, subjects: options });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const formattedData = {
        ...formData,
        subjects: formData.subjects,
        date_update: formData.date_update ? new Date(formData.date_update).toISOString() : new Date().toISOString(),
      };
      
      await axios.post(`${process.env.REACT_APP_API_URL}/api/news`, formattedData);
      alert('News item added successfully!');
      setFormData({
        title: '',
        content: '',
        date_update: '',
        subjects: [],
        author: '',
        summary: '',
      });
    } catch (error) {
      console.error('Error adding news item:', error);
      alert('Failed to add news item.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Content (Markdown)</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          placeholder="Enter content in Markdown format"
        />
      </div>
      <div>
        <label>Date Update</label>
        <input
          type="date"
          name="date_update"
          value={formData.date_update}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Subjects</label>
        <select
          name="subjects"
          multiple
          value={formData.subjects}
          onChange={handleChange}
        >
          {subjectsList.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add News</button>
    </form>
  );
};

export default AddNewsForm;
