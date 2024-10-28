import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CountryDetail from './components/CountryDetail';

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : ''}>
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={darkMode} />} />
          <Route path="/country/:countryCode" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
