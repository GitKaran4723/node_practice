import React, { useState } from 'react';
import '../styles/NavBar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <a href="/" className="navbar-item">Home</a>
        <a href="/news" className="navbar-item">News</a>
        <a href="/addnews" className="navbar-item">Add News</a>
        <a href="/addexam" className="navbar-item">Add Exams</a>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>
    </nav>
  );
};

export default Navbar;
