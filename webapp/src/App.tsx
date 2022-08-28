import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Matchups } from './pages/Matchups';

export const App = () => {
  return (
    

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matchups" element={<Matchups />} />

      </Routes>
    </Router>
  );
}