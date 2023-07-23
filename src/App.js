import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update the import here

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
