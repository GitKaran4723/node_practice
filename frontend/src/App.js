import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import AddNewsForm from './pages/AddNewsForm';
import AddExamForm from './pages/AddExamsForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />}/>
        <Route path="/addnews" element={<AddNewsForm />}/>
        <Route path="/addexam" element={<AddExamForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
