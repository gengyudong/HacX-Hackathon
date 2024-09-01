import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Main from './components/Main'; // Ensure this path is correct
import Scraper from './components/Scraper'; // Ensure this path is correct
import Photo from './components/Photo'; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/logout" element={<LandingPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/scraper" element={<Scraper />} />
        <Route path="/photo" element={<Photo />} />
      </Routes>
    </Router>
  );
};

export default App;
