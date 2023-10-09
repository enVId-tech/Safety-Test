import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './pages/home.jsx';
import CategoryPage from './pages/selection.jsx';
import TestPage from './pages/test.jsx';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Global SCSS
import './Assets/scss/global.scss';

const Render = () => {
  return (
    <Router>
      <Routes>
        {/* Redirects */}
        <Route path="/selection/*" element={<Navigate to="selection" />} />
        <Route path="/test/*" element={<Navigate to="test" />} />

        {/* Routes */}
        <Route path="/selection" element={<CategoryPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/panel/results/answers" element={<HomePage />} />

        {/* Fallback */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default Render;
