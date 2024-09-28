import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Category from './pages/Category';
import Product from './pages/Product';
import Subcategory from './pages/Subcategory';
import Signup from './components/Signup';
import Login from './components/Login';

export const backendUrl = "http://localhost:5050/";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
        <div className="main-content">
          {isAuthenticated && <Sidebar />} 
          <div className="page-content">
            <Routes>
              
              {isAuthenticated ? (
                <>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/category' element={<Category />} />
                  <Route path='/products' element={<Product />} />
                  <Route path='/subcategory' element={<Subcategory />} />
                </>
              ) : (
                <>
                  <Route path='/signup' element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
                  <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                  <Route path='/*' element={<Navigate to='/signup' />} /> 
                </>
              )}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
