import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Pages
import HomePage from './pages/home.jsx';
import CategoryPage from './pages/selection.jsx';
import TestPage from './pages/test.jsx';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Global SCSS
import './Assets/scss/global.scss'

const Render = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirects */}
        <Route path='/*' element={<Navigate to="/"/>}/>
        <Route path='/selection/*' element={<Navigate to="/selection"/>}/>
        <Route path='/test/*' element={<Navigate to="/test"/>}/>

        <Route path="/" element={<HomePage />} />
        <Route path="/selection" element={<CategoryPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default Render;