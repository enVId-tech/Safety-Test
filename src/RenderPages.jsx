import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Pages
import HomePage from './pages/home.jsx';
import CategoryPage from './pages/category.jsx';
import TestPage from './pages/test.jsx';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const Render = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirects */}
        <Route path='/*' element={<Navigate to="/"/>}/>
        <Route path='/category/*' element={<Navigate to="/category"/>}/>
        <Route path='/test/*' element={<Navigate to="/test"/>}/>

        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default Render;